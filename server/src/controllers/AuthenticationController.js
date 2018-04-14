const {User} = require("../models");
const jwt = require("jsonwebtoken");
console.log("User IS",User)
function jwtSignUser(user){
	console.log(user)
	const oneWeek = 3600*24*7

	return jwt.sign(user,config.authentication.jwtSecret,{
		expiresIn:oneWeek
	})
}



module.exports = {
	async register(req,res){
		
		try{
			console.log(User)
			const user = await User.create(req.body)
			res.send(user.toJSON());
		}catch(err){
			res.status(400).send({
				error:"Email Already in use."
			})
		}
	},
	async login(req,res){
		
		try{
			const {username,password} = req.body;
			console.log(username)
			const user = await User.findOne({
				where:{
					username: username
				}
			})
			if(!user){
				return res.status(403).send({
					error : "The login information was incorrect."
				})
			}
			//const isPasswordValid = await user.comparePassword(password,user.password);
			const isPasswordValid = password == user.password;
			console.log("is password valid > ",isPasswordValid);
			if(!isPasswordValid){
				return res.status(403).send({
					error : "The Password entered is incorrect."
				})
			}
			const userJson = user.toJSON()
			
			
			res.send({
				user : userJson
			});
		}catch(err){
			res.status(500).send({
				error:"An error occurred while login."
			})
		}
	}
}