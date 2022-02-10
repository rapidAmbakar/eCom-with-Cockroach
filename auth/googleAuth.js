const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;


GOOGLE_CLIENT_ID = '307537222135-02nfuclngh3klulrljpunqdq4d83kr41.apps.googleusercontent.com'
GOOGLE_CLIENT_SERCET = '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'

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SERCET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        /*
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
        */
        return done(null, profile)
    }
));

passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});