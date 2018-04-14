<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form  ref="form" @keyup.native.enter="login($event)">
                    <v-text-field
                      label="User Name"
                      v-model="username"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      type = "password"
                      required
                    ></v-text-field>
                    <div class="error" v-html="error" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                
                <v-btn type="submit" color="teal mx-auto text-xs-center pa-1" 
                @click = "login"
                  :disabled="(username == null || password==null)">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

</template>

<script>
import AuthenticationService from "@/services/AuthenticationService"
export default {
  name: 'Login',
  data () {
    return {
      username:"",
      password:"",
      error:null
    }
  },
  watch:{
    
  },mounted:function(){
        this.$store.dispatch('setLogInState',false)
  },methods:{
    async login(){

      try{
        const user = await AuthenticationService.login({
          username:this.username,
          password:this.password 
        })
        if(user){
          this.error = null
          this.$store.dispatch('setUser',user)
          this.$router.replace('/Screen2')
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error{
  color:red;
  background-color: transparent !important;
}
</style>
