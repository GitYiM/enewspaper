<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
let _this;
export default {
   watch:{
    $route(to,from){ 
      console.log('route is changing')
      _this.test(to)
    }
  },
  methods: {
    test:function({name}) { 
      console.log(name)
    }
  },
  created () {
    _this = this
  }
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

