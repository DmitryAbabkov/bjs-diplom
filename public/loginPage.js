"use strict";

const objectUse = new UserForm();

objectUse.loginFormCallback = (data) => {
  // ApiConnector.login.loginFormCallback();
  ApiConnector.login({ data }, loginFormCallback());
};

// objectUse("test");

console.log(objectUse);
