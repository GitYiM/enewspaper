import router from '@/router'
import NProress from 'nprogress' //progress bar 
import 'nprogress/nprogress.css' //progress bar style



router.beforeEach((to,from,next) => {
    // NProress.start()
    //about页面和首页的颜色切换
    if(to.path == '/about'){
        const html =  document.getElementsByTagName('html')[0]
        html.style.backgroundColor = '#ffffff'
        console.log('about')
    }else{
        const html =  document.getElementsByTagName('html')[0]
        html.style.backgroundColor = '#F4F5F5'
        console.log('不是about')
    }

    next()
}) 

router.afterEach(() => {
    NProress.done()
})
