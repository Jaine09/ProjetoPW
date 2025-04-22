if (loginOff) {
    loginOff.addEventListener('click', function () {
        localStorage.removeItem('usuarioLogado'); // Remove a flag de logado
        window.location.href = "../index.html";

        const btnLogar = document.querySelectorAll('.btnEntrarCadastrar');
        const btnLogado = document.querySelectorAll('.btnLogado');
        const distanciaElement = document.getElementById('distancia');
        const tempoElement = document.getElementById('tempo');
        const stickDistancia = document.querySelector('.stick-distancia');

        btnLogar.forEach(button => {
            button.style.visibility = 'visible';
            button.style.display = 'flex';
        });
        btnLogado.forEach(button => {
            button.style.visibility = 'hidden';
            button.style.display = 'none';
        });

        if (distanciaElement) distanciaElement.textContent = '';
        if (tempoElement) tempoElement.textContent = '';
        if (stickDistancia) stickDistancia.style.display = 'none';

    });
}

//Listas do menu lateral
const acessarHistorico = document.getElementById('acessarHistorico');
const acessarDados = document.getElementById('acessarDadosPessoais');
const acessarEndereco = document.getElementById('acessarEndereco');
const acessarAvaliacoes = document.getElementById('acessarAvaliacoes');

//Lista das sessões
const historico = document.getElementById('historico');
const dadosPessoais = document.getElementById('dadosPessoais');
const endereco = document.getElementById('endereco');
const avaliacoes = document.getElementById('avaliacoes');
const sessaoAgendarConsulta = document.getElementById('agendarConsulta');

if (acessarHistorico) {
    acessarHistorico.addEventListener('click', function () {
        historico.style.display = 'flex';
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'none';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';

    });
}
if (acessarDados) {
    acessarDados.addEventListener('click', function () {
        
        historico.style.display = 'none';
        endereco.style.display = 'none';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';
        dadosPessoais.style.display = 'flex';
        desabilitarCampos();

    });
}
if (acessarEndereco) {
    acessarEndereco.addEventListener('click', function () {
        historico.style.display = 'none';
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'flex';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';
    });
}
if (acessarAvaliacoes) {
    acessarAvaliacoes.addEventListener('click', function () {
        historico.style.display = 'none';
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'none';
        avaliacoes.style.display = 'flex';
        sessaoAgendarConsulta.style.display = 'none';
    });
}

const nomeInput = document.getElementById('txtAlterarNome');
const dataNascimento = document.getElementById('txtAlterarDataNascimento');
const cpfInput = document.getElementById('txtAlterarCpf');
const telefoneInput = document.getElementById('txtAlterarTelefone');
const emailInput = document.getElementById('txtAlterarEmail');
const senhaInput = document.getElementById('txtAlterarSenha');



function habilitarCampos() {
    nomeInput.disabled = false;
    dataNascimento.disabled = false;
    cpfInput.disabled = false;
    telefoneInput.disabled = false;
    emailInput.disabled = false;
    senhaInput.disabled = false;

    localStorage.getItem('informacoesUsuario', JSON.stringify(informacoesUsuario));

    nomeInput.setAttribute('placeholder', '');
    dataNascimento.setAttribute('placeholder', '');
    cpfInput.setAttribute('placeholder', '');
    telefoneInput.setAttribute('placeholder', '');
    emailInput.setAttribute('placeholder', '');
    senhaInput.setAttribute('placeholder', '');
}

function desabilitarCampos() {
    nomeInput.disabled = true;
    dataNascimento.disabled = true;
    cpfInput.disabled = true;
    telefoneInput.disabled = true;
    emailInput.disabled = true;
    senhaInput.disabled = true;

    const usuarioInfoString = localStorage.getItem('informacoesUsuario');
    if (usuarioInfoString) {
        const usuarioInfo = JSON.parse(usuarioInfoString);

        nomeInput.value = usuarioInfo.nome || ''; 
        dataNascimento.value = usuarioInfo.dataNascimento || '';
        cpfInput.value = usuarioInfo.cpf || '';
        telefoneInput.value = usuarioInfo.telefone || '';
        emailInput.value = usuarioInfo.email || '';
        senhaInput.value = usuarioInfo.senha || '';

        nomeInput.setAttribute('placeholder', nomeInput.value);
        dataNascimento.setAttribute('placeholder', dataNascimento.value);
        cpfInput.setAttribute('placeholder', cpfInput.value);
        telefoneInput.setAttribute('placeholder', telefoneInput.value);
        emailInput.setAttribute('placeholder', emailInput.value);
        senhaInput.setAttribute('placeholder', senhaInput.value);
    } else {
        console.log("Nenhuma informação de usuário encontrada no localStorage.");
    }
}

function agendarConsulta() {
    historico.style.display = 'none';
    sessaoAgendarConsulta.style.display = 'flex';
}

const adicionandoAvaliacao = document.getElementById('formAvaliacoes');

function adicionarAvaliacao() {
    avaliacoes.style.display = 'none';
    adicionandoAvaliacao.style.display = 'flex';
}