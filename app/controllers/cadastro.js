module.exports = function (app) {
    this.cadastro = function (req, res) {
        res.render('cadastro', {validacao: {}, formulario: {}});
    };

    this.cadastrar = function (req, res) {
        var dados = req.body;

        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio').notEmpty();
        req.assert('casa', 'Casa não pode ser vazio').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.render('cadastro', {validacao: erros, formulario: dados});
            return;
        }

        var Usuario = new app.models.usuario(dados);
        Usuario.save().then(function (result) {
            if (result.errors)
                res.render('cadastro', {validacao: err, formulario: dados});
            else
                createNewGame(result);
        }, function (err) {
            console.log(err);
        });
    };

    function createNewGame(usuario) {
        var Jogo = new app.models.jogo({usuario: usuario._id});
        Jogo.save()
            .then(function (result) {
                console.log(result);
            }, function (err) {
                console.log(err);
            });
    }

    return this;
};

