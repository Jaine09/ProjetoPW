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

window.addEventListener('load', () => {
    const hash = window.location.hash;

    const historico = document.getElementById('historico');
    const sessaoAgendarConsulta = document.getElementById('agendarConsulta');

    if (hash === '#agendarConsulta') {
        historico.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'flex';
    } else {
        historico.style.display = 'flex';
        sessaoAgendarConsulta.style.display = 'none';
    }
});


//Listas do menu lateral
const acessarHistorico = document.getElementById('acessarHistorico');
const acessarDados = document.getElementById('acessarDadosPessoais');
const acessarDadosAcompanhante = document.getElementById('acessarDadosAcompanhante');
const acessarEndereco = document.getElementById('acessarEndereco');
const acessarAvaliacoes = document.getElementById('acessarAvaliacoes');

//Lista das sessões
const historico = document.getElementById('historico');
const dadosPessoais = document.getElementById('dadosPessoais');
const dadosAcompanhante = document.getElementById('dadosAcompanhante');
const endereco = document.getElementById('endereco');
const avaliacoes = document.getElementById('avaliacoes');
const sessaoAgendarConsulta = document.getElementById('agendarConsulta');

//inputs do form dados
const nomeInput = document.getElementById('txtAlterarNome');
const dataNascimento = document.getElementById('txtAlterarDataNascimento');
const cpfInput = document.getElementById('txtAlterarCpf');
const telefoneInput = document.getElementById('txtAlterarTelefone');
const emailInput = document.getElementById('txtAlterarEmail');
const senhaInput = document.getElementById('txtAlterarSenha');

//inputs form acompanhante
const nomeAcompanhante = document.getElementById('nomeAcompanhante');
const dataNascAcompanhante = document.getElementById('dataNascimento');
const cpfAcompanhante = document.getElementById('cpfAcompanhante');
const telAcompanhante = document.getElementById('telefoneAcompanhante');
const parentescoAcompanhanteSelect = document.getElementById('parentescoAcompanhante');

//inputs do form endereco
const cepInput = document.getElementById('alterarCep');
const ruaInput = document.getElementById('alterarRua');
const numeroInput = document.getElementById('alterarNumero');
const bairroInput = document.getElementById('alterarBairro');
const cidadeInput = document.getElementById('alterarCidade');
const estadoInput = document.getElementById('alterarEstado');

function pegandoNomeUsuario() {

    var usuarioInfoString = localStorage.getItem('email');
    var usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};

    const nomeDoPaciente = usuarioInfo.nome;
    const nomePacienteSpan = document.getElementById('nomePaciente');

    if (nomePacienteSpan) {
        nomePacienteSpan.textContent = nomeDoPaciente;
    } else {
        console.error("Elemento com ID 'nomePaciente' não encontrado no HTML.");
    }

    var acessarDadosAcompanhante = document.getElementById('acessarDadosAcompanhante');


    if (usuarioInfo.idade < 18) {
        acessarDadosAcompanhante.style.display = "flex";
    }
}

pegandoNomeUsuario()

if (acessarHistorico) {
    acessarHistorico.addEventListener('click', function () {
        historico.style.display = 'flex';
        dadosPessoais.style.display = 'none';
        dadosAcompanhante.style.display = "none";
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
        dadosAcompanhante.style.display = "none";
        sessaoAgendarConsulta.style.display = 'none';
        dadosPessoais.style.display = 'flex';
        desabilitarCampos();

        var alterarSenha = document.querySelectorAll('.novaSenha');
        alterarSenha.forEach(alteracao => {
            alteracao.style.display = 'none';
        });

        const habilitar = document.getElementById('editarInformações');
        const salvar = document.getElementById('salvarInformacoesUsuario');
        const descartar = document.getElementById('descartarInformacaoUsuario');

        habilitar.style.display = "flex";
        salvar.style.display = "none";
        descartar.style.display = "none";

        if (salvar && descartar) {
            salvar.disabled = true;
            descartar.disabled = true;
            const inputsDadosPessoais = dadosPessoais.querySelectorAll('input');
            const selectsDadosPessoais = dadosPessoais.querySelectorAll('select');
            const elementosForm = [...inputsDadosPessoais, ...selectsDadosPessoais];
            elementosForm.forEach(elemento => {
                elemento.addEventListener('input', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                });
                elemento.addEventListener('change', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                });
            });
        }

    });
}
if(acessarDadosAcompanhante){
    acessarDadosAcompanhante.addEventListener('click', function (){
        historico.style.display = 'none';
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'none';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';
        dadosAcompanhante.style.display = "flex";
        desabilitarCamposAcompanhante();

        const habilitar = document.getElementById('editarInformacoesAcompanhante');
        const salvar = document.getElementById('salvarInformacoesAcompanhante');
        const descartar = document.getElementById('descartarInformacoesAcompanhante');

        habilitar.style.display = "flex";
        salvar.style.display = "none";
        descartar.style.display = "none";

        if (salvar && descartar) {
            salvar.disabled = true;
            descartar.disabled = true;
            const inputsDadosAcompanhante = dadosAcompanhante.querySelectorAll('input');
            const selectsDadosAcompanhante = dadosAcompanhante.querySelectorAll('select');
           
            inputsDadosAcompanhante.forEach(elemento => {
                elemento.addEventListener('input', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                });
            });

            selectsDadosAcompanhante.forEach(elemento => {
                elemento.addEventListener('change', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                 });
            });
        }
    })
}
if (acessarEndereco) {
    acessarEndereco.addEventListener('click', function () {
        historico.style.display = 'none';
        dadosPessoais.style.display = 'none';
        dadosAcompanhante.style.display = "none";
        endereco.style.display = 'flex';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';
        desabilitarCamposEndereco();

        const habilitar = document.getElementById('editarEndereco');
        const salvar = document.getElementById('salvarEdicaoEndereco');
        const descartar = document.getElementById('descartarAlteracaoEndereco');

        habilitar.style.display = "flex";
        salvar.style.display = "none";
        descartar.style.display = "none";

        if (salvar && descartar) {
            salvar.disabled = true;
            descartar.disabled = true;

            if (cepInput) {
                cepInput.addEventListener('input', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                });
            }

            if (numeroInput) {
                numeroInput.addEventListener('input', () => {
                    salvar.disabled = false;
                    descartar.disabled = false;
                });
            }
        }
    });
}
if (acessarAvaliacoes) {
    acessarAvaliacoes.addEventListener('click', function () {
        historico.style.display = 'none';
        dadosAcompanhante.style.display = "none";
        dadosPessoais.style.display = 'none';
        endereco.style.display = 'none';
        avaliacoes.style.display = 'flex';
        sessaoAgendarConsulta.style.display = 'none';
    });
}

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
    }

    if (telefoneInput.value !== usuarioInfo.telefone) {
        usuarioInfo.telefone = telefoneInput.value;
        houveAlteracao = true;
    }

    if (emailInput.value !== usuarioInfo.email) {
        usuarioInfo.email = emailInput.value;
        houveAlteracao = true;
    }

    if (houveAlteracao) {
        if (salvar && descartar) {
            salvar.disabled = false;
            descartar.disabled = false;
        }
        localStorage.setItem('email', JSON.stringify(usuarioInfo));
        desabilitarCampos()
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

    var alterarSenha = document.querySelectorAll('.novaSenha');
    if(alterarSenha){
        alterarSenha.forEach(alteracao => {
            alteracao.style.display = 'none';
        });
    }

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

function habilitarCamposAcompanhante(){
    nomeAcompanhante.disabled = false;
    dataNascAcompanhante.disabled = false;
    cpfAcompanhante.disabled = false;
    telAcompanhante.disabled = false;
    parentescoAcompanhanteSelect.disabled = false;

    nomeAcompanhante.setAttribute('placeholder', '');
    dataNascAcompanhante.setAttribute('placeholder', '');
    cpfAcompanhante.setAttribute('placeholder', '');
    telAcompanhante.setAttribute('placeholder', '');
       
}

function desabilitarCamposAcompanhante() {
    nomeAcompanhante.disabled = true;
    dataNascAcompanhante.disabled = true;
    cpfAcompanhante.disabled = true;
    telAcompanhante.disabled = true;
    parentescoAcompanhanteSelect.disabled = true;
        
    var acompanhanteInfoString = localStorage.getItem('nomeAcompanhante');
    
    if (acompanhanteInfoString) {

        var acompanhanteInfo = JSON.parse(acompanhanteInfoString);

        nomeAcompanhante.value = acompanhanteInfo.nomeAcompanhante || '';
        dataNascAcompanhante.value = acompanhanteInfo.dataNascimentoAcompanhante || '';
        cpfAcompanhante.value = acompanhanteInfo.cpfAcompanhante || '';
        telAcompanhante.value = acompanhanteInfo.telefoneAcompanhante || '';
        parentescoAcompanhanteSelect.value = acompanhanteInfo.parentesco || '';
        
        parentescoAcompanhanteSelect.style.color = "black";

        nomeAcompanhante.setAttribute('placeholder', nomeAcompanhante.value);
        dataNascAcompanhante.setAttribute('placeholder', dataNascAcompanhante.value);
        cpfAcompanhante.setAttribute('placeholder', cpfAcompanhante.value);
        telAcompanhante.setAttribute('placeholder', telAcompanhante.value);
       
    } else {
        alert("Não funcionou");
        console.log("Nenhuma informação de usuário encontrada no localStorage.");
    }
}

function editarDadosAcompanhante(){
    const habilitar = document.getElementById('editarInformacoesAcompanhante');
    const salvar = document.getElementById('salvarInformacoesAcompanhante');
    const descartar = document.getElementById('descartarInformacoesAcompanhante');

    habilitar.style.display = "none";
    salvar.style.display = "flex";
    descartar.style.display = "flex";

    habilitarCamposAcompanhante();
}

function salvarAlteracaoAcompanhante(){

    var salvar = document.getElementById('salvarEdicaoEndereco');
    var descartar = document.getElementById('descartarAlteracaoEndereco');
    var mensagem = document.getElementById('mensagemAcompanhante');

    var acompanhanteInfoString = localStorage.getItem('nomeAcompanhante');
    var acompanhanteInfo = JSON.parse(acompanhanteInfoString);
    var houveAlteracao = false;

    if(nomeAcompanhante.value != acompanhanteInfo.nomeAcompanhante){
        acompanhanteInfo.nomeAcompanhante = nomeAcompanhante.value;
        houveAlteracao = true;
    }
    if(dataNascAcompanhante.value != acompanhanteInfo.dataNascimentoAcompanhante){
        acompanhanteInfo.dataNascimentoAcompanhante = dataNascAcompanhante.value;
        houveAlteracao = true;
    }
    if(cpfAcompanhante.value != acompanhanteInfo.cpfAcompanhante){
        acompanhanteInfo.cpfAcompanhante = cpfAcompanhante.value;
        houveAlteracao = true;
    }
    if(telAcompanhante.value != acompanhanteInfo.telefoneAcompanhante){
        acompanhanteInfo.telefoneAcompanhante = telAcompanhante.value;
        houveAlteracao = true;
    }
    if (parentescoAcompanhanteSelect.value != acompanhanteInfo.parentesco) {
        acompanhanteInfo.parentesco = parentescoAcompanhanteSelect.value;
        houveAlteracao = true;
    }

    var dataAtual = new Date();
    var dataNasc = new Date(dataNascAcompanhante);
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();

    if(idade < 18){
        mensagem = "O seu acompanhante deve ter no minímo 18 anos";
        if (salvar && descartar) {
            salvar.disabled = true;
            descartar.disabled = true;
        }
    }
        
    if (houveAlteracao) {
        if (salvar && descartar) {
            salvar.disabled = false;
            descartar.disabled = false;
        }
        localStorage.setItem('nomeAcompanhante', JSON.stringify(acompanhanteInfo));
        desabilitarCamposAcompanhante();
    }
    
}

function descartarAlteracaoAcompanhante(){
    var salvar = document.getElementById('salvarEdicaoEndereco');
    var descartar = document.getElementById('descartarAlteracaoEndereco');

    var acompanhanteInfoString = localStorage.getItem('nomeAcompanhante');
    var acompanhanteInfo = JSON.parse(acompanhanteInfoString);

    nomeAcompanhante.value = acompanhanteInfo.nomeAcompanhante || '';
    dataNascAcompanhante.value = acompanhanteInfo.dataNascimentoAcompanhante || '';
    cpfAcompanhante.value = acompanhanteInfo.cpfAcompanhante || '';
    telAcompanhante.value = acompanhanteInfo.telefoneAcompanhante || '';
    parentescoAcompanhanteSelect.value = acompanhanteInfo.parentesco || '';

    if (salvar && descartar) {
        salvar.disabled = true;
        descartar.disabled = true;
    }
}

function desabilitarCamposEndereco() {
    cepInput.disabled = true;
    ruaInput.disabled = true;
    numeroInput.disabled = true;
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

function habilitarEdicaoEndereco() {
    cepInput.disabled = false;
    numeroInput.disabled = false;

    cepInput.setAttribute('placeholder', '');
    nomeInput.setAttribute('placeholder', '');
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
}

function salvarAlteracaoEndereco() {
    var salvar = document.getElementById('salvarEdicaoEndereco');
    var descartar = document.getElementById('descartarAlteracaoEndereco');


    var usuarioInfoString = localStorage.getItem('email');
    var usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};
    var houveAlteracao = false;

    // Verifica se o CEP foi alterado
    if (cepInput.value !== usuarioInfo.cep) {
        houveAlteracao = true;
        const cepNumerico = cepInput.value.replace(/\D/g, '');

        if (cepNumerico.length !== 8) {
            alert('CEP inválido!');
            cepInput.value = usuarioInfo.cep || ''; // Restaura o valor anterior
            ruaInput.value = usuarioInfo.endereco || '';
            numeroInput.value = usuarioInfo.numero || '';
            bairroInput.value = usuarioInfo.bairro || '';
            cidadeInput.value = usuarioInfo.cidade || '';
            estadoInput.value = usuarioInfo.estado || '';
            return;
        }

        const url = `https://viacep.com.br/ws/${cepNumerico}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP inválido!');
                    cepInput.value = usuarioInfo.cep || '';
                    ruaInput.value = usuarioInfo.endereco || '';
                    numeroInput.value = usuarioInfo.numero || '';
                    bairroInput.value = usuarioInfo.bairro || '';
                    cidadeInput.value = usuarioInfo.cidade || '';
                    estadoInput.value = usuarioInfo.estado || '';
                } else {
                    usuarioInfo.cep = cepInput.value;
                    usuarioInfo.endereco = data.logradouro;
                    usuarioInfo.bairro = data.bairro;
                    usuarioInfo.cidade = data.localidade;
                    usuarioInfo.estado = data.uf;

                    ruaInput.value = data.logradouro;
                    bairroInput.value = data.bairro;
                    cidadeInput.value = data.localidade;
                    estadoInput.value = data.uf;

                    localStorage.setItem('email', JSON.stringify(usuarioInfo));
                    alert("Endereço atualizado pelo CEP!");
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP. Por favor, tente novamente.');
                cepInput.value = usuarioInfo.cep || '';
                ruaInput.value = usuarioInfo.endereco || '';
                numeroInput.value = usuarioInfo.numero || '';
                bairroInput.value = usuarioInfo.bairro || '';
                cidadeInput.value = usuarioInfo.cidade || '';
                estadoInput.value = usuarioInfo.estado || '';
            });
    }


    if (ruaInput.value !== usuarioInfo.endereco) {
        usuarioInfo.endereco = ruaInput.value;
        houveAlteracao = true;
    }
    if (numeroInput.value !== usuarioInfo.numero) {
        usuarioInfo.numero = numeroInput.value;
        houveAlteracao = true;
    }
    if (bairroInput.value !== usuarioInfo.bairro) {
        usuarioInfo.bairro = bairroInput.value;
        houveAlteracao = true;
    }
    if (cidadeInput.value !== usuarioInfo.cidade) {
        usuarioInfo.cidade = cidadeInput.value;
        houveAlteracao = true;
    }
    if (estadoInput.value !== usuarioInfo.estado) {
        usuarioInfo.estado = estadoInput.value;
        houveAlteracao = true;
    }

    if (houveAlteracao) {
        console.log("Salvando alterações no endereço...");
        if (salvar && descartar) {
            salvar.disabled = false;
            descartar.disabled = false;
        }
        localStorage.setItem('email', JSON.stringify(usuarioInfo));
    }
}

function descartarAlteracaoEndereco() {
    const salvarBotao = document.getElementById('salvarEdicaoEndereco');
    const descartarBotao = document.getElementById('descartarAlteracaoEndereco');

    const usuarioInfoString = localStorage.getItem('email');
    const usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};

    // Restaura os valores dos campos com os dados originais do localStorage
    cepInput.value = usuarioInfo.cep || '';
    ruaInput.value = usuarioInfo.endereco || '';
    numeroInput.value = usuarioInfo.numero || '';
    bairroInput.value = usuarioInfo.bairro || '';
    cidadeInput.value = usuarioInfo.cidade || '';
    estadoInput.value = usuarioInfo.estado || '';

    if (salvarBotao && descartarBotao) {
        salvarBotao.disabled = true;
        descartarBotao.disabled = true;
    }
}

function agendarConsulta() {
    historico.style.display = 'none';
    sessaoAgendarConsulta.style.display = 'flex';
}

function realizarAgendamento(event){
    event.preventDefault();

    const especialidadeSelecionada = document.getElementById('especialidade');
    const especialidade = especialidadeSelecionada.options[especialidadeSelecionada.selectedIndex].textContent;
    const dataConsultaInput = document.getElementById('dataConsulta').value;
    const horaConsulta = document.getElementById('horaConsulta').value;
    const formAgendarConsulta = document.getElementById('formAgendarConsulta');
    const corpoTabelaHistorico = document.getElementById('corpoTabelaHistorico');

    // Formatar a data para o formato desejado (DD/MM/AAAA)
    const dataParts = dataConsultaInput.split('-');
    const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

    if(!especialidade || !dataConsultaInput || !horaConsulta){
        alert("Preencha todos os campos para agendar a consulta!");
        return;
    }

    // Criar uma nova linha na tabela
    const novaLinha = corpoTabelaHistorico.insertRow();
    const colunaData = novaLinha.insertCell();
    const colunaHora = novaLinha.insertCell();
    const colunaEspecialidade = novaLinha.insertCell();
    const colunaExames = novaLinha.insertCell();
    const colunaReceitas = novaLinha.insertCell();

    colunaData.textContent = dataFormatada;
    colunaHora.textContent = horaConsulta;
    colunaEspecialidade.textContent = especialidade;
    colunaExames.innerHTML = 'Não adicionado'; 
    colunaReceitas.innerHTML = 'Não adicionado'; 

    // Limpar o formulário e ocultar a seção de agendamento
    formAgendarConsulta.reset();
    sessaoAgendarConsulta.style.display = 'none';
    historico.style.display = 'flex'
}
const criarAvaliacao = document.getElementById('criarAvaliacao');

function adicionarAvaliacao() {
    avaliacoes.style.display = 'none';
    criarAvaliacao.style.display = 'flex';
}

function realizarAvaliacao(event){
    event.preventDefault();

    const avaliacaoTexto = document.getElementById('avaliacao').value;
    const notaSelecionadaElement = document.getElementById('nota');
    const nota = notaSelecionadaElement.options[notaSelecionadaElement.selectedIndex].value;
    const formAvaliacao = document.getElementById('formAvaliacoes');
    const corpoTabelaAvaliacoes = document.getElementById('corpoTabelaAvaliacoes');

    if(!avaliacaoTexto || !nota){
        alert("Preencha todos os campos para enviar a avaliação!");
        return;
    }

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear());
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const novaLinha = corpoTabelaAvaliacoes.insertRow();
    const colunaData = novaLinha.insertCell();
    const colunaAvaliacao = novaLinha.insertCell();
    const colunaNota = novaLinha.insertCell();

    colunaData.textContent = dataFormatada;
    colunaAvaliacao.textContent = avaliacaoTexto;
    colunaNota.textContent = nota;

    formAvaliacao.reset();
    criarAvaliacao.style.display = 'none'; 
    avaliacoes.style.display = 'flex';
}