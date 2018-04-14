const {WeatherDetails} = require("../models");

module.exports = {
	
	async getByZipCode(req,res){
		try{
			const details = await WeatherDetails.findAll({
				where:{
					zipCode: req.params.zipcode
				}
			})

			if(!details.length){
				return res.status(403).send({
					error : "Database doesn't have this entry. Try another Location"
				})
			}
			res.status(200).send(details)
			
		}catch(err){
			res.status(500).send({
				error:"An error occurred while fetching details."
			})
		}
	},
	async post(req,res){
		try{
			const wt =  await WeatherDetails.create(req.body)
			
			res.send(wt.toJSON());
		}catch(err){
			res.status(400).send({
				error:"details are already in the database"
			})
		}
	},
	async getAllDetails(req,res){
		try{
			
			const details = await WeatherDetails.findAll({
				where:{
					
				}
			})

			if(!details){
				return res.status(403).send({
					error : "Database is Empty."
				})
			}
			
			res.send(details);
		}catch(err){
			
			res.status(500).send({
				error:"An error occurred while fetching all weather details."
			})
		}
	},
	async getByIndex(req,res){
		try{
			console.log(req.params.id)
			const details = await WeatherDetails.findAll({
				where:{
					id: req.params.id
				}
			})
			
			if(!details.length){
				return res.status(403).send({
					error : "Database doesn't have this entry. Try another Location"
				})
			}
			res.status(200).send(details)
			
		}catch(err){
			res.status(500).send({
				error:"An error occurred while fetching details."
			})
		}
	}

}