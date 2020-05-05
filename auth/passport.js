const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
//const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./passportConfiguration');

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret,
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done, next) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    done(null,
      {
        idGoogle: profile.id,
        Mail: profile.emails.value,
        Nombre: profile.name.givenName,
        Apellido: profile.name.familyName,
      }
    );
  } catch (error) {
    done(error, false);
  }
}));
