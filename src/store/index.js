import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //userState
    userUniId:'bbff323a-1b54-476c-b3ab-3ef872dae3f5',
    userName:'游客',
    imageType:1,
    recommendType:'0',

    //viewState
    activeId :'headline',
    //visit status
    isMobile:false
    
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
    },
    setMobileStatus: function (state, status) {
      state.isMobile = status
    }
  }, 
  //可以放异步请求
  actions: {
    
  },
  modules: {

  }
})
 