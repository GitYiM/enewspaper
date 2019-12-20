<template>
  <div class="headline-wrapper">
    <div class="dashboard-main-wrapper">
      <div class="main-container">
            <div class="left-content-list" v-loading="loading" element-loading-text="拼命加载中...." element-loading-spinner="el-icon-loading">
                <card-item :href="item.url" v-for="(item,index) in HeadLists" :key="index"  :itemData="item" class="card-item"></card-item>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardItem from '@/components/card-item.vue'
import { getOtherNews } from '@/api/api.js'
import { throttle } from '@/utils/throttle.js'
import listLoad from '@/utils/listLoad.js'
let _this
export default {
    name:'International',
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
        forSocialNews () {
            getOtherNews ({
                type: 'guoji',
                userUniqueKey: _this.$store.state.userUniId,
                recommendType: _this.$store.state.recommendType
            }).then(res => {
                console.log(res.result.data)
                _this.HeadLists = res.result.data
                _this.loading = false
            }) 
        },
        loadMore: function () {
            getOtherNews({
                type: 'guoji',
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
        _this = this
        _this.forSocialNews()
        listLoad.listenScroll(_this.loadMore)
    },
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