const btnCadastrar = document.getElementById('cadastrar');
const btnEntrar = document.getElementById('entrar');

const body = document.querySelector('body');

btnCadastrar.addEventListener('click', function () {
    body.className = 'cadastrar-js';
});

btnEntrar.addEventListener('click', function () {
    body.className = 'entrar-js';
});

// Validando cadastro de dados do usuário
function validarCadastroCompleto(event) {
    event.preventDefault();
    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var enderecoInput = document.getElementById('endereco');
    var bairroInput = document.getElementById('bairro');
    var numero = document.getElementById('numero').value;

    var mensagem = document.getElementById('mensagemMenorIdade');
    var cadastroUsuario = document.getElementById('formUsuario');
    var cadastroAcompanhante = document.getElementById('formAcompanhante');

    var dataAtual = new Date();
    var dataNasc = new Date(dataNascimento);
    var idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    var mensagemUsuario = 'Notamos que você é menor de idade, por favor, cadastre um acompanhante responsável.';

    if (!nome || !dataNascimento || !telefone || !cpf || !email || !senha || !cep || !enderecoInput.value || !bairroInput.value) {
        alert('Preencha todos os campos!');
    } else if (idade < 18) {
        mensagem.textContent = mensagemUsuario;
        cadastroUsuario.style.display = 'none';
        cadastroAcompanhante.style.display = 'block';
        validarCadastroCompletoComAcompanhante();
    } else if (telefone.length < 9 || telefone.length > 12) {
        alert('Telefone inválido!');
    } else if (cpf.length < 12) {
        alert('CPF inválido!');
    } else {
        const cepNumerico = cep.replace(/\D/g, '');
        const url = `https://viacep.com.br/ws/${cepNumerico}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    
                    const informacoesUsuario = {
                        nome: nome,
                        dataNascimento: dataNascimento,
                        telefone: telefone,
                        cpf: cpf,
                        email: email,
                        senha: senha,
                        cep: cep,
                        endereco: data.logradouro,
                        bairro: data.bairro,
                        numero: numero,
                        cidade: data.localidade,
                        estado: data.uf
                    };
                    
                    localStorage.setItem('email', JSON.stringify(informacoesUsuario));
                    localStorage.setItem('usuarioLogado', 'true');
                    console.log('Cadastro realizado com sucesso! Calculando a distância...');
                    window.location.href = "./areaPaciente.html";
                } else {
                    alert('CEP inválido!');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao validar o CEP. Por favor, tente novamente.');
            });
    }
}

function validarCadastroCompletoComAcompanhante(event){
    event.preventDefault();
    var nomeAcompanhante = document.getElementById('inpNomeAcompanhante').value;
    var cpfAcompanhante = document.getElementById('inpCpfAcompanhante').value;
    var telefoneAcompanhante = document.getElementById('inpTelefoneAcompanhante').value;

    var informacoesAcompanhante = {
        nomeAcompanhante: nomeAcompanhante,
        cpfAcompanhante: cpfAcompanhante,
        telefoneAcompanhante: telefoneAcompanhante
    };

    localStorage.setItem('nomeAcompanhante', JSON.stringify(informacoesAcompanhante));

    if(!nomeAcompanhante || !cpfAcompanhante || !telefoneAcompanhante) {
        alert('Preencha todos os campos!');
    }
    else if (telefoneAcompanhante.length < 9 || telefoneAcompanhante.length > 12 ) {
        alert('Telefone inválido!');
    } else if (cpfAcompanhante.length < 12) {
        alert('CPF inválido!');
    } else {
        console.log('Cadastro do acompanhante realizado com sucesso!');
        localStorage.setItem('usuarioLogado', 'true');
        window.location.href = "./areaPaciente.html";
    }
}

function validarLogin(event){
    event.preventDefault();
    var email = document.getElementById('emailLogin').value;
    var senha = document.getElementById('senhaLogin').value;

    var informacoesUsuario = JSON.parse(localStorage.getItem('email'));

    if (informacoesUsuario && email === informacoesUsuario.email && senha === informacoesUsuario.senha) {
        console.log('Login realizado com sucesso!');
        localStorage.setItem('usuarioLogado', 'true');
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
            } else {
                const endereco = `${data.logradouro}`;
                const bairro = `${data.bairro}`;
                document.getElementById('endereco').value = endereco;
                document.getElementById('bairro').value = bairro;

                const cidade = data.localidade;
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

                // feito para ser acessado em todas as páginas
                localStorage.setItem('distancia', distanciaEmQuilometros);
                localStorage.setItem('tempo', duracaoFormatada);

                console.log("Distância até o Senac:", distanciaEmQuilometros, "km");
                console.log("Duração estimada:", duracaoFormatada);

                }else {
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