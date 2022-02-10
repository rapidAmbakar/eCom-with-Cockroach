const jwt = require('jsonwebtoken');
const pdb = require('../database/postgres.js');




async function getData(table) {
    await pdb.connect();
    let result = await pdb.query(`Select * from ${table}`);
    //console.log(result);
    return result;
};




/*
module.exports.admin = function(req, res) {
    const jwtt = req.cookies.jwt;
    console.log(jwt.verify(jwtt, 'cat'));
    res.render('homepage');
}*/
module.exports.admin = async function(req, res) {
    let users = await getData('users');
    let products = await getData('product');

    let jwtt = req.cookies.jwt;
    jwtt = jwt.verify(jwtt, 'cat');


    res.render('profile', { userName: jwtt.fname, permissions: jwtt.role, title: 'Users', fields: users.fields, users: users.rows, pfields: products.fields, products: products.rows });
}



module.exports.customer = function(req, res) {
    const jwtt = req.cookies.jwt;

    console.log(jwt.verify(jwtt, 'cat'));
    res.render('customer');
}