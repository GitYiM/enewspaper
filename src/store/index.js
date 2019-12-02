import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //userState
    userUniId:'be16c8b1-12b0-40d8-ad72-3503a0ca4e58',
    recommendType:'0',

    //viewState
    activeId :'headline',

    
  },
  getters: { 

  },
  mutations: { 
    changeMode:function(state,mode) {
      if(state.recommendType != mode){
         state.recommendType = mode 
         window.sessionStorage.setItem('recommendType',mode)  
      }
    },
    setActiveId : function(state, id) {
      if(state.activeId != id){
        state.activeId = id
      }
    }
  }, 
  //可以放异步请求
  actions: {
    
  },
  modules: {

  }
})
 