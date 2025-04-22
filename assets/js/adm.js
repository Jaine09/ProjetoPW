


function acionarEntrarAdm() {
    var txtEmailAdm = document.getElementById('txtEmail').value;
    var txtSenhaAdm = document.getElementById('txtSenha').value;

    if (txtEmailAdm == "admin@gmail.com" && txtSenhaAdm == "admin123") {
        window.location.href = "./pages/adm.html";
    } else {
        alert("Usuário incorreto");
    }
}




