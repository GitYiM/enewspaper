<template>
    <div class="dashboard-container">
        <div class="dash-container">
            <nav class="dash-header-box">
                <ul class="nav-list" @click="choseNewsType">
                    <li :click_id="item.clickId" :class="['nav-item',item.clickId==activeId?'active':'']" v-for="(item,index) in navList" :key="index">{{item.name}}</li>
                </ul>
            </nav>
        </div>
      <transition name="fade-transform"  mode="out-in">
          <keep-alive :include="cacheList">
                <router-view  />
          </keep-alive>
        </transition>
        <!-- <transition name="fade-transform"  mode="out-in">
             <router-view v-if="!$route.meta.keepAlive" :key="varkey"/>>
        </transition> -->
    </div>
</template>

<script>
import request from '@/utils/request'
import { mapMutations,mapState } from 'vuex'
let _this
    export default {
        name:'Dashboard',
        data () {
            return {
                navList:[
                    {
                        name:'头条',
                        clickId:'headline'
                    },
                    {
                        name:'社会',
                        clickId:'social'
                    },
                    {
                        name:'国内',
                        clickId:'inland'
                    },
                    {
                        name:'健康',
                        clickId:'health'
                    },
                    {
                        name:'国际',
                        clickId:'international'
                    },
                    {
                        name:'军事',
                        clickId:'military'
                    },
                    {
                        name:'体育',
                        clickId:'PE'
                    },
                    {
                        name:'财经',
                        clickId:'finance'
                    },
                    {
                        name:'汽车',
                        clickId:'car'
                    },
                    {
                        name:'科技',
                        clickId:'science'
                    }
                ],
                activeId:'headline',
                cacheList:"Headline,Health,Inland,International,Military,Pe,Science,Social,Car,Finance"
            }
        },
        methods:{
           
            choseNewsType () {
                let click_id = event.target.getAttribute('click_id')
                switch(click_id){
                    case 'headline':{
                          _this.activeId = click_id
                         _this.$router.push({
                            path:`headline`
                        })
                    }
                    break
                    case 'social': {
                       
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'social'
                        })
                    }
                    break
                    case 'inland': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'inland'
                        })
                    }
                    break
                    case 'health': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'health'
                        })
                    }
                    break
                    case 'international': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'international'
                        })
                    }
                    break
                    case 'military': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'military'
                        })
                    }
                    break
                    case 'PE': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'pe'
                        })
                    }
                    break
                    case 'finance': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'finance'
                        })
                    }   
                    break
                    case 'car': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'car'
                        })
                    }
                    break
                    case 'science': {
                        _this.activeId = click_id
                        _this.$router.push({
                            path:'science'
                        })
                    }
                    break
                    default: {}
                }
            }
        },
        created () {
            _this = this
            _this.activeId = _this.$route.path.substr(_this.$route.path.lastIndexOf('/')+1)
            console.log(_this.activeId)
        }
    }
</script>

<style lang="scss" scoped>
    // @import '~@/styles/mixin.scss';
    .dashboard-container{
        position: relative;
        // @include clearfix;
        .dash-container{
            width: 100%;
            height: 3rem;
            position: relative;
            .dash-header-box{
            width: 100%;
            height: 3rem;
            z-index: 100;
            position: fixed;
            background-color: #ffffff;
            box-shadow: 0 1px 2px rgba(0,0,0,.05);
            .nav-list{
                line-height: 1;
                height: 100%;
                display: flex;
                align-items: center;
                margin: auto;
                max-width: 1080px;
                li{
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding: 0 1rem;
                    list-style: none;
                    cursor: pointer; 
                }
            }
        }
        }
        
    }
    .active{
        color: skyblue;
    }
</style>