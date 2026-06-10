const userLogin = document.getElementById('login-form');
const userSelect = document.getElementById('user');

userLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log(userSelect.value);

    window.location.href = userSelect.value;
});