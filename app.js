import express from 'express';
var app = express();
import { json } from 'body-parser';
import { assignRoutes } from './routes/index';
import db from './services/index';
import passport from 'passport';
import route from './routes/index';
var port=process.env.PORT || 3000;

app.use(json());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
route(app, passport);

var server = app.listen(port, function () {
    console.log('Server is running in ' + port);
});

