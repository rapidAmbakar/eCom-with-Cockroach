const express = require('express');
const router = express.Router();
const Cookie = require('js-cookie');
const jwt = require('jsonwebtoken');

const middleware = require('./authUser.js');
const panel = require('../controllers/panelController')

function getJWT(user) {
    return jwt.sign(user, 'cat');
}


router.get('/admin', middleware.userCheck, panel.admin);
router.get('/customer', middleware.userCheck, panel.customer);



module.exports = router;