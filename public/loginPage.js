"use strict";

const userForm = new UserForm();

// Авторизация

userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (response) => {
		if (response.success == true) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage('Неправильный логин или пароль!');
		}
	});
};


// Регистрация

userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (response) => {
		if (response.success == true) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage('Неправильный формат логина или пароля');
		}
	});
};