const express = require('express');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');


// Routes 
const panelRoutes = require('./routes/panelRoutes');
const dbRoutes = require('./routes/dbRoutes');

const port = 3000;

// setting up views
app.set('view engine', 'ejs');
app.set('views', 'views');

require('./auth/googleAuth');
require('./auth/facebookAuth');
require('./auth/twitterAuth');


app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/db', dbRoutes);
app.use('/panel', panelRoutes);

const middleware = require('./routes/authUser.js');



app.get('/', middleware.checkLogged, (req, res) => res.render('login'));
app.get('/signup', middleware.checkLogged, (req, res) => res.render('signup'));



app.get('/authFailure', (req, res) => {
    res.send("Hello!! Auth Failed");
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));



app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/db/loginDone',
        failureRedirect: '/authFailure'
    }));




// Facebook Auth
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile','email'] }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/db/loginFacebook',
        failureRedirect: '/auth/failure'
    }));




app.get('/auth/twitter',(req,res,next)=>{
    console.log(req.body)
    next();
},
    passport.authenticate('twitter', { scope: ['user_friends', 'manage_pages'] }));
  
app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { 
        successRedirect: '/db/logintweet'
        ,failureRedirect: '/login' }));





app.listen(port, (err, res) => {
    console.log('Server is running on port ' + port);
});