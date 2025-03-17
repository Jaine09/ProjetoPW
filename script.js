function acionarEntrarAdm(event) {
    event.preventDefault();
    var txtEmailAdm = document.getElementById('txtEmail').value;
    var txtSenhaAdm = document.getElementById('txtSenha').value;

   

    if (txtEmailAdm == "admin@gmail.com" && txtSenhaAdm == "admin123") {
        alert("usuario correto");
        window.location.href = "./homepage.html";
    } else {

        alert("Usuário incorreto");
    }
}
