import express from 'express';
import fs from 'fs';
import handler from '../cartApi/handlerCart.js';
import path from 'path';
import __dirname from "../../__dirname.js";

const cartRouter = express.Router();
export default cartRouter;

//Path:
const dbCart = path.join(__dirname, '/server/db/userCart.json');
console.log(dbCart);

/**
 * API Корзины
 */
// Получение товаров в корзине - method GET:
cartRouter.get('/', (req, res)=>{
    fs.readFile(dbCart, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404).json({result: 0, text: err});
        } else{
            res.send(data);
        }
    });
});

// Добавление нового товара в корзине - method POST:
cartRouter.post('/', (req, res) => {
    handler(req, res, 'add', dbCart);
});

// Изменяем количество товара - method PUT:
cartRouter.put('/:id', (req, res) => {
    handler(req, res, 'change', dbCart);
});

//  Удаление товара из корзины - method DELETE:
cartRouter.delete('/:id', (req, res) => {
    handler(req, res, 'del', dbCart);
});