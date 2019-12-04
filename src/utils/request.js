import axios from 'axios'
import Message from 'element-ui'


const request = axios.create({
    baseURL:process.env.VUE_APP_BASE_API, //url = baseurl + apiurl
    timeout: 10000    
})

//发送请求前处理
request.interceptors.request.use(config => {

    return config
},err => {
    console.log(err)
    return Promise.reject(error)
})

//收到响应的处理
request.interceptors.response.use(response => {
    // console.log('触发')
    let res = response.data
    if(res.error_code!=0){
        Message({
            message:res.message||'error',
            type:'warning',
            duration: 5 * 1000
        })
    }else{
        return res
    }
},err => {
    console.log('错误') 
    return Promise.reject(err)
})

export default request  