const btnCadastrar = document.getElementById('cadastrar');
const btnEntrar = document.getElementById('entrar');

const body = document.querySelector('body');

if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function () {
        body.className = 'cadastrar-js';
    });
}

if (btnEntrar) {
    btnEntrar.addEventListener('click', function () {
        body.className = 'entrar-js';
    });
}

var cidade = "";
var estado = "";
// Validando cadastro de dados do usuário
function validarCadastroCompleto() {
    var formAcompanhante = document.getElementById('formAcompanhante');
    var formPaciente = document.getElementById('formUsuario');

    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var bairro = document.getElementById('bairro').value;
    var numero = document.getElementById('numero').value;

    var mensagem = document.getElementById('mensagemMenorIdade');
    var cadastroUsuario = document.getElementById('formUsuario');
    var cadastroAcompanhante = document.getElementById('formAcompanhante');

    var dataAtual = new Date();
    var dataNasc = new Date(dataNascimento);
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    var mensagemUsuario = 'Notamos que você é menor de idade, por favor, cadastre um acompanhante responsável.';

    if (nome == "" || dataNascimento == "" || telefone == "" || cpf == "" || email == "" || senha == "" || cep == "" || endereco == "" || bairro == "") {
        alert('Preencha todos os campos!');
    } else if (telefone.length < 9 || telefone.length > 12) {
        alert('Telefone inválido!');
    } else if (cpf.length < 12) {
        alert('CPF inválido!');
    } else if (idade < 18) {
        mensagem.textContent = mensagemUsuario;
        cadastroUsuario.style.display = 'none';
        cadastroAcompanhante.style.display = 'block';

        const informacoesUsuario = {
            nome: nome,
            dataNascimento: dataNascimento,
            idade: idade,
            telefone: telefone,
            cpf: cpf,
            email: email,
            senha: senha,
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            numero: numero,
            cidade: cidade,
            estado: estado
        };

        let usuarios = localStorage.getItem('usuarios');
        usuarios = usuarios ? JSON.parse(usuarios) : [];
        usuarios.push(informacoesUsuario);

        // ✅ Salvando corretamente
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem(email, JSON.stringify(informacoesUsuario)); // essencial
        localStorage.setItem('usuarioLogado', email); // usado em todas as telas

        formAcompanhante.style.display = "flex";
        formPaciente.style.display = "none";
    } else {
        const informacoesUsuario = {
            nome: nome,
            dataNascimento: dataNascimento,
            idade: idade,
            telefone: telefone,
            cpf: cpf,
            email: email,
            senha: senha,
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            numero: numero,
            cidade: cidade,
            estado: estado
        };

        let usuarios = localStorage.getItem('usuarios');
        usuarios = usuarios ? JSON.parse(usuarios) : [];
        usuarios.push(informacoesUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // ✅ Salvar individualmente também
        localStorage.setItem(email, JSON.stringify(informacoesUsuario));

        // ✅ Salvar usuário logado
        localStorage.setItem('usuarioLogado', email);
        console.log('Cadastro realizado com sucesso! Calculando a distância...');
        window.location.href = "./areaPaciente.html";
    }
}

function validarCadastroCompletoComAcompanhante() {
    var nomeAcompanhante = document.getElementById('inpNomeAcompanhante').value;
    var dataNascimentoAcompanhante = document.getElementById('inpDataNascimentoAcompanhante').value;
    var cpfAcompanhante = document.getElementById('inpCpfAcompanhante').value;
    var telefoneAcompanhante = document.getElementById('inpTelefoneAcompanhante').value;
    var parentescoAcompanhanteSelect = document.getElementById('parentescoAcompanhante');
    var parentescoAcompanhante = parentescoAcompanhanteSelect.value;

    var dataAtual = new Date();
    var dataNasc = new Date(dataNascimentoAcompanhante);
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();

    const informacoesAcompanhante = {
        nomeAcompanhante: nomeAcompanhante,
        dataNascimentoAcompanhante: dataNascimentoAcompanhante,
        idade: idade,
        cpfAcompanhante: cpfAcompanhante,
        telefoneAcompanhante: telefoneAcompanhante,
        parentesco: parentescoAcompanhante
    };

    let acompanhantes = localStorage.getItem('acompanhantes');
    acompanhantes = acompanhantes ? JSON.parse(acompanhantes) : [];
    acompanhantes.push(informacoesAcompanhante);
    localStorage.setItem('acompanhantes', JSON.stringify(acompanhantes));

    if (nomeAcompanhante == "" || cpfAcompanhante == "" || telefoneAcompanhante == "") {
        alert('Preencha todos os campos!');
    } else if (telefoneAcompanhante.length < 9 || telefoneAcompanhante.length > 12) {
        alert('Telefone inválido!');
    } else if (cpfAcompanhante.length < 12) {
        alert('CPF inválido!');
    } else {
        console.log('Cadastro do acompanhante realizado com sucesso!');
        window.location.href = "./areaPaciente.html";
    }
}


function validarLogin(event) {
    event.preventDefault();
    var emailLogin = document.getElementById('emailLogin').value;
    var senhaLogin = document.getElementById('senhaLogin').value;

    var usuarios = localStorage.getItem('usuarios');
    usuarios = usuarios ? JSON.parse(usuarios) : [];

    let usuarioLogado = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === emailLogin && usuarios[i].senha === senhaLogin) {
            usuarioLogado = usuarios[i];
            break;
        }
    }

    if (usuarioLogado) {
        console.log('Login realizado com sucesso!');
        localStorage.setItem('usuarioLogado', emailLogin); // Salva o email do usuário logado
        window.location.href = "./areaPaciente.html";
    } else {
        alert('Email ou senha inválidos!');
    }
}

function validarCep() {
    var cep = document.getElementById('cep').value;
    const cepNumerico = cep.replace(/\D/g, '');

    if (cepNumerico.length !== 8) {
        alert('CEP inválido!');
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        cidade = "";
        estado = "";
        return;
    }

    const url = `https://viacep.com.br/ws/${cepNumerico}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP inválido!');
                document.getElementById('endereco').value = '';
                document.getElementById('bairro').value = '';
                cidade = "";
                estado = "";
            } else {
                const endereco = `${data.logradouro}`;
                const bairro = `${data.bairro}`;
                cidade = data.localidade;
                estado = data.uf;
                document.getElementById('endereco').value = endereco;
                document.getElementById('bairro').value = bairro;

                distanciaLatLong(cidade);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
        });
}

// Calculando a distancia do usuario até o cunsultório (senac) usando a API Geoapify

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