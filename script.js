var txtEmailAdm = document.getElementById('txtEmail').value;
var txtSenhaAdm = document.getElementById('txtSenha').value;

function acionarEntrarAdm(){
    if(txtEmailAdm == "admin@gmail.com" && txtSenhaAdm == "admin123"){
        alert("Usuário correto");
    }else{
        alert("Usuário incorreto");
    }
}