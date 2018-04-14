module.exports = {
	port:process.env.PORT || 8081,
	db:{
		database:process.env.DB_NAME || "weatherApp",
		user:process.env.DB_USER || "weatherApp",
		password:process.env.DB_PASS || "weatherApp",
		options:{
			dialect: process.env.DIALECT || 'sqlite',
			host:process.env.HOST || 'localhost',
			storage:'./weatherApp.sqlite'
		},
		authentication:{
			jwtSecret : process.env.JWT_SECRET || "secret"
		}
	}
}