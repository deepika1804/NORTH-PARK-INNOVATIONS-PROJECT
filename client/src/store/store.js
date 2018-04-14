import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	strict:true,
	state:{
		token:null,
		user:null,
		isUserLoggedIn:false,
		ishidden:true
	},
	mutations:{
		setToken(state,token){
			state.token = token
		},
		setUser(state,user){
			state.user = user
			state.isUserLoggedIn = true
		},
		setLogInState(state,value){
			state.isUserLoggedIn = value
		},
		setHiddenState(state,value){
			state.ishidden=value
		}
	},
	actions:{
		setToken({commit},token){
			commit ('setToken',token)
		},
		setUser({commit},user){
			commit ('setUser',user)
		},
		setLogInState({commit},value){
			commit ('setLogInState',value)
		},
		setHiddenState({commit},value){
			commit ('setHiddenState',value)
		}
	},
	getters: {
	  getUserLoginState : state => {
	      return state.isUserLoggedIn
	    }
	}

})