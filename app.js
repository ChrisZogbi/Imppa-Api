import express from 'express';
import { json } from 'body-parser';
import passport from 'passport';
import route from './routes/index';
import passportAuth from './auth/passport'

var app = express();
var port=process.env.PORT || 3000;

app.use(json());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
route(app, passport);

var server = app.listen(port, function () {
    console.log('Server is running in ' + port);
});

