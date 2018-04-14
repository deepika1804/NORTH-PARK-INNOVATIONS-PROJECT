import Api from '@/services/Api'

export default{
	data(){
		return{
			weatherData:null
		}
	},
	getWeatherDetails(zipcode){
		return Api().get('/weatherDetails/'+ zipcode)
	},
	getAllDetails(){
		return Api().get('/weatherDetails/')
	},
	getDetailsById(index){
		return Api().get('/weatherDetail/'+index)
	},
	getSavedDetails(){
		return this.weatherData
	},
	setAllDetails(data){
		this.weatherData = data
	}
}

