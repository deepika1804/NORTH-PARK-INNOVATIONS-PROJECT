
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user,options){
	const SALT_FACTOR = 8
	if(!user.changed('password')){
		return;
	}else{
		// return bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashSync(user.password,salt)).then(hash => {
		// 	user.setDataValue('password',hash);
		// })
		bcrypt.hash(user.password, null, null, function(err, hash) {
			console.log("storing value to DB ",user.password , hash)
		  // Store hash in your password DB.
		  user.setDataValue('password',hash);
		  //user.password = hash;
		});
	}
}


module.exports = (sequelize,DataTypes) =>{

	const User = sequelize.define('User',{
		username:{
			type : DataTypes.STRING,
			unique: true 
		},
		password :{
			type:DataTypes.STRING
		}
	}
	,{
		hooks :{
			beforeCreate : hashPassword
			
		}
	});

	User.sync().then(() => {
		  User.create({
		    username: 'a',
		    password: 'a'
		  }).then(function(user) {
				    
				    console.log('User Created to database');
				})
				.catch(function(err) {
				    
				});
		  User.create({
		    username: 'rick',
		    password: 'rick2018'
		  }).then(function(user) {
				    
				    console.log('User Created to database');
				})
				.catch(function(err) {
				    
				});
		  User.create({
		    username: 'nick',
		    password: 'nick2018'
		  }).then(function(user) {
				    
				    console.log('User Created to database');
				})
				.catch(function(err) {
				    
				});
		  User.create({
		    username: 'paul',
		    password: 'paul2018'
		  }).then(function(user) {
				    
				    console.log('User Created to database');
				})
				.catch(function(err) {
				    
				});
		  
	});
	User.prototype.comparePassword = function (password,hash) {
		console.log("check password ",password,hash)
		bcrypt.compare(password, hash).then(isValid => {
			console.log("check valid",isValid)
		});
	}
	return User;
}
	

