const mongoose = require('mongoose');

module.exports = (app) =>  {
    var Schema = mongoose.Schema;
    /**
     * Jogo Schema
     */

    const JogoSchema = new Schema({
        usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        moeda: {type: Number, default: 15},
        suditos: {type: Number, default: 10},
        temor: {type: Number, default: Math.floor(Math.random() * 1000)},
        sabedoria: {type: Number, default: Math.floor(Math.random() * 1000)},
        comercio: {type: Number, default: Math.floor(Math.random() * 1000)},
        magia: {type: Number, default: Math.floor(Math.random() * 1000)}
    });

    return mongoose.model('Jogo', JogoSchema);
};