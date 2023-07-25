"use strict";


const logout = new LogoutButton();

//Разлогин 

logout.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		}
	});
};

// Получение информации о профиле
ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});


const ratesBoard = new RatesBoard();


const courseMoney = function() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);

		}
	});
};
courseMoney();

const getCourseMoney = setInterval(courseMoney, 60000);

// MoneyManager

const moneyManager = new MoneyManager();

// Пополнение баланса

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Баланс успешно пополнен');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

// Конвертация валюты

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация прошла успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

// Перевод валюты

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод прошел успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

// Работа с избранным

const favoriteWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoriteWidget.clearTable();
		favoriteWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoriteWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoriteWidget.clearTable();
			favoriteWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoriteWidget.setMessage(true, 'Пользователь добавлен');
		} else {
			favoriteWidget.setMessage(false, response.error);
		}
	});
}


favoriteWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoriteWidget.clearTable();
			favoriteWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoriteWidget.setMessage(true, 'Пользователь удален');
		} else {
			favoriteWidget.setMessage(false, response.error);
		}
	});
};