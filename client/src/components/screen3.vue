<template>
<v-container fluid fill-height style="height: 50%" >
        <v-layout align-center justify-center >
         
          <v-flex>

            <v-card class="elevation-12" >
              <v-card-text>
                <v-card-title  class="headline justify-center">
                    {{title}}
                </v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                      class="search-bar right pb-4"
                      append-icon="search"
                      label="Search by City, State, ZipCode, Temperature"
                      single-line
                      hide-details
                      v-model="search">
                      </v-text-field>
                  
                           
                    <v-data-table align-center
                      :headers="headers"
                      :items="list"
                      :search="search"
                      :rows-per-page-items="[5,10]"
                      class="elevation-1">
                    
                        <template slot="items" slot-scope="props"  >
                        <tr @click="getData(props.item.id)">
                          <td>{{ props.item.id }}</td>
                          <td class="text-xs-right">{{ props.item.city }}</td>
                          <td class="text-xs-right">{{ props.item.state }}</td>
                          <td class="text-xs-right">{{ props.item.temperature }}</td>
                          <td class="text-xs-right">{{ props.item.zipCode }}</td>
                          <td class="text-xs-right">{{ props.item.country }}</td>
                        </tr> 
                        </template>
                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                      </v-alert>
                    </v-data-table>

               
              </v-card-text>
            </v-card>
            
            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="60%">
                
               
                
                <v-card>
                <v-card-title class="headline elevation-12">{{locationInfo.city}},{{locationInfo.state}},{{locationInfo.country}} ,{{locationInfo.zipCode}}</v-card-title>
                  <div class="flex-width-parent">
            <v-flex class="flex-width">
              <v-card justify-center align-center>
                
                <v-card-title primary-title>
                  <div class="ft-wd">
                    <div class="ft-sm"> Time : {{locationInfo.observationTime}} </div> 
                    <vue-circle
                      :progress="locationInfo.temp || 50"
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
                      @vue-circle-progress="progress"
        @vue-circle-end="progress_end"
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
                  </v-card-actions>
              </v-card>
              <v-spacer></v-spacer>
              
            </v-flex>
            
            </div>
                  
                </v-card>
              </v-dialog>
            </v-layout>

          </v-flex>

        </v-layout>
      </v-container>
</template>

<script>
import weatherService from '@/services/weatherService'
export default {
    data () {
      return {
        dialog :false,
        pagination: {
            sortBy: 'id'
        },
        search: '',
        title: 'Weather List | Filter Screen ',
        list:weatherService.getSavedDetails(),
        fill : { gradient: ["red", "green", "blue"] },
         headers: [
          {
            text: 'id',
            value: 'Id',
            align: 'right',
            sortable:false,
            width:"5%"
          },
          { text: 'City', value: 'city',sortable:false,align: 'right',
            width:"20%" },
          { text: 'State', value: 'state' ,sortable:false,align: 'right',width:"20%" },
          { text: "Temperature 'F", value: 'temperature' ,sortable:false,align: 'right',width:"20%" },
          { text: 'Zip Code', value: 'zipCode' ,sortable:false,align: 'right',width:"20%" },
          { text: 'Country', value: 'country' ,sortable:false,align: 'false',width:"20%" }
        ],
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
    mounted:function(){
        this.checkState() //method1 will execute at pageload
        this.$store.dispatch('setHiddenState',false)
    },
    methods:{
    checkState(){
        if(!(this.$store.getters.getUserLoginState)){
          this.$router.replace('/login')
        }
      },
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
       progress(event,progress,stepValue){
      },
      progress_end(event){
      },
      async getData(rowId){
        try{
          const data = await weatherService.getDetailsById(rowId)
          if(data.data){
            this.dialog = true
            var locationData = data.data[0]
            
            
            this.locationInfo.elevation = locationData.elevation

            this.locationInfo.Latitude = parseInt(locationData.latitude).toFixed(2)
            this.locationInfo.Longitude = parseInt(locationData.longitude).toFixed(2)
           
            this.locationInfo.icon_url = locationData.icon_url
            this.locationInfo.icon = locationData.icon
            this.locationInfo.temp = parseFloat(locationData.temperature)
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
          }

        }catch(error){
          this.error = error.response.data.error
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
.search-bar{
  width:40%;
  align:right;
}
.ft-sm{
  font-size:1em;
  font-weight:bold;
}
.ft-md{
  font-size:1em;
  text-align:left;
  font-weight:300;
  width:100%;
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
  width:100%;
  
}
.flex-width-parent{
  width:100%;
  display: block;
  text-align: center;
}
</style>
