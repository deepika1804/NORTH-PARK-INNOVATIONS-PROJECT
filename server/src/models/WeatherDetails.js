
var json = require("../assets/data.json")


module.exports = (sequelize,DataTypes) =>{
	const Details = sequelize.define('WeatherDetails',{
		state:DataTypes.STRING,
		temperature :DataTypes.STRING,
		FeelsLike :DataTypes.STRING,
		zipCode :DataTypes.STRING,
		icon_url:DataTypes.STRING,
		latitude:DataTypes.STRING,
		longitude:DataTypes.STRING,
		city:DataTypes.STRING,
		country:DataTypes.STRING,
		observationTime:DataTypes.STRING,
		elevation:DataTypes.STRING,
		icon:DataTypes.STRING,
		dewPoint:DataTypes.STRING,
		relativeHumidity:DataTypes.STRING,
		temperatureString:DataTypes.STRING,
		visibilityKm:DataTypes.STRING,
		visibilityMi:DataTypes.STRING,
		windDir:DataTypes.STRING,
		windChill:DataTypes.STRING

	});
	Details.sync().then(() => {
		for(var i=0;i<json.length;i++){
			Details.create({
			    state:json[i].current_observation.display_location.state_name,
				temperature :json[i].current_observation.temp_f,
				FeelsLike :json[i].current_observation.feelslike_f,
				zipCode :json[i].current_observation.display_location.zip,
				latitude: json[i].current_observation.display_location.latitude,
				longitude:json[i].current_observation.display_location.longitude,
				icon_url:json[i].current_observation.icon_url,
				city:json[i].current_observation.display_location.city,
				country:json[i].current_observation.display_location.country,
				observationTime:json[i].current_observation.observation_time,
				elevation:json[i].current_observation.observation_location.elevation,
				icon:json[i].current_observation.icon,
				dewPoint:json[i].current_observation.dewpoint_string,
				relativeHumidity:json[i].current_observation.relative_humidity,
				temperatureString:json[i].current_observation.temperature_string,
				visibilityKm:json[i].current_observation.visibility_km,
				visibilityMi:json[i].current_observation.visibility_mi,
				windDir:json[i].current_observation.wind_dir,
				windChill:json[i].current_observation.windchill_string
			  }).then(function(details) {
				    
				})
				.catch(function(err) {
				    
				    console.log('error');
				});
		}
		  
		  
	});
	
	return Details;
}
	

