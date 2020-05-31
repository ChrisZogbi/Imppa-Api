import express from 'express';
import { json } from 'body-parser';
import passport from 'passport';
import route from './routes/index';
import passportAuth from './auth/passport'
import { sequelize } from './services';

var app = express();
var port = process.env.PORT || 3000;

app.use(json());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
route(app, passport);

// sequelize.sync({ force: true }).then(() => {
//     console.log('Server is running in ' + port);
//   });

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(port, function () {
    console.log('Server is running in ' + port);
});




