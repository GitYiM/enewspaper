<template>
  <div class="headline-wrapper">
    <div class="dashboard-main-wrapper">
      <div class="main-container">
          <el-col :span="16" >
            <div class="left-content-list"  v-loading="loading" element-loading-text="拼命加载中...." element-loading-spinner="el-icon-loading">
                <a :class="['cart-item-href']" :href="item.url" v-for="(item,index) in HeadLists" :key="index" target="_blank" >
                    <card-item   :itemData="item" class="card-item"></card-item>
                </a>
            </div>
          </el-col>
          <el-col :span="8">
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
let _this
export default {
    components:{
        cardItem
    },
    data () {
        return {
            HeadLists:[],
            loading:true
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
        }
    },
    created () {
        console.log('headlineCreate')
        _this = this
        _this.forHeadlineNews()
        // _this.$route.meta.keepAlive = true
    },
    activated () {
        console.log('headline actived')
        // _this.forHeadlineNews()
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