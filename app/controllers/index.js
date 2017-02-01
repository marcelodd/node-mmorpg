module.exports = function (app) {
    this.home = function (req, res) {
        res.render('index', {validacao: {}, formulario: {}});
    };

    this.autenticar = function (req, res) {
        var dados = req.body;

        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.render('index', {validacao: erros, formulario: dados});
            return;
        }

        var Usuario = app.models.usuario;

        Usuario.findOne({usuario: dados.usuario}) //'nome usuario senha casa'
            .then((usuario) => {
                if (usuario) {
                    if (usuario.senha === dados.senha) {
                        req.session.autorizado = true;
                        req.session.user = {
                            id: usuario._id,
                            usuario: usuario.usuario,
                            casa: usuario.casa
                        };

                        /*usuario.getJogo().then((jogo) => {
                            res.render('jogo', {img_casa: usuario.casa, jogo: jogo});
                        }, function (err) {
                            console.log('Error', err);
                        });*/

                        res.redirect('jogo');

                    } else {
                        res.render('index', {validacao: [{msg: 'Senha inválida'}], formulario: dados});
                    }
                } else {
                    res.render('index', {validacao: [{msg: 'Usuário não encontrado'}], formulario: dados});
                }
            }, function () {

            });
    };
    return this;
};