const database = [
    {
        sector: "Gabinete / Assessoria",
        icon: "fa-building",
        members: [
            { name: "Raul Martins dos Santos", role: "Recepção Gabinete", phone: "4746-7214", email: "Raul.Santos01@educacao.sp.gov.br" },
            { name: "Luiz Fernando Siqueira", role: "ASURE - Executivo Público", phone: "4746-5051 / 6051", email: "luiz.siqueira@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "ESE - Equipe de Supervisão",
        icon: "fa-eye",
        info: "Plantão: 4746-7227 / 4746-7228",
        members: [
            { name: "Carla de Almeida Leite", role: "Supervisor", phone: "4746-5030", email: "carla.leite@educacao.sp.gov.br" },
            { name: "Cintia Souza Borges", role: "Supervisor", phone: "***", email: "cintia.borges01@educacao.sp.gov.br" },
            { name: "Edson Fernandes de Oliveira", role: "Supervisor", phone: "4746-5032", email: "edson.oliveira04@educacao.sp.gov.br" },
            { name: "Elaine Ferreira Cunha", role: "Supervisor", phone: "4746-5026", email: "elaine.cunha1@educacao.sp.gov.br" },
            { name: "Elisabete Gomes Benatti", role: "Supervisor", phone: "4746-5033", email: "elisabete.gomes01@educacao.sp.gov.br" },
            { name: "Elizabeth das Neves Alves Pereira", role: "Supervisor", phone: "4746-5024", email: "elizabeth.pereira@educacao.sp.gov.br" },
            { name: "Gisele Gonçalves Callado", role: "Supervisor", phone: "4746-7224", email: "gisele.callado@educacao.sp.gov.br" },
            { name: "Jani Aparecida de Lima Ramos", role: "Supervisor", phone: "4746-5031", email: "jani.ramos@educacao.sp.gov.br" },
            { name: "José Odair Ribeiro", role: "Supervisor", phone: "4746-7223", email: "jose.ribeiro06@educacao.sp.gov.br" },
            { name: "Lethycia Regina Rodrigues", role: "Supervisor", phone: "4746-5028", email: "lethycia.rodrigues@educacao.sp.gov.br" },
            { name: "Mara Silvia Bioto", role: "Supervisor", phone: "4746-7226", email: "Mara.Bioto@educacao.sp.gov.br" },
            { name: "Mirela de Oliveira Roman", role: "Supervisor", phone: "4746-5023", email: "mirela.roman@educacao.sp.gov.br" },
            { name: "Mirian Miya", role: "Supervisor", phone: "4746-7213", email: "mirian.miya@educacao.sp.gov.br" },
            { name: "Núbia Ferreira de Melo", role: "Supervisor", phone: "4746-5025", email: "Nubia.Melo@educacao.sp.gov.br" },
            { name: "Patrícia Ferreira", role: "Supervisor", phone: "4746-5029", email: "patricia.ferreira04@educacao.sp.gov.br" },
            { name: "Patrícia Martins Seabra", role: "Supervisor", phone: "4746-7225", email: "patricia.seabra@educacao.sp.gov.br" },
            { name: "Raquel Tegedor Azevedo", role: "Supervisor", phone: "***", email: "raquel.azevedo@educacao.sp.gov.br" },
            { name: "Reni Gomes Pereira", role: "Supervisor", phone: "***", email: "reni.silva@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "EEC - Especialistas em Currículo",
        icon: "fa-book",
        members: [
            { name: "Daniela Lusni de Souza", role: "CEC", phone: "4746-7232", email: "daniella.souza@educacao.sp.gov.br" },
            { name: "Alessandra Wink", role: "PEC", phone: "4746-5041 / 6041", email: "alessandra.wink@educacao.sp.gov.br" },
            { name: "Ana Deise Lavor Firmino", role: "PEC", phone: "4746-5050 / 6050", email: "ana.firmino@educacao.sp.gov.br" },
            { name: "Amanda Paula Rodrigues Teixeira", role: "PEC", phone: "***", email: "amanda.teixeira01@educacao.sp.gov.br" },
            { name: "Ari Oliveira Carvalho Junior", role: "PEC", phone: "4746-5036 / 6036", email: "ari.junior@educacao.sp.gov.br" },
            { name: "Camila Santos Rocha", role: "PEC", phone: "4746-7217", email: "camilasantosrocha@prof.educacao.sp.gov.br" },
            { name: "Carlor M Prechecham", role: "PEC", phone: "4746-5044 / 6044", email: "precechan@prof.educacao.sp.gov.br" },
            { name: "Claudia B.S Mirandola", role: "PEC", phone: "4746-5040 / 6040", email: "Claudia.Mirandola@educacao.sp.gov.br" },
            { name: "Fabio de Paula Ferraz", role: "PEC", phone: "4746-7222", email: "fabioferraz@prof.educacao.sp.gov.br" },
            { name: "Fabiana Gomes Ramos da Silva", role: "PEC", phone: "***", email: "fabiana.silva26@educacao.sp.gov.br" },
            { name: "Jessica Souza Kumagai", role: "PEC", phone: "4746-5042 / 6042", email: "jessica.kumagai@educacao.sp.gov.br" },
            { name: "Jose Vandei Silva de Oliveira", role: "PEC", phone: "4746-5037 / 6037", email: "josevandei@prof.educacao.sp.gov.br" },
            { name: "Josiane Marques Moreira", role: "PEC", phone: "4746-5049 / 6049", email: "josiane.conceicao@educacao.sp.gov.br" },
            { name: "Lais Guimarães Furst", role: "PEC", phone: "4746-7251", email: "lais.furst@educacao.sp.gov.br" },
            { name: "Marcelo Vicente C. da Silva", role: "PEC", phone: "***", email: "marcelo.silva24@servidor.educacao.sp.gov.br" },
            { name: "Marcia Yoshiko Buto", role: "PEC", phone: "4746-7218", email: "marcia.buto@educacao.sp.gov.br" },
            { name: "Marinete Pereira de Souza", role: "PEC", phone: "4746-5048 / 6048", email: "marineteoliveira@prof.educacao.sp.gov.br" },
            { name: "Midian de Almeida Pereira", role: "PEC", phone: "***", email: "midian.pereira@educacao.sp.gov.br" },
            { name: "Nubia Miranda da Silva", role: "PEC", phone: "***", email: "nubia.silva02@educacao.sp.gov.br" },
            { name: "Paula Margarete Alves", role: "PEC", phone: "4746-7216", email: "paula.alves02@educacao.sp.gov.br" },
            { name: "Priscila Ribeiro da Silva", role: "PEC", phone: "***", email: "priscila.silva19@educacao.sp.gov.br" },
            { name: "Sandra Regina Soares Clemente", role: "PEC", phone: "4746-5038", email: "sandra.clemente@educacao.sp.gov.br" },
            { name: "Thais Aleksejuk Bernardes", role: "PEC", phone: "4746-5043 / 6043", email: "aleksejuk@prof.educacao.sp.gov.br" },
            { name: "Valeria Santos França", role: "PEC", phone: "4746-5039 / 6039", email: "Valeria.Franca@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "SEGRE - Gestão da Rede Escolar",
        icon: "fa-school",
        members: [
            { name: "Maria Leonor Prado Callil", role: "Chefe de Serviço", phone: "4746-7237", email: "suz.segre@educacao.sp.gov.br" },
            { name: "Rodrigo Henrique M da Silva", role: "Chefe de Seção / SEVESC", phone: "4746-7239", email: "suz.sevesc@educacao.sp.gov.br" },
            { name: "Vanessa Pereira A. Gil", role: "Chefe de Seção / SEMAT", phone: "4746-7242", email: "suz.semat@educacao.sp.gov.br" },
            { name: "Henriqueta Rafaela S. Candido", role: "SEMAT", phone: "4746-7241", email: "suz.semat@educacao.sp.gov.br" },
            { name: "Leonor Akiko Kamimura Uono", role: "SEVESC", phone: "4746-5019", email: "suz.sevesc@educacao.sp.gov.br" },
            { name: "Ronaldo Spinola Nunes", role: "SEMAT / Assistente", phone: "4746-5016", email: "suz.semat@educacao.sp.gov.br" },
            { name: "Giovanna D'arc Da Silva", role: "SEMAT / Estagiário", phone: "*", email: "es.giovanna.silva@educacao.sp.gov.br" },
        ]
    },
    {
        sector: "SEINTEC - Tecnologia e Info",
        icon: "fa-laptop",
        members: [
            { name: "Carlos Alexandre da Silva Camillo", role: "SEINTEC", phone: "4746-5021", email: "suz.seintec@educacao.sp.gov.br" },
            { name: "Samuel Carvalho da Silva", role: "SETEC", phone: "4746-7258 / 7240", email: "suz.setec@educacao.sp.gov.br" },
            { name: "Bryan dos Santos Nascimento", role: "SEINTEC / Estagiário", phone: "", email: "suz.seintec@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "SEAFIN - Admin e Finanças",
        icon: "fa-calculator",
        members: [
            { name: "Elaine Cristina Lopes", role: "Chefe de Serviço", phone: "4746-7231", email: "suz.seafin@educacao.sp.gov.br" },
            { name: "Ana Vitorina Dias", role: "Chefe de Seção / SEFIN", phone: "4746-7259", email: "suz.sefin@educacao.sp.gov.br" },
            { name: "Jessica Muniz D. Ferreira", role: "Chefe de Seção / SECOMSE", phone: "4746-5057", email: "suz.secomse@educacao.sp.gov.br" },
            { name: "Veridiana dos Santos Vigantzky", role: "SECOMSE", phone: "4746-5011", email: "jessica.ferreira02@educacao.sp.gov.br" },
            { name: "Wlanyse Pantoja Beckman", role: "SEAFIN", phone: "4746-5001", email: "suz.sefin@educacao.sp.gov.br" },
            { name: "Dulceleia Archanjo Alves", role: "SEAFIN", phone: "4746-7248", email: "dulcileia.oliveira@educacao.sp.gov.br" },
            { name: "Renato Alexandre Fumes", role: "SEAFIN", phone: "4746-5052", email: "suz.sefin@educacao.sp.gov.br" },
            { name: "Joana D'arc Custódio", role: "SEAFIN", phone: "4746-7252", email: "joana.silva05@educacao.sp.gov.br" },
            { name: "Osmarina Corrêa Coelho", role: "SEAFIN", phone: "4746-5004", email: "osmarina.cerqueira@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "SEOM - Obras e Manutenção",
        icon: "fa-wrench",
        members: [
            { name: "Lilian Barros Ramos de Oliveira", role: "Chefe de Serviço / SEOM", phone: "4746-7238", email: "suz.seom@educacao.sp.gov.br" },
            { name: "Dirnê de Sá Novaes Silva", role: "Chefe de Seção / SEFISC", phone: "4746-5003", email: "suz.sefisc@educacao.sp.gov.br" },
            { name: "Jeferson Paulino", role: "SEFISC", phone: "4746-6047", email: "suz.seom@educacao.sp.gov.br" },
            { name: "Elias Correia Francisco", role: "SEOM / Assistente", phone: "4746-6047", email: "suz.seom@educacao.sp.gov.br" },
            { name: "Amilton Chagas da Silva Vitor", role: "SEOM / Assistente", phone: "4746-6047", email: "suz.seom@educacao.sp.gov.br" }
        ]
    },
    {
        sector: "SEPES - Serviço de Pessoas",
        icon: "fa-users",
        members: [
            { name: "Taynã Iara da Silva Pinto Moura", role: "Chefe de Serviço", phone: "4746-5006", email: "suz.sepes@educacao.sp.gov.br" },
            { name: "Vanessa Sutt", role: "Chefe de Seção / SEAPE", phone: "4746-7249", email: "suz.seape@educacao.sp.gov.br" },
            { name: "Cristina do Vale", role: "Chefe de Seção / SEFREP", phone: "4746-7245", email: "suz.sefrep@educacao.sp.gov.br" },
            { name: "Aline Cardoso de Sá", role: "SEAPE", phone: "4746-7250", email: "aline.sa02@educacao.sp.gov.br" },
            { name: "Fran Galvão", role: "SEAPE", phone: "4746-5009", email: "francinalva.galvao@educacao.sp.gov.br" },
            { name: "Luiz Barros Orfão", role: "SEAPE", phone: "4746-5010", email: "luiz.orfao@educacao.sp.gov.br" },
            { name: "Mario Mendes Leal Filho", role: "SEAPE", phone: "4746-7255", email: "mariomendes@professor.educacao.sp.gov.br" },
            { name: "Regina Ramos de Lima Vieira", role: "SEAPE", phone: "4746-5012", email: "suz.seape@educacao.sp.gov.br" },
            { name: "Rita de Cássia Castro Souza", role: "SEAPE", phone: "4746-7230", email: "suz.seape@educacao.sp.gov.br" },
            { name: "Maria Inaídes Pereira Góes", role: "SEAPE", phone: "4746-7254", email: "suz.seape@educacao.sp.gov.br" },
            { name: "Angelica Rodrigues Sousa de Oliveira", role: "SEFREP", phone: "4746-5015", email: "suz.sefrep@educacao.sp.gov.br" },
            { name: "Eliane Durval da Silva", role: "SEFREP", phone: "4746-7234", email: "Eliane.Silva01@educacao.sp.gov.br" },
            { name: "Rosangela Aparecida Ramos", role: "SEFREP", phone: "4746-5018", email: "rosangela.silva52@educacao.sp.gov.br" },
            { name: "Wilma Aparecida de Rezende", role: "SEFREP", phone: "4746-7229", email: "wilma.rezende@educacao.sp.gov.br" },
            { name: "Iva Rosa Santos de Oliveira", role: "SEFREP", phone: "4746-5013", email: "Iva.santos01@educacao.sp.gov.br" },
            { name: "Erika Karen Vitor F. da Silva", role: "SEFREP", phone: "4746-7215", email: "erika.barbosa@educacao.sp.gov.br" },
            { name: "Daniela Soares Silva Resende", role: "SEFREP", phone: "4746-5017", email: "daniela.resende@educacao.sp.gov.br" }
        ]
    }
];

const container = document.getElementById('directory-grid');

function renderContacts() {
    container.innerHTML = "";

    database.forEach(dept => {
        const section = document.createElement('div');
        section.className = 'sector-section';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `<h2 class="sector-title"><i class="fa-solid ${dept.icon}"></i> ${dept.sector}</h2>`;
        section.appendChild(titleDiv);

        if (dept.info) {
            const info = document.createElement('p');
            info.className = 'sector-info';
            info.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${dept.info}`;
            section.appendChild(info);
        }

        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'cards-container';

        dept.members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'contact-card';

            card.innerHTML = `
                <div class="role">${member.role}</div>
                <div class="name">${member.name}</div>
                
                <div class="contact-info">
                    <div class="info-item">
                        <i class="fa-solid fa-phone"></i>
                        <a href="tel:${member.phone.replace(/[^0-9]/g, '')}">${member.phone}</a>
                    </div>
                    
                    <div class="info-item">
                        <i class="fa-solid fa-envelope"></i>
                        <a href="mailto:${member.email}" title="Enviar email">${member.email}</a>
                    </div>
                </div>
            `;
            cardsGrid.appendChild(card);
        });

        section.appendChild(cardsGrid);
        container.appendChild(section);
    });
}

document.addEventListener('DOMContentLoaded', renderContacts);
