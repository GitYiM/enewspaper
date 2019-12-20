<template>
  <div id="app"> 
     <transition name="fade-transform"  mode="out-in">
      <keep-alive :exclude="excludeList"  >
        <router-view />
      </keep-alive>
    </transition>

  </div>
</template>

<script>
import utils from '@/utils/normalUtils.js'
import { createUser, getPosition } from '@/api/api.js'
import { mapMutations } from 'vuex';
let _this;
export default {
  data () {
    return {
      excludeList: "About",
      hasUserId:false
    }
  },
   watch:{
    $route(to,from){ 
      console.log('route is changing')
      _this.test(to)
    }
  },
  methods: {
    ...mapMutations(['setMobileStatus']),
    test:function({name}) { 
      console.log(name)
    },
    isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) 
      this.setMobileStatus(flag);
    }
  },
  created () {
    _this = this
    //判断客户端类型
    _this.isMobile()
    //第一次进入网页注册新用户
    _this.hasUserId = window.localStorage.getItem('userId')

    if(!_this.hasUserId){
      console.log('生成新的userid')
     let userId  =  utils.createUUID()
     
    //获取经纬度
      let lati = 0;
      let longi = 0;
      let city = ''
      let userName = '游客'
      let imageType =  Math.round((1 + Math.random() * (7 - 1 + 1)))
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          function(position){
           lati = position.coords.latitude
           longi = position.coords.longitude
          },
          function(e){
            throw e.message
          }
        ) 
      }
    getPosition(lati+','+longi).then(res=>{
      city = res.regeocode.addressComponent.province
      userName = `来自${city}的网友`
    })
    
     createUser({
       uniqueKey:userId,
       userName:userName,
       imageType:imageType,
       latitude:lati,
       longitude:longi
    })
      window.localStorage.setItem('userId',userId)
      window.localStorage.setItem('userName',userName)
      window.localStorage.setItem('imageType',imageType)
       _this.$store.state.userName = window.localStorage.getItem('userName')
       _this.$store.state.userUniId = window.localStorage.getItem('userId')
       _this.$store.state.imageType = window.localStorage.getItem('imageType')

    }else{
      _this.$store.state.userUniId = window.localStorage.getItem('userId')
       _this.$store.state.userName = window.localStorage.getItem('userName')
       _this.$store.state.imageType = window.localStorage.getItem('imageType')
    }

  },
}
</script>

<style lang="scss">
@import './styles';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

