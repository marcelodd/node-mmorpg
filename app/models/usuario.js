const mongoose = require('mongoose');

module.exports = function (app) {
    /**
     * Usuario Schema
     */

    const UsuarioSchema = new mongoose.Schema({
        nome: {type: String, default: '', trim: true},
        usuario: {type: String, default: '', trim: true},
        senha: {type: String, default: '', trim: true},
        casa: {type: String, default: '', trim: true},
        createdAt: {type: Date, default: Date.now}
    });

    /**
     * Validations
     */

    UsuarioSchema.path('nome').required(true, 'Usuário nome não pode ser vazio');
    UsuarioSchema.path('usuario').required(true, 'Usuário usuario não pode ser vazio');
    UsuarioSchema.path('senha').required(true, 'Usuário senha não pode ser vazio');
    UsuarioSchema.path('casa').required(true, 'Usuário casa não pode ser vazio');

    /**
     * Methods
     * */

    UsuarioSchema.methods.getJogo = function () {
        return new Promise((resolve, reject) => {
            app.models.jogo.findOne({usuario: this._id})
                .then((jogo) => {
                    resolve(jogo);
                }, function (err) {
                    reject(err);
                })
        });
    };

    return mongoose.model('Usuario', UsuarioSchema);
};