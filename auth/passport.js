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
        TipoUsuario: 2,
        Mail: profile.emails.value,
        AddedDate: "",
        LastLogin: "",
        Nombre: profile.name.givenName,
        Apellido: profile.name.familyName,
        Telefono1: "1231",
        Telefono2: "123123",
        Habilitado: "true",
        IdSubscripcion: null
      }
    );
  } catch (error) {
    done(error, false);
  }
}));
