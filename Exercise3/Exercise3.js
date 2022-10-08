//Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
//Добавить в чат механизм отправки геолокации:
//При клике на кнопку «Геолокация» необходимо отправить данные серверу и вывести в чат ссылку на https://www.openstreetmap.org/ с вашей геолокацией.
// Сообщение, которое отправит обратно эхо-сервер, выводить не нужно.
const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.querySelector(".divOfMessages");
const btn = document.querySelector('.btn');
const btnGeo = document.querySelector('.geo');
let message = document.querySelector(".enterMessage");
let countMessages = 0;

function writeToScreen(message) {  //Выводит сообщения на экран
    if (countMessages >= 11) { //Очистить окно сообщений
        while (output.hasChildNodes()) {
            output.removeChild(output.lastChild);
        }
        countMessages = 0;
    }
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
    countMessages += 1;

}
function ready() {
    websocket.onopen = function (evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function (evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'
        );
    };
    websocket.onerror = function (evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
}
let websocket = new WebSocket(wsUri);
document.addEventListener("DOMContentLoaded", ready);
btn.addEventListener('click', () => {
    writeToScreen("SENT: " + message.value);
    websocket.send(message.value);
});


btnGeo.addEventListener("click", getLocation); //При нажатии на кнопку Геолокация

function getLocation() { //Браузер определяет координаты местоположения
    if ("geolocation" in navigator) {
        let locationOptions = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
    } else {
        writeToScreen("Ваш браузер не поддерживает функцию определения местоположения");
    }
}

function locationSuccess(data) {  //Если кординаты найдены успешно, то выводим ссылку на карту
    let link = `https://www.openstreetmap.org/#map=${data.coords.longitude}/${data.coords.latitude}`;
    writeToScreen(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
}

function locationError() {
    writeToScreen("При получении местоположения произошла ошибка");
}


