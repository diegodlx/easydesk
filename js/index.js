// temporario
import { todosChamados } from './data.js';
const incluirDados = document.getElementById('incluir');
const limparDados = document.getElementById('clear');
// temporario

const userLogin = document.getElementById('login-form');
const userSelect = document.getElementById('user');


userLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log(userSelect.value);

    window.location.href = userSelect.value;
});


// temporario
limparDados.addEventListener("click", function() {
    localStorage.clear();
    console.log("Dados foram apagados.");
});

incluirDados.addEventListener("click", function() {
    localStorage.setItem('chamados', JSON.stringify(todosChamados));
});
// temporario