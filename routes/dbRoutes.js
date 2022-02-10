const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController')


//const middleware = require('./middlewares/authUser');


router.get('/', db.check);

router.post('/login', db.checkLogin);


router.post('/signup', db.signUp);

router.get('/loginDone', db.checkGoogle);

router.get('/loginFacebook', db.checkFacebook);

router.get('/logintweet',(req,res)=>{
    res.send(req.user)
});


router.get('/logout', db.logout);

router.get('/register_product', db.registerProduct);
router.post('/register_product', db.createProduct);

router.get('/register_user', db.registerUser);
router.post('/register_user', db.createUser);

router.post('/edusers', db.edusers);
router.post('/edproduct', db.edproduct);

module.exports = router;