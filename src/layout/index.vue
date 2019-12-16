<template>
  <div class="app-layout">
    <div class="header-box">
      <el-header class="main-header">
        <div class="container">
          <a href="/" class="logo">
            <img src="@/assets/易得快报web.png" style="transform:scale(2)" alt="app-logo" />
          </a>
          <nav class="main-nav">
            <ul class="nav-list">
              <li class="nav-item" @click="toDashboard">首页</li>
              <li class="nav-item" @click="toConnect">联系我们</li>
              <!-- <li class="nav-item" @click="toConnect">我的足迹</li>
              <li class="nav-item" @click="toConnect">我的收藏</li> -->
              <li class="nav-item mode-chose">
                模式---
                <el-dropdown class="mode-menu" size="small">
                  <span class="el-dropdown-link" style="color:white">
                    {{newsmode}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu @click.native="choseMode" slot="dropdown">
                    <el-dropdown-item :menu_chose_id="item.id" v-for="(item,index) in modeList" :key="index" divided>{{item.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </nav>
        </div>
      </el-header>
    </div>
    <div class="main-container">
      <app-main />
    </div>
    <!-- <transition name="el-fade-in-linear" mode="out-in"> -->
      <el-button
        style="color:blue"
        :class="['float-button',toTopBtn?'top':'']"
        circle
        icon="el-icon-caret-top"
        @click.native="toTop"
      ></el-button>
    <!-- </transition> -->
  </div>
</template>

<script>
import appMain from "./components/appmain";
import { mapMutations,mapState } from 'vuex'
import { getHeadlineList,getOtherNews } from '@/api/api.js'
let _this;
export default {
  components: {
    appMain
  },
  data() {
    return {
      toTopBtn: false,
      modeList:[
        {
          name:'热点推荐',
          id:'one'
        },
        {
          name:'智能个性化推荐',
          id:'two'
        },
        {
          name:'自由推荐',
          id:'three'
        }
      ]
    };
  },
  computed: {
    ...mapState(['recommendType']),
    newsmode: function() {
      switch (_this.$store.state.recommendType) {
      case '0':
        return '热点推荐'
        break;
      case '1':
        return '智能个性化推荐'
        break;
      case '2':
        return '自由推荐'
        break;  
      default:
        return false
        break;
    }
    }
    
  },
  methods: {
    ...mapMutations(['changeMode']),
    choseMode() {
      let modeid = event.target.getAttribute("menu_chose_id");
      switch (modeid) {
        case "one":
          {
            if(_this.recommendType == '0'){
              return false
            }
            _this.changeMode('0')
            const fullLoading =  _this.$loading({
              fullscreen:true,
              text:'正在切换模式',
              spinner:'el-icon-loading',
              lock:true
            })
            setTimeout(function() {
              fullLoading.close()
            },2000)
            // _this.$nextTick(()=>{
             
            //   fullLoading.close()
            // },2000)
          }
          break;
        case "two":
          {
            if(_this.recommendType == '1'){
              return false
            }
             _this.changeMode('1')
             const fullLoading =  _this.$loading({
              fullscreen:true,
              text:'正在切换模式',
              spinner:'el-icon-loading',
              lock:true
            })
             setTimeout(function() {
              fullLoading.close()
            },2000)
          }
          break;
        case "three":
          {
            if(_this.recommendType == '2'){
              return false
            }
             _this.changeMode('2')
             const fullLoading =  _this.$loading({
              fullscreen:true,
              text:'正在切换模式',
              spinner:'el-icon-loading',
              lock:true
            })
             setTimeout(function() {
              fullLoading.close()
            },2000)
          }
          break;
        default: {
            
        }
      }
    },
    toConnect () {
      _this.$router.push({
        path:"connectus"
      })
    },
    toDashboard() {
      _this.$router.push({
        path: "/dashboard"
      });
    },
    toTop() {
      console.log("toTop");
      let mode =
        document.compatMode === "CSS1Compat" ? "documentElement" : "body";
      let fromTop = document[mode].scrollTop;
      // 回到顶部滚动条滑动的速度应该和高度有关
      let speed = Math.round(fromTop / 20);
      let timer = setInterval(function() {
        document[mode].scrollTop -= speed;
        if (document[mode].scrollTop <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, 10);
    },
    getFromTop() {
      let fromTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (fromTop >= 100) {
        _this.toTopBtn = true;
      } else {
        _this.toTopBtn = false;
      }
    }
  },
  watch: {},
  created() {
    _this = this;
    if(['0','1','2'].indexOf(window.sessionStorage.getItem('recommendType'))>-1){
      _this.changeMode(window.sessionStorage.getItem('recommendType'));
    }
  },
  mounted() {
    window.addEventListener("scroll", _this.getFromTop, false);
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  width: 100% !important;
  height: 4rem !important;
  position: relative;
 
  .main-header {
    transform: translateZ(0);
     background-color: gray;
    position: fixed;
    width: 100%!important;
    height: 4rem!important;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
     z-index: 250; //务必加
    .container {
      width: 100%;
      display: flex;
      margin: auto;
      max-width: 1080px;
      height: 100%;
      align-items: center;
      // transition: all .2s;
      // border-bottom: 1px solid black;
      .logo {
        min-width: 100px;
        margin-left: 20px;
        img {
          width: 108px;
          height: 45px;
        }
      }
      &:after{
          display: table;
          content: "";
          clear: both;
      }
    }
  }
}

.main-nav {
  color: white;
  height: 100%;
  margin-left: 5rem;
  flex: 1 0 auto;
  .nav-list {
    display: flex;
    align-items: center;
    height: 100%;
   
    li {
      list-style: none;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      cursor: pointer;
    }
  }
  .mode-chose {
    flex: 1 1 auto;
    justify-content: flex-end;
    cursor: auto !important;
    .mode-menu {
      cursor: pointer;
    }
  }
}
.float-button {
  position: fixed;
  right: 100px;
  bottom: -50px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  transition: all .3s linear 0s;
  opacity: .8;
}
.top{
  bottom: 100px;
  opacity: 1;
}
</style>