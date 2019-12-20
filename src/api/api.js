import request from '@/utils/request'




//注册新用户
export function createUser(params){
    return request({
        url:`/ydkb/news/register`,
        method:'get',
        params
    })
}

//获取头条新闻
export function getHeadlineList(params){
    return request({
        url:`/ydkb/news/content/top`,
        method:'get',
        params
    })
}

//获取其它类型新闻
export function getOtherNews(params){
    return request({
        url:'/ydkb/news/content/other',
        method:'get',
        params
    })
}

//不喜欢 反馈原因
export function distate(params) {
    return request({
        url:'/ydkb/news/distaste',
        method:'get',
        params
    })
}

//增加赞 value 为-1就是取消赞、其它为增加赞
export function likeNumUpdate(params) {
    return request({
        url: '/ydkb/news/acclaim', 
        method:'get',
        params
    })
}

//获取点赞数（评论的第一条，用来存储点赞数）
export function getacclaim (params) {
    return request({
        url: '/ydkb/news/comment/get',
        method: 'get',
        params
    })
}

//收藏文章
export function collectNews (params) {
    return request({
        url: '/ydkb/news/collect',
        method: 'get',
        params
    }) 
}

//添加评论
export function addComment (params) {
    return request({
        url:'/ydkb/news/comment/update',
        method:'post',
        params
    })
} 

//获取评论 （排除第0条）
export function getComments (params) {
    return request({
        url: '/ydkb/news/comment/get',
        method: 'get',
        params
    })
}

//获取地理位置
export function getPosition (location) {
    return request ({
        url:'https://restapi.amap.com/v3/geocode/regeo',
        method:'get',
        params:{
            location:location,
            key:'c88774c335ce0173117f5f0288f2f0a6'
        }
    })
}