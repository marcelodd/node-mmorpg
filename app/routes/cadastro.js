module.exports = function(app){
    app.get('/cadastro', app.controllers.cadastro.cadastro);

    app.post('/cadastrar', app.controllers.cadastro.cadastrar);
}