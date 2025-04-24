const loginOff = document.getElementById('btnSair');
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


//Declarando elemento da localStorge
const usuarioInfoString = localStorage.getItem('email');

function pegandoNomeUsuario() {
    let usuarioInfo;

    if (usuarioInfoString) {

        usuarioInfo = JSON.parse(usuarioInfoString);
        const nomeDoPaciente = usuarioInfo.nome;

        const nomePacienteSpan = document.getElementById('nomePaciente');

        if (nomePacienteSpan) {
            nomePacienteSpan.textContent = nomeDoPaciente;
        } else {
            alert("entrou")
            console.error("Elemento com ID 'nomePaciente' não encontrado no HTML.");
        }
    } else {
        console.log("Informações do usuário não encontradas no localStorage.");
    }
}

pegandoNomeUsuario()

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

        var alterarSenha = document.querySelectorAll('.novaSenha');
        alterarSenha.forEach(alteracao => {
        alteracao.style.display = 'none';
        });

        var habilitar = document.getElementById('editarInformações');
        var salvar = document.getElementById('salvarInformacoesUsuario');
        var descartar = document.getElementById('descartarInformacaoUsuario');

        habilitar.style.display = "flex";
        salvar.style.display = "none";
        descartar.style.display = "none";

        const salvarBotao = document.getElementById('salvarInformacoesUsuario');
        const descartarBotao = document.getElementById('descartarInformacaoUsuario');
        if (salvarBotao && descartarBotao) {
            salvarBotao.disabled = true;
            descartarBotao.disabled = true;
            const inputsDadosPessoais = dadosPessoais.querySelectorAll('input');
            const selectsDadosPessoais = dadosPessoais.querySelectorAll('select');
            const elementosForm = [...inputsDadosPessoais, ...selectsDadosPessoais];
            elementosForm.forEach(elemento => {
                elemento.addEventListener('input', () => {
                    salvarBotao.disabled = false;
                    descartarBotao.disabled = false;
                });
                elemento.addEventListener('change', () => {
                    salvarBotao.disabled = false;
                    descartarBotao.disabled = false;
                });
            });
        }

    });
}
if (acessarEndereco) {
    acessarEndereco.addEventListener('click', function () {
        historico.style.display = 'none';
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'flex';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';
        desabilitarCamposEndereco();

        var habilitar = document.getElementById('editarEndereco');
        var salvar = document.getElementById('salvarEdicaoEndereco');
        var descartar = document.getElementById('descartarAlteracaoEndereco');

        habilitar.style.display = "flex";
        salvar.style.display = "none";
        descartar.style.display = "none";

        const salvarBotao = document.getElementById('salvarInformacoesUsuario');
        const descartarBotao = document.getElementById('descartarInformacaoUsuario');
        if (salvarBotao && descartarBotao) {
            salvarBotao.disabled = true;
            descartarBotao.disabled = true;
            const inputsDadosPessoais = dadosPessoais.querySelectorAll('input');
            const selectsDadosPessoais = dadosPessoais.querySelectorAll('select');
            const elementosForm = [...inputsDadosPessoais, ...selectsDadosPessoais];
            elementosForm.forEach(elemento => {
                elemento.addEventListener('input', () => {
                    salvarBotao.disabled = false;
                    descartarBotao.disabled = false;
                });
                elemento.addEventListener('change', () => {
                    salvarBotao.disabled = false;
                    descartarBotao.disabled = false;
                });
            });
        }
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

function habilitarEdicao() {
    var habilitar = document.getElementById('editarInformações');
    var salvar = document.getElementById('salvarInformacoesUsuario');
    var descartar = document.getElementById('descartarInformacaoUsuario');

    habilitar.style.display = "none";
    salvar.style.display = "flex";
    salvar.disabled = true;
    descartar.style.display = "flex";
    descartar.disabled = true;

    var alterarSenha = document.querySelectorAll('.novaSenha');
    alterarSenha.forEach(alteracao => {
        alteracao.style.display = 'flex';
    });
    habilitarCampos();
}

function salvarAlteracao() {
    //botões
    var salvar = document.getElementById('salvarInformacoesUsuario');
    var descartar = document.getElementById('descartarInformacaoUsuario');


    //elementos form
    var novaSenhaInput = document.getElementById('txtNovaSenha').value;
    var confirmarSenhaInput = document.getElementById('txtConfirmarSenha').value;
    alert("salvar ativo")
    var mensagemSenha = document.getElementById('mensagemSenha');

    var usuarioInfoString = localStorage.getItem('email');
    var usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};
    var houveAlteracao = false;

    if (novaSenhaInput || confirmarSenhaInput) {
        if (novaSenhaInput === confirmarSenhaInput) {
            usuarioInfo.senha = novaSenhaInput;
            houveAlteracao = true;
            mensagemSenha.textContent = "";
        } else {
            mensagemSenha.textContent = "A nova senha e a confirmação não coincidem!";
            mensagemSenha.style.color = "red";
            return;
        }
    }

    if (nomeInput.value !== usuarioInfo.nome) {
        usuarioInfo.nome = nomeInput.value;
        houveAlteracao = true;
        alert("Nome alterado");
    }

    if (telefoneInput.value !== usuarioInfo.telefone) {
        usuarioInfo.telefone = telefoneInput.value;
        houveAlteracao = true;
        alert("telefone alterado");
    }

    if (emailInput.value !== usuarioInfo.email) {
        usuarioInfo.email = emailInput.value;
        houveAlteracao = true;
        alert("email alterado");
    }

    if (houveAlteracao) {
        alert("salvando");
        if (salvar && descartar) {
            salvar.disabled = false;
            descartar.disabled = false;
        }
        localStorage.setItem('email', JSON.stringify(usuarioInfo));
    }
}

function descartarAlteracao() {
    var salvar = document.getElementById('salvarInformacoesUsuario');
    var descartar = document.getElementById('descartarInformacaoUsuario');

    var novaSenhaInput = document.getElementById('txtNovaSenha').value;
    var confirmarSenhaInput = document.getElementById('txtConfirmarSenha').value;

    const usuarioInfoString = localStorage.getItem('email');
    const usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};

    // Restaura os valores dos campos com os dados originais
    nomeInput.value = usuarioInfo.nome || '';
    telefoneInput.value = usuarioInfo.telefone || '';
    emailInput.value = usuarioInfo.email || '';
    senhaInput.value = usuarioInfo.senha || '';
    novaSenhaInput.value = '';
    confirmarSenhaInput.value = '';
    
    // Desabilita os botões Salvar e Descartar novamente
    if (salvar && descartar) {
        salvar.disabled = true;
        descartar.disabled = true;
    }
}


function habilitarCampos() {
    nomeInput.disabled = false;
    telefoneInput.disabled = false;
    emailInput.disabled = false;
    senhaInput.disabled = false;

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

    var usuarioInfoString = localStorage.getItem('email');

    if (usuarioInfoString) {

        var usuarioInfo = JSON.parse(usuarioInfoString);

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

//elementos forms endereço
const cepInput = document.getElementById('alterarCep');
const ruaInput = document.getElementById('alterarRua');
const numeroInput = document.getElementById('alterarNumero');
const bairroInput = document.getElementById('alterarBairro');
const cidadeInput = document.getElementById('alterarCidade');
const estadoInput = document.getElementById('alterarEstado');

function desabilitarCamposEndereco(){
    cepInput.disabled = true;
    ruaInput.disabled = true;
    numeroInput.disabled= true;
    bairroInput.disabled = true;
    cidadeInput.disabled = true;
    estadoInput.disabled = true;

    var usuarioInfoString = localStorage.getItem('email');

    if (usuarioInfoString) {

        var usuarioInfo = JSON.parse(usuarioInfoString);

        cepInput.value = usuarioInfo.cep || '';
        ruaInput.value = usuarioInfo.endereco || '';
        numeroInput.value = usuarioInfo.numero;
        bairroInput.value = usuarioInfo.bairro || '';
        cidadeInput.value = usuarioInfo.cidade || '';
        estadoInput.value = usuarioInfo.estado || '';

        cepInput.setAttribute('placeholder', cepInput.value);
        ruaInput.setAttribute('placeholder', ruaInput.value);
        bairroInput.setAttribute('placeholder', bairroInput.value);
        cidadeInput.setAttribute('placeholder', cidadeInput.value);
        estadoInput.setAttribute('placeholder', estadoInput.value);
    } else {
        console.log("Nenhuma informação de usuário encontrada no localStorage.");
    }
}

function habilitarEdicaoEndereco(){
    cepInput.disabled = false;

    cepInput.setAttribute('placeholder', '');
    var habilitar = document.getElementById('editarEndereco');
    var salvar = document.getElementById('salvarEdicaoEndereco');
    var descartar = document.getElementById('descartarAlteracaoEndereco');

    habilitar.style.display = "none";
    salvar.style.display = "flex";
    salvar.disabled = true;
    descartar.style.display = "flex";
    descartar.disabled = true;

    var alterarSenha = document.querySelectorAll('.novaSenha');
    alterarSenha.forEach(alteracao => {
        alteracao.style.display = 'flex';
    });
    habilitarCamposEndereco();
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