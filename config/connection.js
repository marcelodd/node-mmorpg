var mongodb = require('mongodb');

module.exports = function(){
    console.log('Conectado');
    var db = mongodb.Db(
        'got',
        new mongodb.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );

    return db;
};