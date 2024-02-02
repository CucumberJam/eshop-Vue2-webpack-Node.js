// Добавление нового товара в корзине - method POST:
export const add = (cart, req) =>{
    cart.contents.push(req.body);
    return {id: req.body.id_product, name: req.body.product_name, newCart: JSON.stringify(cart, null, 4)};
}

// Изменяем количество товара - method PUT:
export const change = (cart, req)=>{
    const found = cart.contents.find(el => el.id_product === +req.params.id);  // ищем товар по id
    found.quantity += req.body.quantity; // изменяем количество
    return {id: found.id_product, name: found.product_name, newCart: JSON.stringify(cart, null, 4)};
}

//  Удаление товара из корзины
export const remove = (cart, req)=>{
    const found = cart.contents.find(el => el.id_product === +req.params.id);  // ищем товар по id
    cart.contents.splice(cart.contents.indexOf(found), 1); // удаляем товар из корзины
    return {id: found.id_product, name: found.product_name, newCart: JSON.stringify(cart, null, 4)};
}

