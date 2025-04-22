const loginOff = document.getElementById('btnSair');


document.addEventListener('DOMContentLoaded', function () {

    const btnLogar = document.querySelectorAll('.btnEntrarCadastrar');
    const btnLogado = document.querySelectorAll('.btnLogado');
    const distanciaElement = document.getElementById('distancia');
    const tempoElement = document.getElementById('tempo');
    const stickDistancia = document.querySelector('.stick-distancia');

    const usuarioLogado = localStorage.getItem('usuarioLogado'); // Verifica a flag
    console.log(usuarioLogado)

    if (usuarioLogado === 'true') {
        btnLogado.forEach(button => { // Itera sobre todos os elementos com a classe 'btnLogado'
            button.style.visibility = 'visible';
            button.style.display = 'flex';
        });
        btnLogar.forEach(button => { // Itera sobre todos os botões de entrar
            button.style.visibility = 'hidden';
            button.style.display = 'none';
        });

        const distanciaArmazenada = localStorage.getItem('distancia');
        const tempoArmazenado = localStorage.getItem('tempo');

        if (distanciaArmazenada && tempoArmazenado) {
            if (distanciaElement) {
                distanciaElement.textContent = `Distância: ${distanciaArmazenada} km`;
            }
            if (tempoElement) {
                tempoElement.textContent = `Duração: ${tempoArmazenado}`;
            }
            if (stickDistancia) {
                stickDistancia.style.display = 'block';
            }
        } else {
            console.log("Nenhum dado de distância e tempo encontrado (após login).");
        }
    } else {
        console.log("Usuário não logado, ícone e dados de distância/tempo ocultos.");
        if (distanciaElement) distanciaElement.textContent = '';
        if (tempoElement) tempoElement.textContent = '';
        btnLogado.forEach(button => {
            button.style.display = 'none';
        });
        if (stickDistancia) stickDistancia.style.display = 'none';
        btnLogar.forEach(button => {
            button.style.display = 'flex'; // Garante que os botões de entrar apareçam
        });
    }

});



const botoesAgendar = document.querySelectorAll('.btnAgendarConsulta');

if (botoesAgendar) {
    botoesAgendar.forEach(botao => {
        botao.addEventListener('click', function () {
            const usuarioLogado = localStorage.getItem('usuarioLogado');
            if (usuarioLogado === 'true') {
                window.location.href = "./areaPaciente.html#agendarConsulta";
            } else {
                window.location.href = "./loginUser.html";
            }
        });
    });
}

const botaoAgendarPagInicial = document.getElementById('btnAgendar_consulta');

if (botaoAgendarPagInicial) {
    botaoAgendarPagInicial.addEventListener('click', function () {
        const usuarioLogado = localStorage.getItem('usuarioLogado');
        if (usuarioLogado === 'true') {
            window.location.href = "./pages/areaPaciente.html#agendarConsulta";
        } else {
            window.location.href = "./pages/loginUser.html";
        }
    });
}
