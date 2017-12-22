var loginLink = document.querySelector(".login");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content__close");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var form = popup.querySelector(".login-form");
var storage = localStorage.getItem("login");

loginLink.addEventListener('click', function(event) {
	event.preventDefault();
	popup.classList.add("modal-content-show");

	if (storage) {
		login.value = storage;
		password.focus();
	} else {
		login.focus();
	}
});

close.addEventListener('click', function(event) {
	event.preventDefault();
	popup.classList.remove("modal-content-show");
});

form.addEventListener('submit', function(event) {
	if (!login.value || !password.value) {
		event.preventDefault();
		console.log('Нужно ввести логин и пароль');
	} else {
		localStorage.setItem(login, login.value);
		//localStorage.setItem(password, login.password);
	}
});

// 8: 1:44
