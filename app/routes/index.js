module.exports = function(app){
	app.get('/', app.controllers.index.home);

	app.post('/autenticar', app.controllers.index.autenticar);
};