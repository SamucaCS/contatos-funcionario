// Monta a página a partir de dados.js (database, quickLinks, usefulNumbers).
(function () {
  "use strict";

  const WEEKDAYS = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const LOWERCASE_WORDS = new Set(["de", "da", "do", "das", "dos", "e"]);
  const UPPERCASE_WORDS = new Set([
    "apae",
    "cel",
    "ceu",
    "ee",
    "eja",
    "emef",
    "etec",
    "pei",
    "sesi",
    "senai",
  ]);
  const ROMAN_NUMERAL = /^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i;
  const SHIFT_PATTERN =
    /([2-6])\s*ª\s*feira\s+das\s+(\d{1,2})h(\d{2})?\s*(?:as|às|a)\s+(\d{1,2})h(\d{2})?/i;

  const now = new Date();
  const today = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const directory = document.getElementById("directory");
  const sideNav = document.getElementById("side-nav");
  const chipNav = document.getElementById("chip-nav");
  const searchArea = document.getElementById("search-area");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  const searchStatus = document.getElementById("search-status");
  const emptyState = document.getElementById("empty-state");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  // ---------- Utilitários ----------

  function el(tag, props, children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value === true ? "" : value);
    });
    [].concat(children || []).forEach((child) => {
      if (child != null && child !== false) node.append(child);
    });
    return node;
  }

  const icon = (name) =>
    el("i", { className: `fa-solid ${name}`, "aria-hidden": "true" });

  const normalize = (text) =>
    String(text || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

  const slug = (text) =>
    normalize(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  // Permite quebrar e-mails longos antes de "@" e "." em vez de no meio da palavra.
  function breakable(text) {
    const fragment = document.createDocumentFragment();
    text.split(/(?=[@.])/).forEach((part, i) => {
      if (i > 0) fragment.append(document.createElement("wbr"));
      fragment.append(part);
    });
    return fragment;
  }

  // "", "*" e "***" significam "sem informação".
  const hasValue = (value) =>
    typeof value === "string" && !/^\**$/.test(value.trim());

  function initials(name) {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter((part) => !LOWERCASE_WORDS.has(part.toLowerCase()));
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function titleCase(text) {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((word, i) => {
        const bare = word.replace(/[^\p{L}]/gu, "");
        if (UPPERCASE_WORDS.has(bare) || ROMAN_NUMERAL.test(bare))
          return word.toUpperCase();
        if (i > 0 && LOWERCASE_WORDS.has(word)) return word;
        return word.replace(/\p{L}/u, (letter) => letter.toUpperCase());
      })
      .join(" ");
  }

  // "ESE - Equipe de Supervisão" -> { code: "ESE", label: "Equipe de Supervisão" }
  function splitSector(name) {
    const [code, ...rest] = name.split(" - ");
    if (rest.length) return { code, label: rest.join(" - ") };
    const [first, ...others] = name.split(" / ");
    return { code: first, label: others.join(" / ") };
  }

  // Liga para o primeiro número da lista (DDD 11 quando não informado).
  function phoneHref(phone) {
    const digits = phone.split(/[|/]/)[0].replace(/\D/g, "");
    if (digits.length === 8) return `tel:+5511${digits}`;
    if (digits.length >= 10) return `tel:+55${digits}`;
    return null;
  }

  function parseShift(shift) {
    if (!hasValue(shift)) return null;
    const match = shift.match(SHIFT_PATTERN);
    if (!match)
      return {
        none: true,
        label: /s\/?\s*plant/i.test(shift) ? "Sem plantão" : shift,
      };
    const [, weekday, h1, m1 = "00", h2, m2 = "00"] = match;
    const hour = (h, m) => `${Number(h)}h${m === "00" ? "" : m}`;
    const time = `${hour(h1, m1)}–${hour(h2, m2)}`;
    return {
      day: Number(weekday) - 1,
      start: Number(h1) * 60 + Number(m1),
      end: Number(h2) * 60 + Number(m2),
      time,
      label: `${weekday}ª feira · ${time}`,
    };
  }

  // ---------- Cópia e aviso ----------

  let toastTimer;
  function showToast(message) {
    toastText.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.hidden = true), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = el("textarea", {
        readonly: true,
        style: "position:fixed;opacity:0",
      });
      area.value = text;
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    }
  }

  function copyButton(value, label, name) {
    return el(
      "button",
      {
        className: "copy-btn",
        type: "button",
        "data-copy": value,
        "data-copy-label": label,
        "aria-label": `Copiar ${label.toLowerCase()} de ${name}`,
        title: `Copiar ${label.toLowerCase()}`,
      },
      icon("fa-copy"),
    );
  }

  // ---------- Card de pessoa ----------

  function contactRow({ href, iconName, text, copy }) {
    const content = [
      icon(iconName),
      el("span", { className: "contact-text" }, breakable(text)),
    ];
    const link = href
      ? el("a", { className: "contact-link", href }, content)
      : el("span", { className: "contact-link" }, content);
    return el("div", { className: "contact" }, [link, copy]);
  }

  function schoolsBlock(schools) {
    const lists = [
      ["Públicas", schools.public],
      ["Particulares", schools.private],
      ["Substituição de rotina", schools.substitute],
    ].filter(([, list]) => list && list.length);
    if (!lists.length) return null;

    const total =
      (schools.public || []).length + (schools.private || []).length;
    const summaryText = total ? `Escolas (${total})` : "Substituição de rotina";
    return el("details", { className: "schools" }, [
      el("summary", {}, [
        icon("fa-school"),
        summaryText,
        icon("fa-chevron-down"),
      ]),
      el(
        "div",
        { className: "schools-body" },
        lists.map(([label, list]) =>
          el("div", {}, [
            el("p", { className: "schools-label", text: label }),
            el(
              "ul",
              { className: "schools-list" },
              list.map((school) => el("li", { text: titleCase(school) })),
            ),
          ]),
        ),
      ),
    ]);
  }

  function personCard(member, id) {
    const name = member.name.trim();
    const role = member.role.trim();
    const shift = parseShift(member.shift);
    const onDutyToday = shift && !shift.none && shift.day === today;
    const onDutyNow =
      onDutyToday && minutesNow >= shift.start && minutesNow < shift.end;

    const tags = [];
    if (shift) {
      if (onDutyToday) {
        tags.push(
          el("span", { className: "tag tag--today" }, [
            onDutyNow
              ? el("span", { className: "live-dot", "aria-hidden": "true" })
              : icon("fa-clock"),
            onDutyNow
              ? `De plantão agora · ${shift.time}`
              : `Plantão hoje · ${shift.time}`,
          ]),
        );
      } else {
        tags.push(
          el("span", { className: "tag" }, [icon("fa-clock"), shift.label]),
        );
      }
    }
    if (hasValue(member.note)) {
      tags.push(
        el("span", { className: "tag tag--warn" }, [
          icon("fa-triangle-exclamation"),
          member.note,
        ]),
      );
    }
    (member.folders || []).forEach((folder) =>
      tags.push(el("span", { className: "tag tag--folder", text: folder })),
    );

    const contacts = [];
    if (hasValue(member.phone)) {
      const href = phoneHref(member.phone);
      contacts.push(
        contactRow({
          href,
          iconName: "fa-phone",
          text: member.phone.trim(),
          copy: href ? copyButton(member.phone.trim(), "Telefone", name) : null,
        }),
      );
    }
    if (hasValue(member.email)) {
      const email = member.email.trim();
      contacts.push(
        contactRow({
          href: `mailto:${email}`,
          iconName: "fa-envelope",
          text: email,
          copy: copyButton(email, "E-mail", name),
        }),
      );
    }
    if (!contacts.length) {
      const empty = contactRow({
        iconName: "fa-circle-info",
        text: "Telefone e e-mail não cadastrados",
      });
      empty.classList.add("contact--empty");
      contacts.push(empty);
    }

    return {
      shift,
      onDutyToday,
      onDutyNow,
      node: el(
        "article",
        { className: `person${onDutyToday ? " person--duty" : ""}`, id },
        [
          el("div", { className: "person-head" }, [
            el("span", {
              className: "avatar",
              "aria-hidden": "true",
              text: initials(name),
            }),
            el("div", {}, [
              el("p", { className: "person-role", text: role }),
              el("h3", { className: "person-name", text: name }),
            ]),
          ]),
          tags.length ? el("div", { className: "tags" }, tags) : null,
          el("div", { className: "contacts" }, contacts),
          member.schools ? schoolsBlock(member.schools) : null,
        ],
      ),
    };
  }

  function searchTextFor(member, sector) {
    const schools = member.schools || {};
    const phone = member.phone || "";
    return normalize(
      [
        member.name,
        member.role,
        phone,
        phone.replace(/[^\d|/]/g, ""),
        member.email,
        member.group,
        member.shift,
        member.note,
        ...(member.folders || []),
        ...(schools.public || []),
        ...(schools.private || []),
        ...(schools.substitute || []),
        sector.sector,
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  // ---------- Setores ----------

  const usedIds = new Set();
  function uniqueId(base) {
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    usedIds.add(id);
    return id;
  }

  const sectors = database.map((sector, index) => {
    const tone = `tone-${sector.color || "green"}`;
    const { code, label } = splitSector(sector.sector);
    const id = uniqueId(`setor-${slug(code)}`);
    const number = String(index + 1).padStart(2, "0");

    const cards = [];
    const makeCard = (member) => {
      const card = personCard(member, uniqueId(`pessoa-${slug(member.name)}`));
      cards.push({ ...card, member, text: searchTextFor(member, sector) });
      return card.node;
    };

    const ungrouped = sector.members.filter((member) => !member.group);
    const groupNames = [
      ...new Set(sector.members.filter((m) => m.group).map((m) => m.group)),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));

    const body = [];
    if (ungrouped.length)
      body.push(
        el("div", { className: "people-grid" }, ungrouped.map(makeCard)),
      );

    const groups = groupNames.map((groupName) => {
      const members = sector.members
        .filter((member) => member.group === groupName)
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      const firstCard = cards.length;
      const grid = el(
        "div",
        { className: "people-grid" },
        members.map(makeCard),
      );
      const countNode = el("span", {
        className: "group-count",
        text: members.length,
      });
      const node = el("div", { className: "group" }, [
        el("h3", { className: "group-title" }, [
          el("span", { text: groupName }),
          countNode,
        ]),
        grid,
      ]);
      body.push(node);
      return { node, countNode, cards: cards.slice(firstCard) };
    });

    const eyebrow = el("p", { className: "sector-eyebrow" });
    const cta = sector.link
      ? el(
          "a",
          {
            className: "btn btn--on-color",
            href: sector.link,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          [icon("fa-star"), sector.linkLabel || "Saiba mais"],
        )
      : null;

    const node = el(
      "section",
      { className: `sector ${tone}`, id, "aria-labelledby": `${id}-titulo` },
      [
        el("header", { className: "sector-banner" }, [
          el("div", { className: "sector-heading" }, [
            eyebrow,
            el("h2", { className: "sector-title", id: `${id}-titulo` }, [
              icon(sector.icon),
              sector.sector,
            ]),
            hasValue(sector.info)
              ? el("p", { className: "sector-info" }, [
                  icon("fa-circle-info"),
                  sector.info,
                ])
              : null,
          ]),
          cta,
        ]),
        ...body,
      ],
    );
    directory.append(node);

    const navCount = el("span", { className: "nav-count" });
    const navItem = el(
      "a",
      {
        className: `nav-item ${tone}`,
        href: `#${id}`,
        title: sector.sector,
        "aria-label": sector.sector,
      },
      [
        el(
          "span",
          { className: "nav-icon", "aria-hidden": "true" },
          icon(sector.icon),
        ),
        el("span", { className: "nav-text", "aria-hidden": "true" }, [
          el("span", { className: "nav-code", text: code }),
          label ? el("span", { className: "nav-name", text: label }) : null,
        ]),
        navCount,
      ],
    );
    sideNav.append(navItem);

    const chipCount = el("span", { className: "chip-count" });
    const chip = el("a", { className: `chip ${tone}`, href: `#${id}` }, [
      el(
        "span",
        { className: "chip-icon", "aria-hidden": "true" },
        icon(sector.icon),
      ),
      code,
      chipCount,
    ]);
    chipNav.append(chip);

    return {
      sector,
      tone,
      id,
      number,
      node,
      eyebrow,
      cards,
      groups,
      navItem,
      navCount,
      chip,
      chipCount,
    };
  });

  // ---------- Busca ----------

  function setCount(sector, visible) {
    const total = sector.cards.length;
    const noun = total === 1 ? "contato" : "contatos";
    sector.eyebrow.textContent =
      visible === total
        ? `Setor ${sector.number} · ${total} ${noun}`
        : `Setor ${sector.number} · ${visible} de ${total} ${noun}`;
    sector.navCount.textContent = visible;
    sector.chipCount.textContent = visible;
  }

  function applySearch(query) {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    let total = 0;

    sectors.forEach((sector) => {
      let visible = 0;
      sector.cards.forEach((card) => {
        const match = terms.every((term) => card.text.includes(term));
        card.node.hidden = !match;
        if (match) visible++;
      });
      sector.groups.forEach((group) => {
        const count = group.cards.filter((card) => !card.node.hidden).length;
        group.node.hidden = count === 0;
        group.countNode.textContent = count;
      });
      sector.node.hidden = visible === 0;
      sector.navItem.hidden = visible === 0;
      sector.chip.hidden = visible === 0;
      setCount(sector, visible);
      shown += visible;
      total += sector.cards.length;
    });

    searchClear.hidden = !query;
    emptyState.hidden = shown > 0;
    searchStatus.textContent = terms.length
      ? `${shown} de ${total} contatos para “${query.trim()}”`
      : "";

    try {
      const url = new URL(window.location.href);
      if (terms.length) url.searchParams.set("q", query.trim());
      else url.searchParams.delete("q");
      history.replaceState(null, "", url);
    } catch (error) {}
  }

  function clearSearch() {
    searchInput.value = "";
    applySearch("");
    searchInput.focus();
  }

  searchForm.addEventListener("submit", (event) => event.preventDefault());
  // Ao filtrar com a página rolada, volta para o início da lista.
  const content = document.getElementById("conteudo");
  searchInput.addEventListener("input", () => {
    applySearch(searchInput.value);
    const top = content.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "auto" });
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      event.preventDefault();
      clearSearch();
    }
  });
  searchClear.addEventListener("click", clearSearch);

  document.addEventListener("keydown", (event) => {
    const typing = /^(input|textarea|select)$/i.test(
      document.activeElement.tagName,
    );
    if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  document.addEventListener("click", async (event) => {
    const copy = event.target.closest("[data-copy]");
    if (copy) {
      const ok = await copyText(copy.dataset.copy);
      showToast(
        ok ? `${copy.dataset.copyLabel} copiado!` : "Não foi possível copiar.",
      );
      if (ok) {
        copy.classList.add("is-copied");
        copy.firstElementChild.className = "fa-solid fa-check";
        setTimeout(() => {
          copy.classList.remove("is-copied");
          copy.firstElementChild.className = "fa-solid fa-copy";
        }, 1600);
      }
      return;
    }
    if (event.target.closest("[data-clear-search]")) clearSearch();
  });

  // ---------- Setor atual no menu ----------

  function setCurrent(id) {
    sectors.forEach((sector) => {
      const current = sector.id === id;
      sector.navItem.setAttribute("aria-current", current);
      sector.chip.setAttribute("aria-current", current);
      if (current && chipNav.scrollWidth > chipNav.clientWidth) {
        chipNav.scrollTo({
          left: sector.chip.offsetLeft - 16,
          behavior: "smooth",
        });
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );
    sectors.forEach((sector) => observer.observe(sector.node));
  }

  function updateStickyOffset() {
    document.documentElement.style.setProperty(
      "--sticky-offset",
      `${searchArea.offsetHeight + 16}px`,
    );
  }
  updateStickyOffset();
  if ("ResizeObserver" in window)
    new ResizeObserver(updateStickyOffset).observe(searchArea);

  // ---------- Coluna lateral ----------

  const allCards = sectors.flatMap((sector) =>
    sector.cards.map((card) => ({ ...card, sector })),
  );
  const onDuty = allCards
    .filter((card) => card.onDutyToday)
    .sort((a, b) => a.shift.start - b.shift.start);

  function stat(tone, iconName, value, label) {
    return el("div", { className: `stat ${tone}` }, [
      icon(iconName),
      el("span", { className: "stat-value", text: value }),
      el("span", { className: "stat-label", text: label }),
    ]);
  }

  document
    .getElementById("stats")
    .append(
      stat("tone-green", "fa-address-book", allCards.length, "contatos"),
      stat("tone-blue", "fa-sitemap", sectors.length, "setores"),
      stat("tone-purple", "fa-clock", onDuty.length, "plantões hoje"),
    );

  document.getElementById("duty-day").textContent = WEEKDAYS[today];
  const dutyList = document.getElementById("duty-list");
  if (onDuty.length) {
    onDuty.forEach((card) => {
      dutyList.append(
        el("li", { className: card.sector.tone }, [
          el("span", {
            className: "avatar avatar--sm",
            "aria-hidden": "true",
            text: initials(card.member.name),
          }),
          el("a", { className: "duty-person", href: `#${card.node.id}` }, [
            el("span", {
              className: "duty-name",
              text: card.member.name.trim(),
            }),
            el("span", { className: "duty-time", text: card.shift.time }),
          ]),
          card.onDutyNow
            ? el("span", { className: "tag tag--today" }, [
                el("span", { className: "live-dot", "aria-hidden": "true" }),
                "agora",
              ])
            : null,
        ]),
      );
    });
  } else {
    dutyList.append(
      el("li", {
        className: "duty-empty",
        text: "Nenhum supervisor de plantão hoje.",
      }),
    );
  }

  const usefulList = document.getElementById("useful-list");
  (typeof usefulNumbers !== "undefined" ? usefulNumbers : []).forEach(
    (item) => {
      const isPhone = item.type === "phone";
      const href = isPhone ? phoneHref(item.value) : `mailto:${item.value}`;
      usefulList.append(
        el("li", {}, [
          el("div", { className: "useful-text" }, [
            el("span", { className: "useful-label", text: item.label }),
            el("a", { className: "useful-value", href }, breakable(item.value)),
          ]),
          copyButton(item.value, isPhone ? "Telefone" : "E-mail", item.label),
        ]),
      );
    },
  );

  const quickLinksNode = document.getElementById("quick-links");
  (typeof quickLinks !== "undefined" ? quickLinks : []).forEach((link) => {
    quickLinksNode.append(
      el(
        "a",
        {
          className: `quick-link tone-${link.color || "green"}`,
          href: link.href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        [
          el(
            "span",
            { className: "quick-link-icon", "aria-hidden": "true" },
            icon(link.icon),
          ),
          el("span", { className: "quick-link-text" }, [
            el("span", { className: "quick-link-label", text: link.label }),
            el("span", {
              className: "quick-link-desc",
              text: link.description,
            }),
          ]),
          icon("fa-arrow-up-right-from-square"),
        ],
      ),
    );
  });

  // ---------- Tema claro/escuro ----------

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () =>
    document.documentElement.dataset.theme ||
    (prefersDark.matches ? "dark" : "light");

  function syncThemeButtons() {
    const dark = currentTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const label = dark ? "Tema claro" : "Tema escuro";
      button.setAttribute("aria-label", `Ativar ${label.toLowerCase()}`);
      button.title = `Ativar ${label.toLowerCase()}`;
      button.querySelector("i").className =
        `fa-solid ${dark ? "fa-sun" : "fa-moon"}`;
      const text = button.querySelector(".side-link-label");
      if (text) text.textContent = label;
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) =>
    button.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("tema", next);
      } catch (error) {}
      syncThemeButtons();
    }),
  );
  prefersDark.addEventListener?.("change", syncThemeButtons);
  syncThemeButtons();

  // ---------- Início ----------

  const initialQuery =
    new URLSearchParams(window.location.search).get("q") || "";
  searchInput.value = initialQuery;
  applySearch(initialQuery);
  setCurrent(sectors[0] && sectors[0].id);
})();
