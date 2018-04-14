const AuthenticationController = require("./controllers/AuthenticationController");
const weatherController = require("./controllers/weatherController");

module.exports = (app)=>{
	app.post('/login',
		AuthenticationController.login)
	app.post('/register',
		AuthenticationController.register)
	app.get('/weatherDetails/:zipcode',
		weatherController.getByZipCode)
	app.post('/weatherDetails',
		weatherController.post)
	app.get('/weatherDetails',
		weatherController.getAllDetails)
	app.get('/weatherDetail/:id',
		weatherController.getByIndex)
}