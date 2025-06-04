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
const dataNascimentoInput = document.getElementById('txtAlterarDataNascimento');
const cpfInput = document.getElementById('txtAlterarCpf');
const telefoneInput = document.getElementById('txtAlterarTelefone');
const emailInput = document.getElementById('txtAlterarEmail');
const palavraChaveInput = document.getElementById('txtAlterarPalavraChave');
const senhaInput = document.getElementById('txtAlterarSenha');

//inputs form acompanhante
const nomeAcompanhante = document.getElementById('nomeAcompanhante');
const dataNascAcompanhante = document.getElementById('dataNascAcompanhante');
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

    if (telefoneInput) { aplicarMascaraTelefone(telefoneInput); }
    if (telAcompanhante) { aplicarMascaraTelefone(telAcompanhante); }
    if (cpfInput) { aplicarMascaraCPF(cpfInput); }
    if (cpfAcompanhante) { aplicarMascaraCPF(cpfAcompanhante); }
});


function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function (e) {
        let valor = input.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length <= 10) {
            // Formato para telefones fixos (XX) XXXX-XXXX
            input.value = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            // Formato para celulares (XX) XXXXX-XXXX
            input.value = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    });
}

function aplicarMascaraCPF(input) {
    input.addEventListener('input', function () {
        let valor = input.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        input.value = valor;
    });
}

function pegandoNomeUsuario() {
    const emailLogado = localStorage.getItem('usuarioLogado');
    if (!emailLogado) {
        console.warn("Usuário não logado.");
        return;
    }

    const usuarioInfoString = localStorage.getItem(emailLogado);
    const usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};

    const nomePacienteSpan = document.getElementById('nomePaciente');
    if (nomePacienteSpan && usuarioInfo.nome) {
        nomePacienteSpan.textContent = usuarioInfo.nome;
    } else {
        console.warn("Elemento 'nomePaciente' não encontrado ou nome ausente.");
    }

    const acessarDadosAcompanhante = document.getElementById('acessarDadosAcompanhante');
    if (acessarDadosAcompanhante && usuarioInfo.idade < 18) {
        acessarDadosAcompanhante.style.display = "flex";
    }
}

pegandoNomeUsuario();
carregarConsultasPaciente();

if (acessarHistorico) {
    acessarHistorico.addEventListener('click', function () {
        historico.style.display = 'block';
        dadosPessoais.style.display = 'none';
        dadosAcompanhante.style.display = "none";
        endereco.style.display = 'none';
        avaliacoes.style.display = 'none';
        sessaoAgendarConsulta.style.display = 'none';

        carregarConsultasPaciente()
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
if (acessarDadosAcompanhante) {
    acessarDadosAcompanhante.addEventListener('click', function () {
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

        carregarAvaliacoesSalvas();
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
    var editarInformações = document.getElementById('editarInformações');

    //elementos form
    var novaSenhaInput = document.getElementById('txtNovaSenha').value;
    var confirmarSenhaInput = document.getElementById('txtConfirmarSenha').value;
    var mensagemSenha = document.getElementById('mensagemSenha');

    var usuarioInfoString = localStorage.getItem('usuarios'); // Alterado para 'usuarios'
    var usuarios = usuarioInfoString ? JSON.parse(usuarioInfoString) : [];
    var usuarioLogadoEmail = localStorage.getItem('usuarioLogado');
    var usuarioLogadoIndex = usuarios.findIndex(usuario => usuario.email === usuarioLogadoEmail);
    var houveAlteracao = false;

    if (usuarioLogadoIndex === -1) {
        console.error("Usuário logado não encontrado no localStorage.");
        return;
    }

    var usuarioInfo = { ...usuarios[usuarioLogadoIndex] }; // Cria uma cópia para comparar

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
        localStorage.setItem('usuarioLogado', emailInput.value); // Atualiza o email logado
    }

    if (palavraChaveInput.value !== usuarioInfo.palavraChave) {
        usuarioInfo.palavraChave = palavraChaveInput.value;
        houveAlteracao = true;
    }

    if (houveAlteracao) {
        usuarios[usuarioLogadoIndex] = usuarioInfo; // Atualiza o array
        localStorage.setItem(usuarioLogadoEmail, JSON.stringify(usuarioInfo));
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Salva o array atualizado
        if (salvar && descartar) {
            salvar.style.display = 'none';
            descartar.style.display = 'none';
            editarInformações.style.display = 'flex';
        }
        desabilitarCampos()
    }
}

function descartarAlteracao() {
    var salvar = document.getElementById('salvarInformacoesUsuario');
    var descartar = document.getElementById('descartarInformacaoUsuario');

    var novaSenhaInput = document.getElementById('txtNovaSenha').value;
    var confirmarSenhaInput = document.getElementById('txtConfirmarSenha').value;

    var usuarioInfoString = localStorage.getItem('usuarios'); // Alterado para 'usuarios'
    var usuarios = usuarioInfoString ? JSON.parse(usuarioInfoString) : [];
    var usuarioLogadoEmail = localStorage.getItem('usuarioLogado');
    var usuarioLogado = usuarios.find(usuario => usuario.email === usuarioLogadoEmail);

    // Restaura os valores dos campos com os dados originais
    nomeInput.value = usuarioLogado?.nome || '';
    telefoneInput.value = usuarioLogado?.telefone || '';
    emailInput.value = usuarioLogado?.email || '';
    senhaInput.value = usuarioLogado?.senha || '';
    palavraChaveInput.value = usuarioLogado?.palavraChave || '';
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
    palavraChaveInput.disabled = false;
    senhaInput.disabled = false;

    nomeInput.setAttribute('placeholder', '');
    dataNascimentoInput.setAttribute('placeholder', '');
    cpfInput.setAttribute('placeholder', '');
    telefoneInput.setAttribute('placeholder', '');
    emailInput.setAttribute('placeholder', '');
    palavraChaveInput.setAttribute('placeholder', '');
    senhaInput.setAttribute('placeholder', '');
}

function desabilitarCampos() {
    nomeInput.disabled = true;
    dataNascimentoInput.disabled = true;
    cpfInput.disabled = true;
    telefoneInput.disabled = true;
    emailInput.disabled = true;
    palavraChaveInput.disabled = true;
    senhaInput.disabled = true;

    const usuarioInfo = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')));

    const alterarSenha = document.querySelectorAll('.novaSenha');
    if (alterarSenha) {
        alterarSenha.forEach(alteracao => {
            alteracao.style.display = 'none';
        });
    }

    if (usuarioInfo) {
        nomeInput.value = usuarioInfo.nome || '';
        dataNascimentoInput.value = usuarioInfo.dataNascimento || '';
        cpfInput.value = usuarioInfo.cpf || '';
        telefoneInput.value = usuarioInfo.telefone || '';
        emailInput.value = usuarioInfo.email || '';
        palavraChaveInput.value = usuarioInfo.palavraChave || '';
        senhaInput.value = usuarioInfo.senha || '';

        nomeInput.setAttribute('placeholder', nomeInput.value);
        dataNascimentoInput.setAttribute('placeholder', dataNascimentoInput.value);
        cpfInput.setAttribute('placeholder', cpfInput.value);
        telefoneInput.setAttribute('placeholder', telefoneInput.value);
        emailInput.setAttribute('placeholder', emailInput.value);
        palavraChaveInput.setAttribute('placeholder', palavraChaveInput.value);
        senhaInput.setAttribute('placeholder', senhaInput.value);
    } else {
        console.log("Nenhuma informação de usuário logado encontrada no localStorage.");
    }
}

function habilitarCamposAcompanhante() {
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

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    let acompanhantes = JSON.parse(localStorage.getItem('acompanhantes'));

    const acompanhanteInfo = acompanhantes.find(a => a.usuarioMenor === usuarioLogado);

    if (acompanhanteInfo) {
        nomeAcompanhante.value = acompanhanteInfo.nomeAcompanhante || '';
        dataNascAcompanhante.value = acompanhanteInfo.dataNascimentoAcompanhante || '';
        cpfAcompanhante.value = acompanhanteInfo.cpfAcompanhante || '';
        telAcompanhante.value = acompanhanteInfo.telefoneAcompanhante || '';
        parentescoAcompanhanteSelect.value = acompanhanteInfo.parentesco || '';

        parentescoAcompanhanteSelect.style.color = "black";

        nomeAcompanhante.setAttribute('placeholder', acompanhanteInfo.nomeAcompanhante || '');
        dataNascAcompanhante.setAttribute('placeholder', acompanhanteInfo.dataNascimentoAcompanhante || '');
        cpfAcompanhante.setAttribute('placeholder', acompanhanteInfo.cpfAcompanhante || '');
        telAcompanhante.setAttribute('placeholder', acompanhanteInfo.telefoneAcompanhante || '');
    } else {
        console.log("Nenhuma informação de acompanhante encontrada para o usuário logado.");
    }
}



function editarDadosAcompanhante() {
    const habilitar = document.getElementById('editarInformacoesAcompanhante');
    const salvar = document.getElementById('salvarInformacoesAcompanhante');
    const descartar = document.getElementById('descartarInformacoesAcompanhante');

    habilitar.style.display = "none";
    salvar.style.display = "flex";
    descartar.style.display = "flex";

    habilitarCamposAcompanhante();
}

function salvarAlteracaoAcompanhante() {
    const salvar = document.getElementById('salvarInformacoesAcompanhante');
    const descartar = document.getElementById('descartarInformacoesAcompanhante');
    const editarInformações = document.getElementById('editarInformacoesAcompanhante');
    const mensagem = document.getElementById('mensagemAcompanhante');


    let acompanhanteInfo = JSON.parse(localStorage.getItem('dadosAcompanhante') || '{}');

    let houveAlteracao = false;

    if (nomeAcompanhante.value !== acompanhanteInfo.nomeAcompanhante) {
        acompanhanteInfo.nomeAcompanhante = nomeAcompanhante.value;
        houveAlteracao = true;
    }

    if (dataNascAcompanhante.value !== acompanhanteInfo.dataNascimentoAcompanhante) {
        acompanhanteInfo.dataNascimentoAcompanhante = dataNascAcompanhante.value;
        houveAlteracao = true;
    }

    if (cpfAcompanhante.value !== acompanhanteInfo.cpfAcompanhante) {
        acompanhanteInfo.cpfAcompanhante = cpfAcompanhante.value;
        houveAlteracao = true;
    }

    if (telAcompanhante.value !== acompanhanteInfo.telefoneAcompanhante) {
        acompanhanteInfo.telefoneAcompanhante = telAcompanhante.value;
        houveAlteracao = true;
    }

    if (parentescoAcompanhanteSelect.value !== acompanhanteInfo.parentesco) {
        acompanhanteInfo.parentesco = parentescoAcompanhanteSelect.value;
        houveAlteracao = true;
    }

    // Verifica idade mínima
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascAcompanhante.value);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const m = dataAtual.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }

    if (idade < 18) {
        mensagem.textContent = "O seu acompanhante deve ter no mínimo 18 anos";
        salvar.disabled = true;
        descartar.disabled = true;
        return;
    } else {
        mensagem.textContent = "";
    }

    // Se houve alteração, salva no localStorage
    if (houveAlteracao) {
        localStorage.setItem('acompanhantes', JSON.stringify(acompanhanteInfo)); 

        if (salvar && descartar) {
            salvar.style.display = 'none';
            descartar.style.display = 'none';
            editarInformações.style.display = 'flex';
        }

        desabilitarCamposAcompanhante();
    }
}


function descartarAlteracaoAcompanhante() {
    const salvar = document.getElementById('salvarInformacoesAcompanhante');
    const descartar = document.getElementById('descartarInformacoesAcompanhante');

    let acompanhanteInfo = JSON.parse(localStorage.getItem('dadosAcompanhante') || '{}');

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

    const emailLogado = localStorage.getItem('usuarioLogado');
    if (!emailLogado) return;

    const usuarioInfoString = localStorage.getItem(emailLogado);
    const usuarioInfo = usuarioInfoString ? JSON.parse(usuarioInfoString) : {};

    cepInput.value = usuarioInfo.cep || '';
    ruaInput.value = usuarioInfo.endereco || '';
    numeroInput.value = usuarioInfo.numero || '';
    bairroInput.value = usuarioInfo.bairro || '';
    cidadeInput.value = usuarioInfo.cidade || '';
    estadoInput.value = usuarioInfo.estado || '';

    cepInput.setAttribute('placeholder', cepInput.value);
    ruaInput.setAttribute('placeholder', ruaInput.value);
    numeroInput.setAttribute('placeholder', numeroInput.value);
    bairroInput.setAttribute('placeholder', bairroInput.value);
    cidadeInput.setAttribute('placeholder', cidadeInput.value);
    estadoInput.setAttribute('placeholder', estadoInput.value);
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
    const salvar = document.getElementById('salvarEdicaoEndereco');
    const descartar = document.getElementById('descartarAlteracaoEndereco');
    const editar = document.getElementById('editarEndereco');

    const emailLogado = localStorage.getItem('usuarioLogado');
    const usuarioString = localStorage.getItem(emailLogado);
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!usuarioString || !emailLogado) return;

    const usuario = JSON.parse(usuarioString);
    let houveAlteracao = false;

    if (cepInput.value !== usuario.cep) {
        usuario.cep = cepInput.value;
        houveAlteracao = true;
    }
    if (ruaInput.value !== usuario.endereco) {
        usuario.endereco = ruaInput.value;
        houveAlteracao = true;
    }
    if (numeroInput.value !== usuario.numero) {
        usuario.numero = numeroInput.value;
        houveAlteracao = true;
    }
    if (bairroInput.value !== usuario.bairro) {
        usuario.bairro = bairroInput.value;
        houveAlteracao = true;
    }
    if (cidadeInput.value !== usuario.cidade) {
        usuario.cidade = cidadeInput.value;
        houveAlteracao = true;
    }
    if (estadoInput.value !== usuario.estado) {
        usuario.estado = estadoInput.value;
        houveAlteracao = true;
    }

    if (houveAlteracao) {
        // Salva dados individuais do usuário
        localStorage.setItem(emailLogado, JSON.stringify(usuario));

        // Atualiza o array "usuarios"
        const index = usuarios.findIndex(u => u.email === emailLogado);
        if (index !== -1) {
            usuarios[index] = usuario;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        // Atualiza distância
        distanciaLatLong(usuario.cidade);

        // Atualiza o stick de distância/tempo depois de um pequeno atraso
        const distanciaElement = document.getElementById('distancia');
        const tempoElement = document.getElementById('tempo');
        const stickDistancia = document.querySelector('.stick-distancia');

        setTimeout(() => {
            const novaDistancia = localStorage.getItem('distancia');
            const novoTempo = localStorage.getItem('tempo');

            if (novaDistancia && novoTempo) {
                if (distanciaElement) distanciaElement.textContent = `Distância: ${novaDistancia} km`;
                if (tempoElement) tempoElement.textContent = `Duração: ${novoTempo}`;
                if (stickDistancia) stickDistancia.style.display = 'block';
            }
        }, 1000);

    }

    if (salvar && descartar) {
        salvar.style.display = 'none';
        descartar.style.display = 'none';
        editar.style.display = 'flex';
    }

    desabilitarCamposEndereco();
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

let consultaSelecionadaIndex = null;

function realizarAgendamento(event) {
    event.preventDefault();

    const especialidadeSelecionada = document.getElementById('especialidade');
    const especialidade = especialidadeSelecionada.options[especialidadeSelecionada.selectedIndex].textContent;
    const dataConsultaInput = document.getElementById('dataConsulta').value;
    const horaConsulta = document.getElementById('horaConsulta').value;
    const formAgendarConsulta = document.getElementById('formAgendarConsulta');

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataConsulta = new Date(dataConsultaInput);
    if (dataConsulta <= hoje) {
        alert("A data da consulta deve ser posterior à data atual.");
        return;
    }

    const dataParts = dataConsultaInput.split('-');
    const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

    if (!especialidade || !dataConsultaInput || !horaConsulta) {
        alert("Preencha todos os campos para agendar a consulta!");
        return;
    }

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert('Usuário não está logado!');
        return;
    }

    //  Verifica conflito com todos os agendamentos salvos no localStorage
    for (let key in localStorage) {
        if (key.startsWith('consultas_')) {
            const agendamentos = JSON.parse(localStorage.getItem(key)) || [];
            const conflito = agendamentos.some(consulta =>
                consulta.data === dataFormatada && consulta.hora === horaConsulta
            );
            if (conflito) {
                alert("Este horário já está ocupado por outro paciente. Por favor, escolha outro.");
                return;
            }
        }
    }

    // 🔐 Consulta válida, continua...
    let consultasUsuario = JSON.parse(localStorage.getItem('consultas_' + usuarioLogado)) || [];

    const novaConsulta = {
        data: dataFormatada,
        hora: horaConsulta,
        especialidade: especialidade,
        exames: 'Não adicionado',
        receitas: 'Não adicionado',
        status: 'Pendente'
    };

    consultasUsuario.push(novaConsulta);
    localStorage.setItem('consultas_' + usuarioLogado, JSON.stringify(consultasUsuario));

    carregarConsultasPaciente();
    formAgendarConsulta.reset();
    sessaoAgendarConsulta.style.display = 'none';
    historico.style.display = 'block';
}


function carregarConsultasPaciente() {
    const email = localStorage.getItem('usuarioLogado');
    const corpoTabela = document.getElementById('corpoTabelaHistorico');
    if (!email || !corpoTabela) return;

    const consultas = JSON.parse(localStorage.getItem('consultas_' + email)) || [];
    corpoTabela.innerHTML = '';

    consultas.forEach((consulta, index) => {
        const linha = corpoTabela.insertRow();
        linha.insertCell().textContent = consulta.data || '-';
        linha.insertCell().textContent = consulta.hora || '-';
        linha.insertCell().textContent = consulta.especialidade || '-';

        const cellExame = linha.insertCell();
        if (consulta.exame) {
            const linkExame = document.createElement('a');
            linkExame.href = consulta.exame;
            linkExame.download = 'exame';
            linkExame.textContent = 'Baixar';
            linkExame.target = '_blank';
            cellExame.appendChild(linkExame);
        } else {
            cellExame.textContent = 'Nenhum';
        }

        // Coluna Receita
        const cellReceita = linha.insertCell();
        if (consulta.receita) {
            const linkReceita = document.createElement('a');
            linkReceita.href = consulta.receita;
            linkReceita.download = 'receita';
            linkReceita.textContent = 'Baixar';
            linkReceita.target = '_blank';
            cellReceita.appendChild(linkReceita);
        } else {
            cellReceita.textContent = 'Nenhuma';
        }

        linha.insertCell().textContent = consulta.status || 'Pendente';

        const acoes = linha.insertCell();
        if (consulta.status === 'Pendente') {
            const btnAbrirModal = document.createElement('button');
            btnAbrirModal.textContent = '⋮';
            btnAbrirModal.style.backgroundColor = 'transparent';
            btnAbrirModal.style.width = '30px';
            btnAbrirModal.style.height = '30px';
            btnAbrirModal.style.border = 'none';
            btnAbrirModal.style.cursor = 'pointer';
            btnAbrirModal.onclick = () => abrirModal(index, consulta);
            acoes.appendChild(btnAbrirModal);
        } else {
            acoes.textContent = 'Consulta ' + consulta.status;
        }
    });
}

function abrirModal(index, consulta) {
    consultaSelecionadaIndex = index;
    const info = `Data: ${consulta.data} | Hora: ${consulta.hora} | Especialidade: ${consulta.especialidade}`;
    document.getElementById('infoConsulta').textContent = info;
    document.getElementById('modalConfirmarDesmarcar').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalConfirmarDesmarcar').style.display = 'none';
    consultaSelecionadaIndex = null;
}

function confirmarConsulta() {
    atualizarStatusConsulta(consultaSelecionadaIndex, 'Confirmada');
    fecharModal();
}

function desmarcarConsulta() {
    atualizarStatusConsulta(consultaSelecionadaIndex, 'Cancelada');
    fecharModal();
}

function atualizarStatusConsulta(index, novoStatus) {
    const email = localStorage.getItem('usuarioLogado');
    if (!email) return;

    let consultas = JSON.parse(localStorage.getItem('consultas_' + email)) || [];
    if (!consultas[index]) return;

    consultas[index].status = novoStatus;
    localStorage.setItem('consultas_' + email, JSON.stringify(consultas));

    carregarConsultasPaciente();
}

const criarAvaliacao = document.getElementById('criarAvaliacao');

function adicionarAvaliacao() {
    avaliacoes.style.display = 'none';
    criarAvaliacao.style.display = 'flex';
}

function realizarAvaliacao(event) {
    event.preventDefault();

    const avaliacaoTexto = document.getElementById('avaliacao').value;
    const notaSelecionadaElement = document.getElementById('nota');
    const nota = notaSelecionadaElement.options[notaSelecionadaElement.selectedIndex].value;
    const formAvaliacao = document.getElementById('formAvaliacoes');

    if (!avaliacaoTexto || !nota) {
        alert("Preencha todos os campos para enviar a avaliação!");
        return;
    }

    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        alert("Você precisa estar logado para enviar uma avaliação.");
        return;
    }

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear());
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const novaAvaliacao = {
        data: dataFormatada,
        texto: avaliacaoTexto,
        nota: nota
    };

    // Salvar avaliação no localStorage
    let avaliacoesSalvas = JSON.parse(localStorage.getItem('avaliacoes_' + usuarioLogado)) || [];
    avaliacoesSalvas.push(novaAvaliacao);
    localStorage.setItem('avaliacoes_' + usuarioLogado, JSON.stringify(avaliacoesSalvas));

    // Atualiza tabela na tela
    carregarAvaliacoesSalvas();

    formAvaliacao.reset();
    criarAvaliacao.style.display = 'none';
    avaliacoes.style.display = 'flex';
}

function carregarAvaliacoesSalvas() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const corpoTabela = document.getElementById('corpoTabelaAvaliacoes');

    if (!corpoTabela || !usuarioLogado) return;

    corpoTabela.innerHTML = ""; // Limpa linhas antigas

    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes_' + usuarioLogado)) || [];

    avaliacoes.forEach(avaliacao => {
        const novaLinha = corpoTabela.insertRow();
        novaLinha.insertCell().textContent = avaliacao.data;
        novaLinha.insertCell().textContent = avaliacao.texto;
        novaLinha.insertCell().textContent = avaliacao.nota;
    });
}

function buscarEndereco() {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';

    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido! Por favor, digite 8 dígitos.');
        return;
    }

    // URL da API do ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }
            ruaInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = data.localidade;
            estadoInput.value = data.uf;

            numeroInput.focus();
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.');
        });
}

function distanciaLatLong(cidade) {
    var key = "49ffd309156a4632b363734ab752f605";
    var url = `https://api.geoapify.com/v1/geocode/search?text=${cidade}&format=json&apiKey=${key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const longitude = data.results[0].lon;
                const latitude = data.results[0].lat;
                console.log("Latitude do usuário:", latitude);
                console.log("Longitude do usuário:", longitude);
                calculaDistancia(latitude, longitude);
            } else {
                console.log("Nenhum resultado encontrado para a cidade.");
            }
        })
        .catch(error => console.log('error', error));
}

function calculaDistancia(latitude, longitude) {
    var key = "b50baa0a696344b988cccf71229aa688";
    const latitudeSenac = -23.669388400000003;
    const longitudeSenac = -46.70129375;
    const url2 = `https://api.geoapify.com/v1/routing?waypoints=${latitude},${longitude}|${latitudeSenac},${longitudeSenac}&mode=drive&apiKey=${key}`;

    fetch(url2)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição de roteamento: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.features && data.features.length > 0 && data.features[0].properties) {
                const distancia = data.features[0].properties.distance;
                const duracaoSegundos = data.features[0].properties.time;

                const distanciaEmQuilometros = (distancia / 1000).toFixed(2);
                const duracaoFormatada = formatarDuracao(duracaoSegundos);

                localStorage.setItem('distancia', distanciaEmQuilometros);
                localStorage.setItem('tempo', duracaoFormatada);

                console.log("Distância até o Senac:", distanciaEmQuilometros, "km");
                console.log("Duração estimada:", duracaoFormatada);

            } else {
                console.log("Não foi possível calcular a rota ou a estrutura da resposta é inesperada.");
            }

        })
        .catch(error => console.error('Erro ao calcular a distância:', error));
}

function formatarDuracao(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = Math.trunc(segundos % 60);

    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundosRestantes).padStart(2, '0');

    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
}