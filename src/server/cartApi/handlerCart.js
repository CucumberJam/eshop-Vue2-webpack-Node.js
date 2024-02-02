import fs from 'fs';
import * as cart from './cartAct.js';
import logger from '../db/logStatics.js';

/**
 * обновили словарь
 * @type {{add: *, change: *, remove: *}}
 */
const actions = {
    add:  cart.add,
    change: cart.change,
    del: cart.remove
}

/**
 * подключили логгер
 * @param req
 * @param res
 * @param action
 * @param file
 */
export default function(req, res, action, file){
    console.log(req.body);
    fs.readFile(file, 'utf-8', (err, data) => {
       if(err){
           res.sendStatus(404).json({result: 0, text: err});
       } else{
           const {id, name, newCart} = actions[action](JSON.parse(data), req);
           fs.writeFile(file, newCart, err => {
               if(err){
                   res.sendStatus(404).json({result: 0, text: err});
               }else{
                   logger(id, name, action);
                   res.json({result: 1});
               }
           });
       }
    });
}