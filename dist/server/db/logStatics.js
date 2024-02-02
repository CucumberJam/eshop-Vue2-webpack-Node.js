import moment  from 'moment';
import path from 'path';
import { appendFile } from 'node:fs';
import __dirname from "../../__dirname.js";

const pathStat = path.join(__dirname, '/server/db/stats.txt');
console.log(pathStat);
export default async function(id_product, name_product, action){
    const data =
        `id: ${id_product}, name: ${name_product}, status: ${action}, ` +
        `date: ${moment().format('DD MMM YYYY, h:mm:ss a').toString()}`;

    console.log(data);

    appendFile(pathStat, data + '\n', 'utf8', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
}