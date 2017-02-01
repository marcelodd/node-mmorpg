/* importar as configurações do servidor */
var app = require('./config/server');
const mongoose = require('mongoose');

mongoose.set('debug', true);

connect()
    .on('error', console.log)
    .on('connected', () => {
        console.log('Mongoose conectado');
    })
    //.on('disconnected', connect)
    .once('open', listen);

/*process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose desconectado pelo termino da aplicação');

        process.on('exit', (code) => {
            console.log(`Teste ${code}`);
        });
    });
});*/

function listen() {
    /* parametrizar a porta de escuta */
    app.listen(3000, () => {
        console.log('Servidor online');
    });
}

function connect() {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    return mongoose.connect('mongodb://localhost/got', options).connection;
}