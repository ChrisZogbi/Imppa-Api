import express from 'express';
var app = express();
import { json } from 'body-parser';
import { assignRoutes } from './routes/index';
import db from './services/index';
var port=process.env.PORT || 3000;

app.use(json());
assignRoutes(app);


var server = app.listen(port, function () {
    console.log('Server is running in ' + port);
});

