<template>
  <div id="app">
    
    <v-app id="inspire">
    
    <v-toolbar color="teal" dark fixed app>

      <v-toolbar-title>Weather App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  v-if="$store.state.isUserLoggedIn"
      color="text-xs-center"
      flat
      @click="logout"
      >
      LogOut
      </v-btn>
      <v-btn
          color="pink"
          fab
          dark
          small
          absolute
          bottom
          left
          v-show="!$store.state.ishidden"
          @click="back"
        >Back</v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            	<router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="teal" app>
      <v-spacer></v-spacer>
      <span class="white--text"></span>
    </v-footer>
  </v-app>
  </div>
</template>


<script>
export default {
  name: 'App',
  data: () => ({
	  drawer: null
	}),
	props: {
	  source: String
	},
  methods:{
    logout(){
      this.$store.dispatch('setLogInState',false)
      this.$store.dispatch('setHiddenState',true)
      this.$router.replace('/login')
    },
    back(){
      this.$store.dispatch('setHiddenState',true)
      this.$router.replace('/Screen2')
    }
  }
}

</script>

<style>
#app {
  
}

</style>
