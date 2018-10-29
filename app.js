// PACKAGES SETUP:
var express = require('express');
var bodyParser = require('body-parser')

// ROUTERS (CONTROLLERS) SETUP
var indexRouter = require('./controllers/indexController');
// var usersRouter = require('./controllers/usersRouter');
var incubadorasRouter = require('./controllers/incubadorasController');
// var recemNascidosRouter = require('./controllers/recemNascidosRouter');

const app = express();

// VIEW ENGINE SETUP
app.set('views','./views');
app.set('view engine','ejs');

// EXPRESS SETUP
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/', indexRouter);
// app.use('/users',usersRouter);
app.use('/incubadoras',incubadorasRouter);
// app.use('/recemNascidos',recemNascidosRouter);

module.exports = app;