window.onload = function () {
    let inputName = document.getElementById('input-name');
    let inputUser = document.getElementById('input-user');
    let inputCheckbox = document.getElementById('input-checkbox');
    let buttonSignUp = document.getElementById('sign-up');
    let inputEMail = document.getElementById('input-email');
    let inputPassword = document.getElementById('input-password');
    let inputRePassword = document.getElementById('input-repassword');
    let modal = document.getElementById('modal-window');
    let input = document.querySelectorAll('.form__item-input');
    let modalButton = document.getElementById('modal-button');
    let newAccount = document.getElementById('newAccount');

    buttonSignUp.onclick = function () {
        for (let i = 0; i < input.length; i++) {
            input[i].style.borderBottomColor = '#C6C6C4';
            input[i].nextElementSibling.style.display = 'none';
        }

        let hasError = false;

        function error(input) {
            hasError = true;
            input.nextElementSibling.style.display = 'block';
            input.style.borderBottomColor = 'red';
        }

        if (!inputName.value.match(/^[A-Za-z]+\s*$/)) {
            error(inputName);
        }
        if (!inputUser.value.match(/^[\w-]+$/)) {
            error(inputUser);
        }
        if (!inputEMail.value.match(/^[A-Z\d._%+-]+@[A-Z\d-]+.+.[A-Z]{2,4}$/i)) {
            error(inputEMail);
        }
        if (!inputPassword.value.match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_]).{8,})/g)) {
            error(inputPassword);
        }
        if (inputRePassword.value !== inputPassword.value) {
            error(inputRePassword);
        }
        if (!inputCheckbox.checked) {
            error(inputCheckbox);
        } else if (!hasError) {
            modal.style.display = 'block';
            array();
        }

        function array(event) {
            const myFormData = new FormData(document.getElementById('form'));
            console.log(myFormData);

            const formKeys = Object.fromEntries(myFormData.entries());

            let clients = [];
            let newClient = localStorage.getItem('newClient');

            if (newClient) {
                clients = JSON.parse(newClient);
            }

            clients.push(formKeys);
            localStorage.setItem('newClient', JSON.stringify(clients));
            console.log(localStorage);
        }
    }

    function ClearForm() {
        inputName.value = "";
        inputUser.value = "";
        inputEMail.value = "";
        inputPassword.value = "";
        inputRePassword.value = "";
    }

    function LogIn() {
        document.getElementsByClassName('main__form-title')[0].innerHTML = 'Log in to the system';
        document.getElementsByClassName('form__item')[0].remove();
        document.getElementsByClassName('form__item')[1].remove();
        document.getElementsByClassName('form__item')[2].remove();
        document.getElementsByClassName('form__item')[2].remove();
        document.getElementById('sign-up').innerHTML = 'Sign in';
        newAccount.innerHTML = 'Registration';
        newAccount.onclick = () => {
            location.reload();
        }

        buttonSignUp.onclick = function () {
            let hasError = false;
            inputUser.style.borderBottomColor = '#C6C6C4';
            inputUser.nextElementSibling.nextElementSibling.style.display = 'none';
            inputPassword.style.borderBottomColor = '#C6C6C4';
            inputPassword.nextElementSibling.nextElementSibling.style.display = 'none';

            if (!inputUser.value) {
                inputUser.nextElementSibling.nextElementSibling.style.display = 'block';
                inputUser.style.borderBottomColor = 'red';
                hasError = true;
            }
            if (!inputPassword.value) {
                inputPassword.nextElementSibling.nextElementSibling.style.display = 'block';
                inputPassword.style.borderBottomColor = 'red';
                hasError = true;
            }

            if (!hasError) {
                let client = localStorage.getItem('newClient');
                let clients = JSON.parse(client);
                console.log(clients)

                let username = inputUser.value;
                let password = inputPassword.value;

                let user = clients.find(item => item["Your username"] === username);
                let userPassword = clients.find(item => item["Password"] === password);
                console.log(user);
                console.log(userPassword);

                if (user) {
                    inputUser.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
                    inputUser.style.borderBottomColor = '#C6C6C4';

                    if (user['Password'] === password) {
                        inputPassword.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
                        inputPassword.style.borderBottomColor = '#C6C6C4';
                        document.getElementsByClassName('main__form-title')[0].innerHTML = 'Welcome, ' + user['Full Name'];
                        buttonSignUp.innerHTML = 'Exit';
                        document.getElementsByClassName('main__form-description')[0].remove();
                        document.getElementsByClassName('form__item')[0].remove();
                        document.getElementsByClassName('form__item')[0].remove();
                        document.getElementsByClassName('form__question')[0].remove();
                        buttonSignUp.onclick = function () {
                            location.reload();
                        }
                    } else {
                        inputPassword.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
                        inputPassword.style.borderBottomColor = 'red';
                    }

                } else {
                    inputUser.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
                    inputUser.style.borderBottomColor = 'red';
                }
            }
        }
    }


    modalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        ClearForm();
        LogIn();
    })

    newAccount.onclick = () => {
        ClearForm();
        LogIn();
    }
}