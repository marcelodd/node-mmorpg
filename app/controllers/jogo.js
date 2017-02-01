module.exports = function (app) {
    this.jogar = function (req, res) {
        if (!req.session.autorizado) {
            res.render('index', {validacao: [{msg: 'Usuário não autenticado'}], formulario: {}});
            return;
        }

        var comando_invalido = 'N';
        if (req.query.comando_invalido == 'S')
            comando_invalido = 'S';


        app.models.jogo.findOne({usuario: req.session.user.id})
            .then(function (jogo) {
                res.render('jogo', {img_casa: req.session.user.casa, jogo: jogo});
            });

    };

    this.sair = function (req, res) {
        req.session.destroy((err) => {
            res.render('index', {validacao: {}, formulario: {}});
        });
    };

    this.suditos = function (req, res) {
        res.render('aldeoes');
    };

    //https://docs.mongodb.com/manual/reference/operator/query/
    this.pergaminhos = function (req, res) {
        app.models.acao.find({usuario: req.session.user.id}).where('fim').gt(new Date().getTime()) // >
            .then((acoes) => {
                res.render('pergaminhos', {acoes: acoes});
            });
    };

    this.ordenarAcaoSudito = function (req, res) {
        var dados = req.body;

        req.assert('acao', 'Ação deve ser informada').notEmpty();
        req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.redirect('jogo?comando_invalido=S');
            return;
        }

        dados.usuario = req.session.user.id;

        switch (parseInt(dados.acao)) {
            case 1:
                dados.fim = new Date().getTime() + 1 * 60 * 60000;
                break;
            case 2:
                dados.fim = new Date().getTime() + 2 * 60 * 60000;
                break;
            case 3:
                dados.fim = new Date().getTime() + 5 * 60 * 60000;
                break;
            case 4:
                dados.fim = new Date().getTime() + 5 * 60 * 60000;
                break;
        }

        var Acao = new app.models.acao(dados);
        Acao.save().then(function (result) {

        });

        res.redirect('jogo');
    };
    return this;
};