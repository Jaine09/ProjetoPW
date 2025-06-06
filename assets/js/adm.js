function acionarEntrarAdm() {
    var txtEmailAdm = document.getElementById('txtEmail').value;
    var txtSenhaAdm = document.getElementById('txtSenha').value;

    if (txtEmailAdm == "draAna@gmail.com" && txtSenhaAdm == "admin123") {
        window.location.href = "adm.html";
    } else {
        alert("Usuário incorreto");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPacientesParaAdm();
    document.getElementById("txtNomePaciente").addEventListener("input", aplicarFiltroPacientes);
    document.getElementById("txtDataPaciente").addEventListener("change", aplicarFiltroPacientes);
});

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
const mensagens = document.getElementById('mensagens');


if (acessarPacientes) {
    acessarPacientes.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de consultas. Aqui você pode acessar todas as informações relacionadas aos pacientes.'
        pacientesCadastrados.style.display = 'flex';
        consultas.style.display = 'none';
        relatorio.style.display = 'none';
        mensagens.style.display = 'none';

        document.getElementById("txtNomePaciente").addEventListener("input", aplicarFiltroPacientes);
        document.getElementById("txtDataPaciente").addEventListener("change", aplicarFiltroPacientes);
        carregarPacientesParaAdm();

    })
}

if (acessarConsultas) {
    acessarConsultas.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de consultas. Aqui você pode acessar todas as informações relacionadas às consultas marcadas e aos históricos dos pacientes.'
        consultas.style.display = 'flex';
        pacientesCadastrados.style.display = 'none';
        relatorio.style.display = 'none';
        mensagens.style.display = 'none';

        document.getElementById("txtNomeConsulta").addEventListener("input", aplicarFiltroConsultas);
        document.getElementById("txtDataConsulta").addEventListener("change", aplicarFiltroConsultas);
        carregarConsultasParaAdm();

    })
}

if (acessarRelatorios) {
    acessarRelatorios.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de relatórios. Aqui você pode acessar todas as informações sobre a avalição dos pacientes.'
        relatorio.style.display = 'flex';
        consultas.style.display = 'none';
        pacientesCadastrados.style.display = 'none';
        mensagens.style.display = 'none';
        carregarRelatorioParaAdm();
    })
}

if (acessarMensagens) {
    acessarMensagens.addEventListener('click', function () {
        mensagemInicial.textContent = 'Seja bem-vinda ao portal de gerenciamento de mensagems. Aqui você pode acessar todas as mensagens enviadas por meio do site.'
        mensagens.style.display = 'flex';
        relatorio.style.display = 'none';
        consultas.style.display = 'none';
        pacientesCadastrados.style.display = 'none';

        carregarMensagens();
    })
}

// função para filtro
function alternarCampos(elemento) {
    const container = elemento.closest("form");

    const radioNome = container.querySelector(".radioNome");
    const radioData = container.querySelector(".radioData");
    const inputNome = container.querySelector(".txtNome");
    const inputData = container.querySelector(".txtData");

    inputNome.style.display = radioNome.checked ? "flex" : "none";
    inputData.style.display = radioData.checked ? "flex" : "none";
}


function carregarPacientesParaAdm() {
    const usuariosString = localStorage.getItem('usuarios');
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    const corpoTabela = document.getElementById('corpoTabelaPacientes');

    corpoTabela.innerHTML = ''; // limpa tabela

    usuarios.forEach((usuario) => {
        const linha = corpoTabela.insertRow();

        linha.insertCell().textContent = usuario.nome || '-';
        linha.insertCell().textContent = usuario.email || '-';
        linha.insertCell().textContent = formatarDataExibicao(usuario.dataNascimento) || '-';
        linha.insertCell().textContent = `${usuario.endereco || ''}, ${usuario.numero || ''}, ${usuario.cidade || ''}` || '-';
    });

    aplicarFiltroPacientes();
}

function carregarConsultasParaAdm() {
    const corpoTabela = document.getElementById('corpoTabelaConsultas');
    corpoTabela.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const hoje = new Date();

    usuarios.forEach(usuario => {
        const chaveConsultas = 'consultas_' + usuario.email;
        const consultasUsuario = JSON.parse(localStorage.getItem(chaveConsultas)) || [];

        let consultasAtualizadas = false;

        consultasUsuario.forEach((consulta, index) => {
            // Verifica se a data é passada
            const partesData = consulta.data?.split('/') || [];
            const dataConsulta = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}`);

            if (dataConsulta < hoje && consulta.status !== 'Realizada') {
                consulta.status = 'Realizada';
                consultasAtualizadas = true;
            }

            const linha = corpoTabela.insertRow();

            linha.insertCell().textContent = usuario.nome;
            linha.insertCell().textContent = consulta.especialidade || '-';
            linha.insertCell().textContent = formatarDataExibicao(consulta.data) || '-';
            linha.insertCell().textContent = consulta.hora || '-';

            // Coluna Exame
            const cellExame = linha.insertCell();
            if (consulta.status !== 'Desmarcada' && consulta.status !== 'Cancelada') {
                const inputExame = document.createElement('input');
                inputExame.type = 'file';
                inputExame.accept = '.pdf,.doc,.docx';
                inputExame.onchange = (e) => salvarArquivoConsulta(usuario.email, index, 'exame', e.target.files[0]);
                cellExame.appendChild(inputExame);
            } else {
                cellExame.textContent = 'N/A';
            }

            // Coluna Receita
            const cellReceita = linha.insertCell();
            if (consulta.status !== 'Desmarcada' && consulta.status !== 'Cancelada') {
                const inputReceita = document.createElement('input');
                inputReceita.type = 'file';
                inputReceita.accept = '.pdf,.doc,.docx';
                inputReceita.onchange = (e) => salvarArquivoConsulta(usuario.email, index, 'receita', e.target.files[0]);
                cellReceita.appendChild(inputReceita);
            } else {
                cellReceita.textContent = 'N/A';
            }

            const cellStatus = linha.insertCell();
            const statusSpan = document.createElement('span');
            statusSpan.textContent = consulta.status || 'Pendente';
            statusSpan.className = (consulta.status === 'Realizada') ? 'status-realizada' : 'status-pendente';
            cellStatus.appendChild(statusSpan);

            const acoes = linha.insertCell();
            if (consulta.status === 'Pendente') {
                const btnAbrirModal = document.createElement('button');
                btnAbrirModal.textContent = '⋮';
                btnAbrirModal.style.backgroundColor = 'transparent';
                btnAbrirModal.style.width = '30px';
                btnAbrirModal.style.height = '30px';
                btnAbrirModal.style.border = 'none';
                btnAbrirModal.style.cursor = 'pointer';
                btnAbrirModal.onclick = () => abrirModalConsulta(usuario.email, index, consulta);
                acoes.appendChild(btnAbrirModal);
            } else {
                acoes.textContent = 'Consulta ' + consulta.status;
            }

        });

        if (consultasAtualizadas) {
            localStorage.setItem(chaveConsultas, JSON.stringify(consultasUsuario));
        }

        aplicarFiltroConsultas();
    });
}

let consultaSelecionadaIndex = null;
let consultaSelecionadaEmail = null;

function abrirModalConsulta(email, index, consulta) {
    consultaSelecionadaIndex = index;
    consultaSelecionadaEmail = email;
    const info = `Consulta de ${consulta.especialidade} marcada para ${consulta.data} às ${consulta.hora}. Confirmar ou desmarcar?`;
    document.getElementById('infoConsulta').textContent = info;
    document.getElementById('modalConfirmarDesmarcar').style.display = 'flex';
}

function fecharModalConsulta() {
    document.getElementById('modalConfirmarDesmarcar').style.display = 'none';
    consultaSelecionadaIndex = null;
    consultaSelecionadaEmail = null;
}

function marcarComoRealizada() {
    atualizarStatusConsulta(consultaSelecionadaEmail, consultaSelecionadaIndex, 'Realizada');
    fecharModalConsulta();
}

function marcarComoDesmarcada() {
    atualizarStatusConsulta(consultaSelecionadaEmail, consultaSelecionadaIndex, 'Desmarcada');
    fecharModalConsulta();
}

function atualizarStatusConsulta(email, index, novoStatus) {
    const chave = 'consultas_' + email;
    let consultas = JSON.parse(localStorage.getItem(chave)) || [];

    if (consultas[index]) {
        consultas[index].status = novoStatus;
        localStorage.setItem(chave, JSON.stringify(consultas));
        carregarConsultasParaAdm();
        if (localStorage.getItem('usuarioLogado') === email) {
            carregarConsultasPaciente();
        }
    }
}

function salvarArquivoConsulta(email, index, tipo, arquivo) {
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (event) {
        const base64 = event.target.result;

        const chave = 'consultas_' + email;
        const consultas = JSON.parse(localStorage.getItem(chave)) || [];

        if (consultas[index]) {
            consultas[index][tipo] = base64; // tipo = "exame" ou "receita"
            localStorage.setItem(chave, JSON.stringify(consultas));
            alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} anexado com sucesso!`);
        }
    };

    leitor.readAsDataURL(arquivo);
}

function carregarRelatorioParaAdm() {
    const usuariosString = localStorage.getItem('usuarios');
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    const corpoTabela = document.getElementById('corpoTabelaRelatorio');

    corpoTabela.innerHTML = '';

    usuarios.forEach((usuario) => {
        const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes_' + usuario.email)) || [];
        avaliacoes.forEach(avaliacao => {
            const linha = corpoTabela.insertRow();
            linha.insertCell().textContent = usuario.nome || '-';
            linha.insertCell().textContent = avaliacao.data || '-';
            linha.insertCell().textContent = avaliacao.nota || '-';
            linha.insertCell().textContent = avaliacao.texto || '-';
        });
    });
}

function carregarMensagens() {
    const mensagensSalvas = JSON.parse(localStorage.getItem('mensagens')) || [];
    const corpoTabela = document.getElementById('corpoTabelaMensagens');

    corpoTabela.innerHTML = '';

    mensagensSalvas.forEach(m => {
        const linha = corpoTabela.insertRow();
        linha.insertCell().textContent = m.nome;
        linha.insertCell().textContent = m.telefone;
        linha.insertCell().textContent = m.email;
        linha.insertCell().textContent = m.mensagem;
    });
}


function aplicarFiltroPacientes() {
    const filtroNome = document.getElementById("txtNomePaciente").value.toLowerCase();
    const filtroData = document.getElementById("txtDataPaciente").value;
    const corpoTabela = document.getElementById("corpoTabelaPacientes");
    const linhas = corpoTabela.getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName("td");
        const nome = celulas[0]?.textContent.toLowerCase() || '';
        const dataNascimento = celulas[2]?.textContent || '';

        const correspondeNome = nome.includes(filtroNome);
        const correspondeData = filtroData === "" || dataNascimento.includes(filtroData.split("-").reverse().join("/"));

        if (correspondeNome && correspondeData) {
            linhas[i].style.display = "";
        } else {
            linhas[i].style.display = "none";
        }
    }
}

function formatarDataExibicao(dataISO) {
    if (!dataISO) return '';
    const partes = dataISO.split('-'); // ["2024", "05", "01"]
    if (partes.length !== 3) return dataISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



function aplicarFiltroConsultas() {
    const filtroNome = document.getElementById("txtNomeConsulta").value.toLowerCase();
    const filtroData = document.getElementById("txtDataConsulta").value;
    const corpoTabela = document.getElementById("corpoTabelaConsultas");
    const linhas = corpoTabela.getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName("td");
        const nome = celulas[0]?.textContent.toLowerCase() || '';
        const dataConsulta = celulas[2]?.textContent || '';

        const correspondeNome = nome.includes(filtroNome);

        let correspondeData = true;
        if (filtroData !== "") {
            const partesData = dataConsulta.split('/');
            if (partesData.length === 3) {
                const dia = partesData[0].padStart(2, '0');
                const mes = partesData[1].padStart(2, '0');
                const ano = partesData[2];
                const dataFormatada = `${ano}-${mes}-${dia}`;
                correspondeData = (dataFormatada === filtroData);
            } else {
                correspondeData = false;
            }
        }

        linhas[i].style.display = (correspondeNome && correspondeData) ? "" : "none";
    }
}


function abrirModal() {
    document.getElementById("modalRecuperacao").style.display = "flex";
    document.getElementById("mensagem").innerText = "";
    document.getElementById("mensagem").style.color = "black";
    document.getElementById("verificacao").style.display = "none";
    document.getElementById("formRecuperacao").reset();
}

function fecharModal() {
    document.getElementById("modalRecuperacao").style.display = "none";
}

var codigoGerado = "";
var emailUsuario = "";

function enviarCodigo(event) {
    event.preventDefault();
    emailUsuario = document.getElementById("emailRecuperacao").value.trim();

    if (!emailUsuario) {
        document.getElementById("mensagem").innerText = "Por favor, insira um e-mail válido.";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    // Gera código secreto
    codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();

    document.getElementById("mensagem").innerText = "Enviando código...";
    document.getElementById("mensagem").style.color = "black";

    setTimeout(() => {
        document.getElementById("formRecuperacao").style.display = "none";
        document.getElementById("mensagem").innerText =
            `Um código de verificação foi enviado para ${emailUsuario}.`;
        document.getElementById("mensagem").style.color = "green";
        document.getElementById("verificacao").style.display = "block";
    }, 1000);
}

function verificarCodigo() {
    const digitado = document.getElementById("codigoDigitado").value.trim();

    if (!digitado) {
        document.getElementById("mensagem").innerText = "Digite o código recebido.";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    if (digitado === codigoGerado) {
        setTimeout(() => {
            document.getElementById("modalRecuperacao").style.display = "none";
            document.getElementById("mensagem").innerText = "✅ Código verificado! Você pode acessar sua área.";
            document.getElementById("mensagem").style.color = "green";
            window.location.href = "adm.html";
        }, 1000);

    } else {
        document.getElementById("mensagem").innerText = "❌ Código incorreto. Tente novamente.";
        document.getElementById("mensagem").style.color = "red";
    }
}

document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "c") {
        alert("🔒 Código (dev): " + codigoGerado);
    }
});

