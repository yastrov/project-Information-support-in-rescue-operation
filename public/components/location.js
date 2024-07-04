document.getElementById('buttonLocation').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Создаем метку на карте с текущими координатами
        var myPlacemark = new ymaps.Placemark([latitude, longitude], {
            hintContent: 'Вы здесь',
            balloonContent: 'Ваши координаты: ' + latitude + ', ' + longitude
        });
        // Добавляем метку на карту
        myMap.geoObjects.add(myPlacemark);
        // Центрируем карту по текущим координатам
        myMap.setCenter([latitude, longitude]);
    }, function(error) {
        // Обработка ошибок
        console.error('Ошибка получения координат: ' + error.message);
    });
});