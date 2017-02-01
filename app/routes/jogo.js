module.exports = function(app){
    app.get('/jogo', app.controllers.jogo.jogar);
    app.get('/sair', app.controllers.jogo.sair);
    app.get('/suditos', app.controllers.jogo.suditos);
    app.get('/pergaminhos', app.controllers.jogo.pergaminhos);
    app.post('/ordenar_acao_sudito', app.controllers.jogo.ordenarAcaoSudito);
};