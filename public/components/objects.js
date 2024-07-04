ymaps.ready(init);
var myMap;
const buttonCreateIPP = document.querySelector('#buttonCreateIPP')
const buttonCreatePol = document.querySelector('#buttonCreatePol')
const buttonDeletePol = document.querySelector('#buttonDeletePol')
const varXInput = document.getElementById("varX");
const varYInput = document.getElementById("varY");
var markersData = [];
var coordUp, coordDown, coordRight, coordLeft;
var myCircle;
let cord1, cord2 = 0;
var myPolygon;
var notePlacemark;
var startX, startY, endX, endY;
function init() {
    myMap = new ymaps.Map("map", {
        center: [55.2422, 58.1014],
        zoom: 10,
        controls: ['zoomControl'] //, 'fullscreenControl' , 'typeSelector'
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Добавление трекера
    document.getElementById('buttonDownload').addEventListener('click', function () {
        document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput').addEventListener('change', function (event) {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const coordinates = parseGPX(contents);
                drawRoute(coordinates);
            };
            reader.readAsText(file);
        }
    });
    function parseGPX(contents) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contents, "application/xml");
        const trkpts = xmlDoc.getElementsByTagName('trkpt');
        const coordinates = [];
        for (let i = 0; i < trkpts.length; i++) {
            const lat = parseFloat(trkpts[i].getAttribute('lat'));
            const lon = parseFloat(trkpts[i].getAttribute('lon'));
            coordinates.push([lat, lon]);
        }
        return coordinates;
    }
    function drawRoute(coordinates) {
        if (!myMap) {
            console.error('Карта не инициализирована.');
            return;
        }
        const polyline = new ymaps.Polyline(coordinates, {}, {
            strokeColor: '#0000FF',
            strokeWidth: 4,
            strokeOpacity: 0.6
        });
        myMap.geoObjects.add(polyline);
        myMap.setBounds(polyline.geometry.getBounds());
    }
    // Добавление трекера
    //Создание стат. объектов (EMS и т.д.)
    myMap.geoObjects
        .add(new ymaps.Placemark([55.532271, 58.239059], {
            hintContent: 'Клиника здоровья',
            balloonContent: '<strong>Клиника здоровья</strong>',
            iconCaption: 'Медицинское учреждение',
            address: 'Октябрьская улица, 2 , ​с. Месягутово, Дуванский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/hospital-building.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.399243, 57.92278], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Аркауловаская сельская участковая больница</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Салавата Юлаева, 5 ,​с. Аркаулово, Салаватский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.41304, 58.589742], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Кигинская центральная районная больница</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Ибрагимова, 38 , с. Верхние Киги, Кигинский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.182819, 58.152336], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Малоязовская центральная районная больница </strong>',
            iconCaption: 'PSAP',
            address: 'Улица 60 лет СССР, 6 , с. Малояз, Салаватский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.175181, 58.781117], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Районная больница г. Сатка</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Карла Маркса, 8а ,рп. Межевой, Саткинский муниципальный округ, Челябинская область'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.013885, 57.979370], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Больница пгт. Кропачево</strong>',
            iconCaption: 'PSAP',
            address: 'ул. Строителей, 30, рабочий посёлок Кропачёво, Ашинский район, Челябинская область'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }));
    //Смена тип карты
    document.getElementById('map1').addEventListener('click', function () {
        myMap.setType('yandex#map');
    });

    document.getElementById('map2').addEventListener('click', function () {
        myMap.setType('yandex#satellite');
    });

    document.getElementById('map3').addEventListener('click', function () {
        myMap.setType('yandex#hybrid');
    });

    const buttons = document.querySelectorAll('.imgBaseMap');
    // Перебираем все кнопки и навешиваем обработчики событий на клик
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Удаляем класс 'active' у всех кнопок
            buttons.forEach(btn => btn.classList.remove('activeMap'));
            // Добавляем класс 'active' только к выбранной кнопке
            this.classList.add('activeMap');

            // Здесь вы можете вызвать функцию, которая меняет тип карты
            // Например:
            const mapType = this.getAttribute('data-map-type');
            // myMap.setType(mapType);
        });
    });
    myMap.geoObjects.each(function (placemark) {
        var iconCaption = placemark.properties.get('iconCaption'); // Получаем значение свойства iconCaption
        var balloonContent = placemark.properties.get('balloonContent'); // Получаем значение свойства balloonContent
        var coordinates = placemark.geometry.getCoordinates(); // Получаем координаты Placemark
        // Создаем объект для маркера и добавляем его в массив markersData
        var markerData = {
            iconCaption: iconCaption,
            balloonContent: balloonContent,
            coordinates: coordinates
        };
        markersData.push(markerData); // Добавляем объект в массив
    });
    // Выводим информацию о маркерах в консоль
    console.log('Markers Data:', markersData);
    document.getElementById('draw1').addEventListener('click', function () {
        myPolygon = new ymaps.Polygon([], {}, {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 5,
            fillColor: 'rgba(0, 255, 0, 0.3)',
            strokeColor: '#00FF00',
            strokeWidth: 2
        });
        myMap.geoObjects.add(myPolygon);
        myPolygon.editor.startDrawing();
    });
    document.getElementById('saveDraw').addEventListener('click', function () {
        // Получаем содержимое input
        var noteContent = document.getElementById('inputDraw').value;
        // Получаем массив координат вершин многоугольника
        var coordinates = myPolygon.geometry.getCoordinates()[0];
        // Вычисляем среднее арифметическое координат всех вершин
        var sumX = 0;
        var sumY = 0;
        for (var i = 0; i < coordinates.length; i++) {
            sumX += coordinates[i][0];
            sumY += coordinates[i][1];
        }
        var centerX = sumX / coordinates.length;
        var centerY = sumY / coordinates.length;
        // Создаем заметку в центре многоугольника
        var labelCoordinates = [centerX, centerY];
        var label = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: labelCoordinates
            },
            properties: {
                iconContent: noteContent
            }
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '', // URL изображения, если не нужен, оставьте пустым
            iconImageSize: [0, 0], // Размер изображения, если не нужен, оставьте [0, 0]
            iconContentOffset: [0, 0], // Смещение содержимого относительно иконки, если не нужен, оставьте [0, 0]
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
                '<div style="font-weight: bold; font-size: 16px;">$[properties.iconContent]</div>'
            )
        });
        myMap.geoObjects.add(label);
        // Создаем переменные с координатами вершин многоугольника и заметки
        var polygonCoordinates = coordinates;
        var noteCoordinates = labelCoordinates;
        area_top1X = coordinates[0][0];
        area_top1Y = coordinates[0][1];
        area_top2X = coordinates[1][0];
        area_top2Y = coordinates[1][1];
        area_top3X = coordinates[2][0];
        area_top3Y = coordinates[2][1];
        area_top4X = coordinates[3][0];
        area_top4Y = coordinates[3][1];
        area_top5X = coordinates[4][0];
        area_top5Y = coordinates[4][1];
        area_centerX = labelCoordinates[0];
        area_centerY = labelCoordinates[1];
        area_text = noteContent;
        console.log(coordinates[0])
        console.log(rea_top3X = coordinates[2][0])
        // Выводим координаты и текст заметки в консоль
        // Отправляем данные на сервер
        fetch('/addDataNoteAreas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                area_top1X: coordinates[0][0],
                area_top1Y: coordinates[0][1],
                area_top2X: coordinates[1][0],
                area_top2Y: coordinates[1][1],
                area_top3X: coordinates[2][0],
                area_top3Y: coordinates[2][1],
                area_top4X: coordinates[3][0],
                area_top4Y: coordinates[3][1],
                area_top5X: coordinates[4][0],
                area_top5Y: coordinates[4][1],
                area_centerX: labelCoordinates[0],
                area_centerY: labelCoordinates[1],
                area_text: noteContent
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Ошибка отправки данных на сервер:', error);
            });
    });
    //Создание IPP
    var cardEmergency = {};
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader: 'Создание IPP',
                contentBody: //'<p>Кто-то щелкнул по карте.</p>' +
                    '<p>Координаты: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                //contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
        // Присваивание значений переменных cord1 и cord2 соответствующим полям ввода
        cord1 = coords[0];
        cord2 = coords[1];
        cardEmergency.latitude = cord1;
        cardEmergency.longitude = cord2;
        console.log("Данные объекта", cardEmergency);
        console.log(`Координаты IPP: ${cord1} , ${cord2}`);
    });
    //Правая кнопка мыши
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
    // Создаем пустой объект для IPP
    var ippData = {};
    // Добавляем IPP в отдельный объект
    buttonCreateIPP.addEventListener("click", function () {
        // Переменные чтоб в форме сохранения карточек автоматически сохранялись
        var latitudeInput = document.getElementById('latitude');
        var longitudeInput = document.getElementById('longitude');
        console.log(cord1, cord2);
        if (cord1 == 0 || cord2 == 0) {
            console.log("cord1 и cord2 равны undefined или 0");
            cord1 = varXInput.value;
            cord2 = varYInput.value;
            console.log(`Координаты IPP: ${cord1} , ${cord2}`);
        } else {
            console.log("все ок");
        }
        // Записываем информацию о IPP в объект ippData
        ippData = {
            coordinates: [cord1, cord2],
            balloonContent: '<strong>Последняя известная точка потерявшегося</strong>',
            iconCaption: 'IPP'
        };
        // Добавляем маркер IPP на карту
        myMap.geoObjects.add(new ymaps.Placemark(ippData.coordinates, {
            balloonContent: ippData.balloonContent
        }, {
            preset: 'islands#redCircleDotIconWithCaption',
            iconCaptionMaxWidth: '50',
            iconCaption: ippData.iconCaption
        }));
        latitudeInput.value = cord1;
        longitudeInput.value = cord2;
    });
    // Функция для построения линии между IPP и ближайшим маркером
    function drawLineToNearestMarker() {
        if (Object.keys(ippData).length === 0) {
            console.log("IPP не определен");
            return;
        }
        var nearestMarkerData = markersData[0]; // Предположим, что первый маркер в массиве - ближайший
        // Находим ближайший маркер к IPP
        var ippCoordinates = ippData.coordinates;
        var minDistance = Infinity;
        for (var i = 0; i < markersData.length; i++) {
            var markerCoordinates = markersData[i].coordinates;
            var distance = ymaps.coordSystem.geo.getDistance(ippCoordinates, markerCoordinates);
            if (distance < minDistance) {
                minDistance = distance;
                nearestMarkerData = markersData[i];
            }
        }
        // Построение линии между IPP и ближайшим маркером
        var lineGeometry = [ippCoordinates, nearestMarkerData.coordinates];
        var line = new ymaps.Polyline(lineGeometry, {}, { strokeColor: '#0000FF', strokeWidth: 2 });
        myMap.geoObjects.add(line);
        // Создание метки с подписью длины линии
        var labelCoordinates = [
            (ippCoordinates[0] + nearestMarkerData.coordinates[0]) / 2,
            (ippCoordinates[1] + nearestMarkerData.coordinates[1]) / 2
        ];
        var labelText = ' ' + minDistance.toFixed(2) + 'м';
        var label = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: labelCoordinates
            },
            properties: {
                iconContent: labelText
            }
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '', // URL изображения, если не нужен, оставьте пустым
            iconImageSize: [0, 0], // Размер изображения, если не нужен, оставьте [0, 0]
            iconContentOffset: [0, 0] // Смещение содержимого относительно иконки, если не нужен, оставьте [0, 0]
        });
        myMap.geoObjects.add(label);
    }
    // Вызываем функцию для построения линии между IPP и ближайшим маркером при необходимости
    // Например, при клике на кнопку или другом событии
    var btnNeighbour = document.getElementById('btnNeighbour');
    // Добавляем обработчик события на клик по кнопке
    btnNeighbour.addEventListener('click', function () {
        // Вызываем функцию для построения линии между IPP и ближайшим маркером
        drawLineToNearestMarker();
    });
    //Создание теоретической области поиска
    buttonCreatePol.addEventListener("click", function () {
        var timeInput = document.getElementById('time_user');
        console.log(cord1, cord2);
        const time_user = document.getElementById("kmDist").value;
        const speed = 5;
        const dist = time_user * speed * 1000;
        console.log(`Человек мог пройти ${dist} метров по всем направлениям`);
        timeInput.value = time_user;
        myCircle = new ymaps.Circle([
            // Координаты центра круга.
            [cord1, cord2], dist
            // Радиус круга в метрах.
            //10000
        ], {
            // Описываем свойства круга.
            // Содержимое балуна.
            balloonContent: 'Радиус круга ≈ ' + dist + ' метров',
        }, {
            // Задаем опции круга.
            // Включаем возможность перетаскивания круга.
            draggable: false,
            // Цвет заливки.
            // Последний байт (77) определяет прозрачность.
            // Прозрачность заливки также можно задать используя опцию "fillOpacity".
            fillColor: "#DB709377",
            // Цвет обводки.
            strokeColor: "#990066",
            // Прозрачность обводки.
            strokeOpacity: 0.8,
            // Ширина обводки в пикселях.
            strokeWidth: 1
        });
        myMap.geoObjects.add(myCircle);

        //Установка центра и зума
        myMap.setZoom(10);
        myMap.setCenter([cord1, cord2]);
    })
    drawParkBorders();

    document.getElementById('buttonDeletePol').addEventListener('click', function () {
        removeAllObjects();
        addMarkers();
        drawParkBorders();
    });
}
function drawParkBorders() {
    var geoObject2 = new ymaps.Polyline(coords2, {}, {
        strokeColor: '#0000FF',
        strokeWidth: 2,
        opacity: 0.4
    });
    geoObject2.properties.set('hintContent', 'Границы геопарка');
    myMap.geoObjects.add(geoObject2);
}
var coords2 = [
    [55.48229899965866, 57.89423994426858],
    [55.478716288641515, 57.89093546276223],
    [55.472862115296294, 57.886950462286464],
    [55.50728471671572, 57.907313040588356],
    [55.51725704516488, 57.86414020428463],
    [55.51567430530626, 57.85845392117309],
];
function removeAllObjects() {
    myMap.geoObjects.removeAll();
}
function addMarkers() {
    myMap.geoObjects
        .add(new ymaps.Placemark([55.532271, 58.239059], {
            hintContent: 'Клиника здоровья',
            balloonContent: '<strong>Клиника здоровья</strong>',
            iconCaption: 'Медицинское учреждение',
            address: 'Октябрьская улица, 2 , ​с. Месягутово, Дуванский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/hospital-building.png',
            iconImageSize: [30, 30],
        }))
        .add(new ymaps.Placemark([55.399243, 57.92278], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Аркауловаская сельская участковая больнциа</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Салавата Юлаева, 5 ,​с. Аркаулово, Салаватский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.41304, 58.589742], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Кигинская центральная районная больница</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Ибрагимова, 38 , с. Верхние Киги, Кигинский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.182819, 58.152336], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Малоязовская центральная районная больница </strong>',
            iconCaption: 'PSAP',
            address: 'Улица 60 лет СССР, 6 , с. Малояз, Салаватский район, РБ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.175181, 58.781117], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Районная больница г. Сатка</strong>',
            iconCaption: 'PSAP',
            address: 'Улица Карла Маркса, 8а ,рп. Межевой, Саткинский муниципальный округ, Челябинская область'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }))

        .add(new ymaps.Placemark([55.013885, 57.979370], {
            hintContent: 'Служба первой помощи',
            balloonContent: '<strong>Больница пгт. Кропачево</strong>',
            iconCaption: 'PSAP',
            address: 'ул. Строителей, 30, рабочий посёлок Кропачёво, Ашинский район, Челябинская область'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/markers/ambulance.png',
            iconImageSize: [30, 30],
        }));
}
function search() {
    var input, filter, searchResults;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = '';
    // Проходим по каждому объекту в массиве markersData
    for (var i = 0; i < markersData.length; i++) {
        var markerData = markersData[i];
        var iconCaption = markerData.iconCaption.toUpperCase();
        var balloonContent = markerData.balloonContent.toUpperCase();

        // Проверяем, содержит ли iconCaption или balloonContent введенную пользователем строку
        if (iconCaption.includes(filter) || balloonContent.includes(filter)) {
            // Выводим balloonContent и адрес в результат поиска и в консоль
            var resultItem = document.createElement('div');
            resultItem.innerHTML = balloonContent + ' (Адрес: ' + markerData.address + ')';
            searchResults.appendChild(resultItem);
            console.log({
                balloonContent: markerData.balloonContent,
                address: markerData.address
            });
        }
    }
}
// Получаем ссылки на элементы
var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');
// Функция для отображения подсказок
function showSuggestions() {
    var filter = searchInput.value.toUpperCase();
    searchResults.innerHTML = '';

    myMap.geoObjects.each(function (placemark) {
        var iconCaption = placemark.properties.get('iconCaption');
        var balloonContent = placemark.properties.get('balloonContent');
        var address = placemark.properties.get('address');

        if (iconCaption.toUpperCase().indexOf(filter) > -1 || balloonContent.toUpperCase().indexOf(filter) > -1) {
            var resultItem = document.createElement('div');
            resultItem.innerHTML = balloonContent + '<br>Адрес: ' + address;
            searchResults.appendChild(resultItem);
            // Добавляем обработчик события для нажатия на подсказку
            resultItem.addEventListener('click', function () {
                // Получаем координаты из объекта placemark
                var coordinates = placemark.geometry.getCoordinates();
                // Обновляем значения cord1 и cord2
                cord1 = coordinates[0];
                cord2 = coordinates[1];
                // Устанавливаем новый центр карты и масштаб
                myMap.setCenter(coordinates);
                myMap.setZoom(11);
                // Выводим только balloonContent и адрес в консоль
                console.log({
                    balloonContent: balloonContent,
                    address: address
                });
            });
        }
    });
}

