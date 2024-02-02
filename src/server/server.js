import express from 'express';
import fs from 'fs';
import cartRouter from './routers/cartRouter.js';
import path from 'path';
import __dirname from "../__dirname.js"

let app = express();

//Paths:
const pathProducts = '/api/products';
const pathCart = '/api/cart';

const dbProducts = path.resolve(__dirname, 'server/db/products.json');
const publicPath = path.resolve(__dirname, "public/index.html");
/**
 * Активируем мидлвары
 */
// Получение и ОТПРАВКА json
// устанавливаем автоматически парсинг тела запроса в json
app.use(express.json());

// запросы в корень нашего сайт отдают содержимое public
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.use('/main.js', express.static(path.resolve(__dirname, 'public/main.js')));

app.use(pathCart, cartRouter);

app.get('/', function(request, response){
    response.sendFile(publicPath);
});

/**
 * API Каталога
 */
app.get(pathProducts, (req, res)=>{
    fs.readFile(dbProducts, 'utf-8', (err, data)=>{
        if(err){
            res.sendStatus(404).json({result: 0, text: err});
        }else {
            res.send(data);
        }
    });
});

app.use(function(req, res) {
    res.status(404).send('not found');
});

/**
 * Запуск сервера
 * @type {string|number}
 */
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Running server on: http://localhost:${port}`);
});
