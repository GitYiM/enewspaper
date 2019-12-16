<template>
  <div class="headline-wrapper">
    <div class="dashboard-main-wrapper">
      <div class="main-container">
          <el-col :span="17" >
            <div  class="left-content-list"  v-loading="loading" element-loading-text="拼命加载中...." element-loading-spinner="el-icon-loading">
                <card-item  :href="item.url" v-for="(item,index) in HeadLists" :key="index"  :itemData="item" class="card-item"></card-item>
            </div>
            <!-- <div v-show="nomore" style="height:4rem; width:100%;"> 
                <span style="line-height:4rem">没有更多新闻了......</span>
            </div> -->
          </el-col>
          <el-col :span="7">
                <div class="right-extra-content">
                    <!-- <el-button @click="forGetOtherNews">测试</el-button> -->
                    <!-- <a target="_blank" href="https://www.baidu.com">百度</a>    -->
                </div>
          </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import cardItem from '@/components/card-item.vue'
import { getHeadlineList,getOtherNews } from '@/api/api.js'
import { throttle } from '@/utils/throttle.js'
import listLoad from '@/utils/listLoad.js'
let _this
export default {
    name:'Headline',
    components:{
        cardItem
    },
    data () {
        return {
            HeadLists:[],
            loading:true,
            nomore:false
        }
    },
    methods: {
        forHeadlineNews: function () {
            getHeadlineList({
                userUniqueKey: _this.$store.state.userUniId,
                recommendType: _this.$store.state.recommendType
            })
            .then(res => {
                _this.HeadLists = res.result.data
                _this.loading = false
            })
        },
        loadMore: function () {
            getHeadlineList({
                userUniqueKey: _this.$store.state.userUniId,
                recommendType: _this.$store.state.recommendType
            })
            .then(res => {
                if(res.result.data.length == 0 ){
                    _this.nomore = true
                }
                _this.HeadLists.push(...res.result.data)
            })
        }
    },
    created () {
        console.log('headlineCreate')
        _this = this
        _this.forHeadlineNews()
       listLoad.listenScroll(_this.loadMore)
       // window.addEventListener('scroll',throttle(function() {
        //     let fromTopHeight = document.body.scrollTop || document.documentElement.scrollTop 
        //     let viewHeight = document.documentElement.clientHeight || document.body.clientHeight
        //     let totalHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        //     console.log('from:' + fromTopHeight+ 'viewH:'+viewHeight+ 'total:'+ totalHeight)
        //     if(fromTopHeight+viewHeight == totalHeight){
        //         _this.loadMore()
        //         console.log('加载更多')
        //     }else{
        //         console.log('条件不满足')
        //     }
        //     console.log('监听')
        // },300))
    },
    activated () {
        console.log('headline actived')
        listLoad.listenScroll(_this.loadMore)
        // _this.forHeadlineNews()
    },
    deactivated () {
        console.log('不活跃')
        listLoad.removeListenScroll(_this.loadMore)
    }
    
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin';
.headline-wrapper{
    @include clearfix;
    position: relative;
 .dashboard-main-wrapper {
     @include clearfix;
    position: relative;
    margin-left: auto;
    margin-right: auto; 
    max-width: 1080px; 
    padding: 0;
    .main-container {
        // margin-top: 3.5rem;
        // z-index: -1;
        padding: 20px 0;
         @include clearfix;
        height: 100%;
        .left-content-list{
            min-height: 200px;
            z-index: -1;
        }
    }
 } 
}
    .cart-item-href{
        @include clearfix;
    }

</style>