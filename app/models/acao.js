const mongoose = require('mongoose');

module.exports = function (app) {
    const AcaoSchema = new mongoose.Schema({
        usuario: {type: mongoose.Schema.ObjectId, ref: 'Usuario'},
        acao: {type: String, trim: true},
        quantidade: {type: Number},
        fim: {type: Date}
    });

    return mongoose.model('Acao', AcaoSchema);
};