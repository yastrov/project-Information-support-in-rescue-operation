const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./db'); // Подключение к базе данных PostgreSQL

const app = express();

// Парсинг JSON
app.use(bodyParser.json());

// Указываем Express, что шаблоны EJS находятся в папке 'views'
app.set('views', path.join(__dirname, 'views'));
// Устанавливаем шаблонизатор EJS
app.set('view engine', 'ejs');

// Указываем Express обслуживать статические файлы из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    pool.query('SELECT status, description, latitude, longitude, time_user FROM userCard', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).send('Произошла ошибка при получении данных.');
        }
        const data = results.rows;
        res.render('index', { data }); // Рендерим шаблон с данными из базы данных
    });
});

// Маршрут для получения данных в формате JSON
app.get('/getData', (req, res) => {
    pool.query('SELECT status, description, latitude, longitude, time_user FROM userCard', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ success: false, message: 'Произошла ошибка при получении данных.' });
        }
        const data = results.rows;
        res.json(data); // Отправляем данные в формате JSON
    });
});

// Маршрут для получения данных в формате JSON из таблицы noteareas
app.get('/getNoteAreasData', (req, res) => {
    pool.query('SELECT area_top1x, area_top1y, area_top2x, area_top2y, area_top3x, area_top3y, area_top4x, area_top4y, area_top5x, area_top5y, area_centerx, area_centery, area_text FROM noteareas', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return res.status(500).json({ success: false, message: 'Произошла ошибка при получении данных.' });
        }
        const data = results.rows;
        res.json(data); // Отправляем данные в формате JSON
    });
});


// Маршрут для обработки POST-запроса на добавление данных
app.post('/addData', (req, res) => {
    const { status, description, latitude, longitude, time_user } = req.body;
    // Добавляем данные в базу данных
    pool.query('INSERT INTO public.userCard (status, description, latitude, longitude, time_user) VALUES ($1, $2, $3, $4, $5) RETURNING *', [status, description, latitude, longitude, time_user], (error, result) => {
        if (error) {
            console.error('Ошибка выполнения запроса:', error);
            res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении данных.' });
        } else {
            console.log('Данные успешно добавлены в базу данных.');
            const newData = result.rows[0]; // Получаем добавленные данные из результата запроса
            res.status(200).json({ success: true, message: 'Данные успешно добавлены в базу данных.', newData });
        }
    });
});

// Маршрут для обработки POST-запроса на добавление данных
app.post('/addDataNoteAreas', (req, res) => {
    const { area_top1X, area_top1Y, area_top2X, area_top2Y, area_top3X, area_top3Y, area_top4X, area_top4Y, area_top5X, area_top5Y, area_centerX, area_centerY, area_text } = req.body;

    // Добавляем данные в таблицу noteareas
    pool.query('INSERT INTO noteareas (area_top1x, area_top1y, area_top2x, area_top2y, area_top3x, area_top3y, area_top4x, area_top4y, area_top5x, area_top5y, area_centerx, area_centery, area_text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', [area_top1X, area_top1Y, area_top2X, area_top2Y, area_top3X, area_top3Y, area_top4X, area_top4Y, area_top5X, area_top5Y, area_centerX, area_centerY, area_text], (error, result) => {
        if (error) {
            console.error('Ошибка выполнения запроса:', error);
            res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении данных.' });
        } else {
            console.log('Данные успешно добавлены в базу данных.');
            const newData = result.rows[0]; // Получаем добавленные данные из результата запроса
            res.status(200).json({ success: true, message: 'Данные успешно добавлены в базу данных.', newData });
        }
    });
});

// Порт, на котором будет запущен сервер
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
