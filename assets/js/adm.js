function acionarEntrarAdm() {
    var txtEmailAdm = document.getElementById('txtEmail').value;
    var txtSenhaAdm = document.getElementById('txtSenha').value;

    if (txtEmailAdm == "admin@gmail.com" && txtSenhaAdm == "admin123") {
        window.location.href = "adm.html";
    } else {
        alert("Usuário incorreto");
    }
}

const loginOff = document.getElementById('btnSair');
if (loginOff) {
    loginOff.addEventListener('click', function () {
        window.location.href = "loginAdm.html";
    });
}


// Lista do menu
const acessarPacientes = document.getElementById('acessarPacientes');
const acessarConsultas = document.getElementById('acessarConsultas');
const acessarRelatorios = document.getElementById('acessarRelatorios');
const acessarMensagens = document.getElementById('acessarMensagens');
const mensagemInicial = document.getElementById('mensagemInicial');

// Lista sessões
const pacientesCadastrados = document.getElementById('pacientesCadastrados');
const consultas = document.getElementById('consultas');
const relatorio = document.getElementById('relatorio');
const mensagens = document.getElementById('mensagens')

if (acessarPacientes) {
    acessarPacientes.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de consultas. Aqui você pode acessar todas as informações relacionadas aos pacientes.'
        pacientesCadastrados.style.display = 'flex';
        consultas.style.display = 'none';
        relatorio.style.display = 'none';
        mensagens.style.display = 'none';
    })
}

if (acessarConsultas) {
    acessarConsultas.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de consultas. Aqui você pode acessar todas as informações relacionadas às consultas marcadas e aos históricos dos pacientes.'
        consultas.style.display = 'flex';
        pacientesCadastrados.style.display = 'none';
        relatorio.style.display = 'none';
        mensagens.style.display = 'none';
    })
}

if (acessarRelatorios) {
    acessarRelatorios.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de relatórios. Aqui você pode acessar todas as informações sobre a avalição dos pacientes.'
        relatorio.style.display = 'flex';
        consultas.style.display = 'none';
        pacientesCadastrados.style.display = 'none';
        mensagens.style.display = 'none';
    })
}

if (acessarMensagens) {
    acessarMensagens.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de mensagems. Aqui você pode acessar todas as mensagens enviadas por meio do site.'
        mensagens.style.display = 'flex';
        relatorio.style.display = 'none';
        consultas.style.display = 'none';
        pacientesCadastrados.style.display = 'none';
    })
}

// função para filtro
function alternarCampos() {
    const radioNomeChecked = document.getElementById("radioNome").checked;
    const radioDataChecked = document.getElementById("radioData").checked;
    const inpNome = document.getElementById("txtNome");
    const inpData = document.getElementById("txtData");

    inpNome.style.display = radioNomeChecked ? "flex" : "none";
    inpData.style.display = radioDataChecked ? "flex" : "none";
}

function filtrarTabelaPacientes() {
    const input = document.getElementById("txtNome");
    const filtro = input.value.toUpperCase();
    const tabela = document.getElementById("tabelaPacientes");
    const linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const colunaNome = linhas[i].getElementsByTagName("td")[0]; // Primeira coluna é o nome do paciente
        if (colunaNome) {
            const textoNome = colunaNome.textContent.toUpperCase();
            if (textoNome.includes(filtro)) {
                linhas[i].style.display = ""; // Mostra a linha
            } else {
                linhas[i].style.display = "none"; // Esconde a linha
            }
        }
    }
}


