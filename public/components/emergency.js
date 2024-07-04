
document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.user-card');
    var btnDeletePol = document.getElementById('buttonDeletePol');
    var activeCard = null;

    buttons.forEach(function (button) {
        button.addEventListener('click', async function () {
            // Удаляем класс ActiveCard у предыдущей активной карточки
            if (activeCard) {
                activeCard.classList.remove('ActiveCard');
            }

            // Добавляем класс ActiveCard к текущей карточке
            this.classList.add('ActiveCard');
            activeCard = this;

            console.log('Классы карточки:', this.classList.value);

            var status = this.getAttribute('data-status');
            var latitude = parseFloat(this.getAttribute('data-latitude'));
            var longitude = parseFloat(this.getAttribute('data-longitude'));
            var time_user = parseFloat(this.getAttribute('data-time_user'));

            console.log('Широта:', latitude);
            console.log('Долгота:', longitude);
            console.log('Время:', time_user);

            var ippData = {
                coordinates: [latitude, longitude],
                balloonContent: '<strong>Последняя известная точка потерявшегося</strong>',
                iconCaption: 'IPP'
            };

            var ippPlacemark = new ymaps.Placemark(ippData.coordinates, {
                balloonContent: ippData.balloonContent
            }, {
                preset: 'islands#redCircleDotIconWithCaption',
                iconCaptionMaxWidth: '50',
                iconCaption: ippData.iconCaption
            });

            const speed = 5;
            const dist = time_user * speed * 1000;
            console.log(`Человек мог пройти ${dist} метров по всем направлениям`);

            var myCircle = new ymaps.Circle([
                [latitude, longitude], dist
            ], {
                balloonContent: 'Радиус круга ≈ ' + dist + ' метров',
            }, {
                draggable: false,
                fillColor: "#DB709377",
                strokeColor: "#990066",
                strokeOpacity: 0.8,
                strokeWidth: 1
            });

            myMap.geoObjects.add(ippPlacemark);
            myMap.geoObjects.add(myCircle);
            myMap.setZoom(10);
            myMap.setCenter([latitude, longitude]);

            btnDeletePol.addEventListener('click', function () {
                if (activeCard) {
                    activeCard.classList.remove('ActiveCard');
                    activeCard = null;
                }

                myMap.geoObjects.remove(ippPlacemark);
                myMap.geoObjects.remove(myCircle);
            });
            try {
                const response = await fetch('/getNoteAreasData');
                const data = await response.json();

                data.forEach(async row => {
                    const {
                        area_top1x, area_top1y,
                        area_top2x, area_top2y,
                        area_top3x, area_top3y,
                        area_top4x, area_top4y,
                        area_top5x, area_top5y,
                        area_centerx, area_centery,
                        area_text
                    } = row;

                    const numericArea_top1X = parseFloat(area_top1x);
                    const numericArea_top1Y = parseFloat(area_top1y);
                    const numericArea_top2X = parseFloat(area_top2x);
                    const numericArea_top2Y = parseFloat(area_top2y);
                    const numericArea_top3X = parseFloat(area_top3x);
                    const numericArea_top3Y = parseFloat(area_top3y);
                    const numericArea_top4X = parseFloat(area_top4x);
                    const numericArea_top4Y = parseFloat(area_top4y);
                    const numericArea_top5X = parseFloat(area_top5x);
                    const numericArea_top5Y = parseFloat(area_top5y);
                    const numericArea_centerX = parseFloat(area_centerx);
                    const numericArea_centerY = parseFloat(area_centery);

                    // Создаем массив координат многоугольника
                    const polygonCoordinates = [
                        [numericArea_top1X, numericArea_top1Y],
                        [numericArea_top2X, numericArea_top2Y],
                        [numericArea_top3X, numericArea_top3Y],
                        [numericArea_top4X, numericArea_top4Y],
                        [numericArea_top5X, numericArea_top5Y]// Замыкаем многоугольник
                    ];

                    // Создаем многоугольник на карте
                    const myPolygon = new ymaps.Polygon([polygonCoordinates], {}, {
                        fillColor: 'rgba(0, 255, 0, 0.3)',
                        strokeColor: '#00FF00',
                        strokeWidth: 2
                    });
                    const labelCoordinates = [numericArea_centerX, numericArea_centerY];
                    const label = new ymaps.Placemark(labelCoordinates, {
                        iconContent: area_text
                    }, {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: '',
                        iconImageSize: [0, 0],
                        iconContentOffset: [0, 0],
                        iconContentLayout: ymaps.templateLayoutFactory.createClass(
                            '<div style="font-weight: bold; font-size: 16px;">$[properties.iconContent]</div>'
                        )
                    });
                    if (myCircle.geometry.contains([numericArea_centerX, numericArea_centerY])) {
                        myMap.geoObjects.add(myPolygon);
                        myMap.geoObjects.add(label);
                    }
                    console.log(myCircle)
                    console.log(myPolygon.geometry.getCoordinates()[0])
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    });
});
