<template>
<v-container fluid fill-height v-if="dialog">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 >
            <v-card class="elevation-12">
           
              <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="50%">
                
                <v-card>
                  <v-card-title class="headline">{{ title || 'null' }}</v-card-title>
                        <v-flex px-4 pb-4 md-4 pt-2> 
                          <input type="radio" v-model="location" value="current" class="mb-4" />  Current Location
                          <v-spacer></v-spacer>
                          <input type="radio" v-model="location" value="specify"  />  Specify Another Location
                          <div v-if="location === 'specify'">
                            <v-text-field
                              label="Zip Code"
                              type="number"
                              v-model="zipcode"
                              pattern="[0-9]*"
                              required
                            ></v-text-field>
                          </div>
                          <br>
                          <div class="error" v-html="error" />
                          <br>
                          <v-card-actions>
                            <v-btn color="teal darken-1" flat @click="cancel" :disabled="!enable"
                            >Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="teal darken-1" flat @click="enter"
                          :disabled="valid">Enter</v-btn>
                          </v-card-actions>
                        </v-flex>
                </v-card>
              </v-dialog>
            </v-layout>

            </v-card>
          </v-flex>
         
        </v-layout>
      </v-container>

<v-container fluid grid-list-md v-else-if="!dialog">
       <v-layout >
        <v-card class="elevation-12"  width="100%" height="650px">
            <v-toolbar extended>
                <span class="ft-sm">Elv {{ locationInfo.elevation }}   {{locationInfo.Latitude}}'N   {{locationInfo.Longitude}}'W</span>
                <v-toolbar-title class="ft-lg" slot="extension">{{locationInfo.city}},{{locationInfo.state}},{{locationInfo.country}} ,{{zipcode}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal darken-1" flat @click="changeLoc">Change Location</v-btn>
                </v-card-actions>
            </v-toolbar>
            <div class="flex-width-parent">
            <v-flex class="flex-width">
              <v-card justify-center align-center>
  
                <v-card-title primary-title>
                  <div class="ft-wd">
                    <div class="ft-sm"> Time : {{locationInfo.observationTime}} </div> 
                    <vue-circle
                      :progress="locationInfo.temp * 2"
                      :size="200"
                      :reverse="false"
                      line-cap="round"
                      :fill="fill"
                      empty-fill="rgba(0, 0, 0, .1)"
                      :animation-start-value="0.0"
                      :start-angle="180"
                      insert-mode="append"
                      :thickness="10"
                      :show-percent="false"
                      >
                        <p>{{locationInfo.temp}} 'F</p>
                        <p>Feels Like {{locationInfo.feelsLike}} 'F</p>
                        <img v-bind:src=locationInfo.icon_url>
                        <p align-right>{{locationInfo.icon}}</p>
                    </vue-circle>
                    
                    
                  </div>
                  
                </v-card-title>
                <v-card-text py-2 mt-5 class="ft-md">

                  <div> <span> Dew Point</span> : {{locationInfo.dewPoint}}</div>
                  <div>  <span>Temperature</span> : {{locationInfo.temperatureString}}</div>
                  <div>  <span> Relative Humidity</span> : {{locationInfo.relativeHumidity}}</div>
                  <div> <span> Visibility in Kms</span> : {{locationInfo.visibilityKm}}</div>
                  <div> <span>  Visibility in Miles</span> : {{locationInfo.visibilityMi}}</div>
                  <div>  <span> Wind Direction</span> : {{locationInfo.windDir}}</div>
                  <div>  <span> Wind Chill</span> : {{locationInfo.windChill}}</div>
                  
            
                </v-card-text>
              </v-card>
              <v-spacer></v-spacer>
              
            </v-flex>
            <v-flex class="flex-width">
              <v-card>
                
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Location on Map</h3>
                    <div style="width:500px;height:374px;">
                      <img v-bind:src=img_source>
                     </div>
                  </div>
                </v-card-title>
                
              </v-card>
            </v-flex>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal text-xs-center pa-1" 
                @click="Proceed"
                >Proceed</v-btn>
            </v-card-actions>

        </v-card>



         
        </v-layout>
</v-container>



</template>
<script>

import axios from 'axios'
import weatherService from '@/services/weatherService'
export default {
    data () {
      return {
        title: 'Choose a Location ',
        location: "current",
        dialog: true,
        valid: false,
        error:null,
        zipcode:"14201",
        lastInfo : null,
        enable:false,
        prop_map:"",
        fill : { gradient: ["red", "green", "blue"] },
        img_source:"",
        locationInfo:{
          elevation:null,
          Latitude:null,
          Longitude:null,
          high:null,
          low:null,
          icon_url:null,
          icon:null,
          temp:null,
          feelsLike:null,
          observationTime:null,
          state:null,
          country:null,
          city:null,
          dewPoint:null,
          relativeHumidity:null,
          temperatureString:null,
          visibilityKm:null,
          visibilityMi:null,
          windDir:null,
          windChill:null

        }
      }
    },
    watch:{
      location(value){
        this.zipcode=null
        if(value == "specify"){
          this.valid = true
        }else{
          this.valid = false
          
        }
        this.error=null
      },
      zipcode(value){
      if(this.location == "specify"){
        if(value!=null && value.length){
          this.valid=false
        }else{
          this.valid = true
        }
      }else{
        this.valid=false
        
      }
      }
    },
    mounted:function(){
        if(this.checkState()) {
          
          this.geolocation()
        }
        this.$store.dispatch('setHiddenState',true)
    },
    methods:{
      checkState(){
        if(!(this.$store.getters.getUserLoginState)){
          this.$router.replace('/login')
          
        }
        return true
      },
      getPostalCode : function(position) {

        axios.post('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true').then(function (response) {
          var addresses = response.results;
          for(var i=0;i<addresses.length;i++){
            if(addresses[i].types[0]=="postal_code"){
              var postal=addresses[i]['address_components'][0]['long_name']; 
              if(postal.length > 3){
                this.zipcode = postal
              }
            }
          }
        })
        .catch(function (error) {
          this.error = "Couldn't find current location"
        })

       
      },
      
      
      err:function(){
        
      },
      geolocation : function() {
        var options = {
          enableHighAccuracy: true,
          timeout: 500,
          maximumAge: 0
        };
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getPostalCode,this.err,options)
        } 
        this.error = ("Making a query to get Current location. Timeout is "+options.timeout + "ms")
      },
      cancel(){
        this.dialog = false;
      },
      
      async enter(){
      
       try{
          if(this.zipcode == null) this.zipcode = "14201"
          const data = await weatherService.getWeatherDetails(this.zipcode)
          if(data.length == 0){
            this.error = "Data for zip code not available"
          }else{
            
            var locationData = data.data[0]
            this.dialog = false
            this.error = null
            
            this.locationInfo.elevation = locationData.elevation

            this.locationInfo.Latitude = parseInt(locationData.latitude).toFixed(2)
            this.locationInfo.Longitude = parseInt(locationData.longitude).toFixed(2)
           
            this.locationInfo.icon_url = locationData.icon_url
            this.locationInfo.icon = locationData.icon
            this.locationInfo.temp = parseInt(locationData.temperature)
            this.locationInfo.feelsLike = locationData.FeelsLike
            this.locationInfo.observationTime = locationData.observationTime
            this.locationInfo.city = locationData.city
            this.locationInfo.state = locationData.state
            this.locationInfo.country = locationData.country
           
            this.locationInfo.dewPoint = locationData.dewPoint,
            this.locationInfo.relativeHumidity = locationData.relativeHumidity,
            this.locationInfo.temperatureString =locationData.temperatureString,
            this.locationInfo.visibilityKm = locationData.visibilityKm,
            this.locationInfo.visibilityMi = locationData.visibilityMi,
            this.locationInfo.windDir = locationData.windDir,
            this.locationInfo.windChill = locationData.windChill
            this.lastInfo = this.locationInfo
            this.img_source = "https://maps.googleapis.com/maps/api/staticmap?center=" + locationData.latitude + "," + locationData.longitude + "&zoom=13&size=350x350&sensor=false"
          }

        }catch(error){
          this.dialog=true
          this.error = error.response.data.error
        }
        
      },
      changeLoc(){
        this.error = null
        this.dialog=true
        this.enable = true
        this.locationInfo = this.lastInfo
        this.location = "current"
        this.valid = false
      },
      async Proceed(){
        const data = await weatherService.getAllDetails()
        if(data.data.length){

          weatherService.setAllDetails(data.data)
          this.$router.replace('/Screen3')
        }
        
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  font-size:16px;
}
input{
  padding:10px;

}
.overlay--active{
  opacity:0.2 !important;
}
.headline{
  text-align:center;
}
.ft-sm{
  font-size:1em;
  font-weight:bold;
}
.ft-md{
  font-size:1em;
  text-align:left;
  font-weight:300;
}
.ft-md span{
  font-weight:bold;
  padding-left:1em;
  padding-right:2em;
  width: 35%;
  display: inline-block;

}
.ft-wd{
  width:100%;
}
.ft-lg{
  font-size:2.5em;
}
.error{
  background-color:transparent !important;
  color:darkred ;
  padding-top:10px;

}
.flex-width{
  width:50%;
  display: inline-block;
    float: left;
}
.flex-width-parent{
  width:100%;
  display: block;
  overflow:hidden;
}
</style>
