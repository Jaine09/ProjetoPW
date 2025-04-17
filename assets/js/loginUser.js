var btnCadastrar = document.getElementById('cadastrar');
var btnEntrar = document.getElementById('entrar');

var body = document.querySelector('body');

btnCadastrar.addEventListener('click', function () {
    body.className = 'cadastrar-js';
});

btnEntrar.addEventListener('click', function () {
    body.className = 'entrar-js';
});


// Validando cadastro de dados do usuário
function validarCadastroCompleto() {
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var bairro = document.getElementById('bairro').value;

    if (nome == "" || telefone == "" || cpf == "" || email == "" || senha == "" || cep == "" || endereco == "" || bairro == "") {
        alert('Preencha todos os campos!');
    } else {
        if (telefone.length < 9 || telefone.length > 12) {
            alert('Telefone inválido!');
        } else if (cpf.length < 12) {
            alert('CPF inválido!');
        } else {
            console.log('Cadastro realizado com sucesso! Calculando a distância...');
            window.location.href = "./homepage.html";
        }
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
    var spanDistancia = document.getElementById('distancia');
    var spanTempo = document.getElementById('tempo');
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

                // feito para ser acessado na página homepage.html
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
