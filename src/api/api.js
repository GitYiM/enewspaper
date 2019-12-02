import request from '@/utils/request'

export function getHeadlineList(params){
    return request({
        url:`/news/news/content/top`,
        method:'get',
        params
    })
}

export function getOtherNews(params){
    return request({
        url:'/news/news/content/other',
        method:'get',
        params
    })
}

export function distate(params) {
    return request({
        url:'/news/news/distaste',
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
        url: '/news/news/comment/get',
        method: 'get',
        params
    })
}