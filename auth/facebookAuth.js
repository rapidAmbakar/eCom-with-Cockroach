const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

FACEBOOK_APP_ID = "895641217786491";
FACEBOOK_APP_SECRET = "2f8bf71f263912c6f55cd3f34be1b5f0";

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name'] 
    },
    function(accessToken, refreshToken, profile, cb) {
        /*User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            return cb(err, user);
        });*/
        return cb(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});