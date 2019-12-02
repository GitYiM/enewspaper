import store from '@/store'
import { throttle } from '@/utils/throttle.js'
const listLoad = {}
listLoad.loadMore = function (fn, headlist, nomore) {
    [fn]({
        userUniqueKey: store.state.userUniId,
        recommendType: store.state.recommendType
    })
    .then(res => {
        if(res.result.data.length == 0 ){
            nomore = true
        }
        headlist.push(...res.result.data)
    })
}

listLoad.listenScroll = function (fn) {
    window.addEventListener('scroll',throttle(function() {
        let fromTopHeight = document.body.scrollTop || document.documentElement.scrollTop 
        let viewHeight = document.documentElement.clientHeight || document.body.clientHeight
        let totalHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        console.log('from:' + fromTopHeight+ 'viewH:'+viewHeight+ 'total:'+ totalHeight)
        if(fromTopHeight+viewHeight>= totalHeight){
            fn()
            console.log('加载更多')
        }else{
            console.log('条件不满足')
        }
        console.log('监听')
    },300))
}


export default listLoad