'use strict'
// выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            window.location.reload();
        }
    });
}

//загрузка информации о пользователе в виджет
const showUserDataCallback = ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//загрузка текущих курсов валют в виджет
const ratesBoard = new RatesBoard();
let timerId = null;
const exchangeRateCallback = ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });

timerId = setInterval(exchangeRateCallback, 60000);

//операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(moneyManager.setMessage(true, 'Счет пополнен'));
        } else {
            console.log(moneyManager.setMessage(false, response.error));
        }
    });
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(moneyManager.setMessage(true, 'Конвертация прошла успешно'));
        } else {
            console.log(moneyManager.setMessage(false, response.error));
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(moneyManager.setMessage(true, 'Перевод совершен'));
        } else {
            console.log(moneyManager.setMessage(false, response.error));
        }
    });
}

//избранное
const favoritesWidget = new FavoritesWidget();
const getFavoritesCallback = ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data)
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            console.log(favoritesWidget.setMessage(true, 'Пользователь добавлен в Избранное'))
        } else {
            console.log(favoritesWidget.setMessage(false, response.error));
        }
    });
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            console.log(favoritesWidget.setMessage(true, 'Пользователь удален из Избранного'))
        } else {
            console.log(favoritesWidget.setMessage(false, response.error));
        }
    });
}
