function acionarEntrarAdm(event) {
    event.preventDefault();
    var txtEmailAdm = document.getElementById('txtEmail').value;
    var txtSenhaAdm = document.getElementById('txtSenha').value;

   

    if (txtEmailAdm == "admin@gmail.com" && txtSenhaAdm == "admin123") {
        
        window.location.href = "./homepage.html";
    } else {

        alert("Usuário incorreto");
    }
}

function acionarBtnSaibaMais(){
    window.location.href = "../pages/especialidade.html";
}

function acessarBlog(){
    alert("entrou");
    window.location.href = "https://camis25.github.io/Projeto-Web/";
}
