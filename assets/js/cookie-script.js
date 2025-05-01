document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const cookieName = 'cookieConsent';

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cookieString = document.cookie;
        const nameEQ = name + "=";
        const ca = cookieString.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Verifica se o usuário já aceitou os cookies
    if (getCookie(cookieName) === 'accepted') {
        cookieNotice.classList.add('hidden');
    } else {
        cookieNotice.classList.remove('hidden');
    }

    // Adiciona um ouvinte de evento ao botão de aceitar
    acceptCookiesButton.addEventListener('click', function() {
        setCookie(cookieName, 'accepted', 30); // Define o cookie de consentimento por 30 dias
        cookieNotice.classList.add('hidden');
    });
});