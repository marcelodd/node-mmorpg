/* importar o módulo do framework express */
const express = require('express');

/* importar o módulo do consign */
const consign = require('consign');

/* importar o módulo do body-parser */
const bodyParser = require('body-parser');

/* importar o módulo do express-validator */
const expressValidator = require('express-validator');

/* importar o módulo do express-session*/
const session = require('express-session');

/* iniciar o objeto do express */
const app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-validator */
app.use(session({
    secret: 'keyboard cat',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true}));


app.set('db', require('./connection'));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign({cwd: 'app',})
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

/* exportar o objeto app */
module.exports = app;