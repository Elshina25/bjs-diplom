'use strict';
//авторизация пользователя
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            window.location.reload();
        } else {
           userForm.setLoginErrorMessage(response.error);
        }
    });
}

//регистрация пользователя
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        console.log(response);
        if (response.success) {
            window.location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
}
