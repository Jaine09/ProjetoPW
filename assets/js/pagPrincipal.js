document.addEventListener('DOMContentLoaded', function () {
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
        for (let i = 0; i < ca.length; i++) {
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
    acceptCookiesButton.addEventListener('click', function () {
        setCookie(cookieName, 'accepted', 1); // Define o cookie de consentimento por 1 dia
        cookieNotice.classList.add('hidden');
    });

    const telefoneInput = document.getElementById('txtTelefoneMensagem')
    if(telefoneInput){aplicarMascaraTelefone(telefoneInput);}
});



function enviarMensagem() {
    let nomeUsuario = document.getElementById('txtNomeMensagem').value;
    let telefone = document.getElementById('txtTelefoneMensagem').value;
    let email = document.getElementById('txtEmailMensagem').value;
    let txtmensagem = document.getElementById('txtMensagem').value;
    let mensagemErro = document.getElementById('msgErro');

    

    if (!nomeUsuario || !telefone || !email || !txtmensagem) {
        mensagemErro.textContent = "Preencha todos os campos!";
        mensagemErro.style.color = "red";
        return;
    } else {
        mensagemErro.style.color = "green";
        mensagemErro.textContent = "Mensagem enviada com sucesso!";

        const novaMensagem = {
            nome: nomeUsuario,
            telefone: telefone, 
            email: email,
            mensagem: txtmensagem
        };

        let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
        mensagens.push(novaMensagem);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));

        limparCampos();
        setTimeout(() => {
            mensagemErro.textContent = "";
        }, 3000);
        return;
    }
}

function limparCampos() {
    document.getElementById('txtNomeMensagem').value = '';
    document.getElementById('txtTelefoneMensagem').value = '';
    document.getElementById('txtEmailMensagem').value = '';
    document.getElementById('txtMensagem').value = '';
}

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
