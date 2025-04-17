document.addEventListener('DOMContentLoaded', function() {
    const distanciaElement = document.getElementById('distancia');
    const tempoElement = document.getElementById('tempo');
    const stickDistancia = document.querySelector('.stick-distancia');

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
            stickDistancia.style.display = 'flex';
        }

    } else {
        console.log("Nenhum dado de distância e tempo encontrado");
        
    }
});