/*

API KEY = bI2cBL58YESWA6956QBghaJ2a;
API_SECRET = NyzUYqQiQoKkyQy8xr7I533umRbFDKMADs7nZPJvX65DqMRxLq;
BEARER_TOKEN = AAAAAAAAAAAAAAAAAAAAALbVYwEAAAAAX27Gvt%2Fm%2BBoSdXbntocs9oJO4uc%3DeDJXHHQrN5CeSXfnoiWuJih6JAl88TCBVQhMe6z6VylGoP0Oib;


ClientID = cC12RTFWem9qMzZNenBRakNmQ2Q6MTpjaQ;
Client Server = paVH-IwBGtx4GWu_brRNNY6XqC1OSzIQO5b3VhIzCeP-TIH0jH;
*/


const passport = require('passport');
const TwitterStrategy = require('passport-twitter-oauth2').Strategy;





const TWITTER_CONSUMER_KEY = "cC12RTFWem9qMzZNenBRakNmQ2Q6MTpjaQ";
const TWITTER_CONSUMER_SECRET = "GM9BjGlusriEBMugdHrD3wjAhsNWKhglYIVYx1OE2OXd3n8oZo";


passport.use(new TwitterStrategy({
  clientID: TWITTER_CONSUMER_KEY,
  clientSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    /*User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
    console.log('me yaha hu');
    return cb(null,profile);
  }
));

passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});