import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //userState
    userUniId:'96568b78-058c-4fb7-b58d-856bd70aaca5',
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
 