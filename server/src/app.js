console.log("hello");
const express = require('express');
const bodyParser = require('body-parser'); //language to process json data easily
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');

const app = express();
app.use(morgan('combined'));//to use logs
app.use(bodyParser.json());
app.use(cors()); // allows other users to access data from website


app.get('/status',(req,res) => {
	res.send({
		message : "hello"
	});
});

require('./routes')(app); 
var val = true
// config.db.Users.destroy({
// 	where:{},
// 	truncate:true
// })

sequelize.sync({force:false}).then(() => {
	//app.listen(process.env.PORT || 8081); //server running on 8081
	val=false
	app.listen(config.port)
	console.log('Server Started on Port 8081 !'); 
});
