const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const repeatPass = document.querySelector('#repeatPass');
const submit = document.querySelector('#submit');
const errorPass = document.querySelector('.errorPass')
const myForm = document.querySelector('#myForm');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let pass = password.value;
    let repPass = repeatPass.value;
    const pwdCh = /^(?=.*[a-z])/;
    const pwdCh2 = /^(?=.*[A-Z])/;
    const pwdCh3 = /^(?=.*[0-9])/;

    if (pass.length < 6) {
        errorPass.innerHTML = 'Your password must contain more then 6 characters'
        return false;
    };

    if (pwdCh.test(pass) == false) {
        errorPass.innerHTML = 'Your password must contain at last 1 lowercase letter';
        return false;
    } else if (pwdCh.test(pass) == true) {
        errorPass.innerHTML = 'looks good!'
    };

    if (pwdCh2.test(pass) == false) {
        errorPass.innerHTML = 'Your password must contain at last 1 uppercase letter';
        return false;
    } else if (pwdCh2.test(pass) == true) {
        errorPass.innerHTML = 'looks good!'
    };

    if (pwdCh3.test(pass) == false) {
        errorPass.innerHTML = "Your password must contain at last 1 number";
        return false;
    } else if (pwdCh3.test(pass) == true) {
        errorPass.innerHTML = 'looks good!'
    };

    if (repPass != pass) {
        errorPass.innerHTML = "Password and repeat password must be the same";
        return false;
    } else if (repPass == pass) {
        errorPass.innerHTML = "looks good!"
    };
});