import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect:'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        redirect: 'dashboard/headline',
        meta:{title:'Dashboard'},
        children:[
          {
            path: 'test',
            name:'Test',
            component:Home,
            meta:{title:'test'}
          },
          {
            path: 'headline',
            name: 'Headline',
            component:() => import('@/views/newsList/headlineview' ),
            meta: { title: 'Headline' }
          },
          {
            path: 'agri',
            name: 'Agri',
            component:() => import('@/views/newsList/agri' ),
            meta: { title: 'Agri' }
          },
          {
            path: 'social',
            name: 'Social',
            component:() => import('@/views/newsList/social'),
            meta: { title: 'Social' }
          },
          {
            path: 'inland',
            name: 'Inland',
            component:() => import('@/views/newsList/inland'),
            meta: { title: 'Inland' }
          },
          {
            path: 'health',
            name: 'Health',
            component:() => import('@/views/newsList/health'),
            meta: { title: 'Health' }
          },
          {
            path: 'international',
            name: 'International',
            component:() => import('@/views/newsList/international'),
            meta: { title: 'International' }
          },
          {
            path: 'military',
            name: 'Militart',
            component:() => import('@/views/newsList/military'),
            meta: { title: 'Military' }
          },
          {
            path: 'pe',
            name: 'PE',
            component:() => import('@/views/newsList/pe'),
            meta: { title: 'PE' }
          },
          {
            path: 'finance',
            name: 'Finance',
            component:() => import('@/views/newsList/finance'),
            meta: { title: 'Finance' }
          },
          {
            path: 'car',
            name: 'Car',
            component:() => import('@/views/newsList/car'),
            meta: { title: 'Car' }
          },
          {
            path: 'science',
            name: 'Science',
            component:() => import('@/views/newsList/science'),
            meta: { title: 'Science'}
          }
        ]
      },
      {
        path: 'connectus',
        name: 'ConnectUs',
        component: Home,
        meta: {title:'test'}
      },
      {
        path: 'collectView',
        name:'CollectView',
        component: () => import('@/views/collectView'),
        meta: { title:'CollectView' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{title:'About'}
  }
 
 
  
  
]




const router = new VueRouter({
  // mode:'history',
  scrollBehavior(to,from,savedPosition){
    if(to.hash =='#comment'){
      return new Promise(function(resolve,reject){
        setTimeout(function(){
          if(document.querySelector('#comment')){
            resolve({selector:to.hash}) 
          }
        },1000)
      })
    }
    return  {y:0}
  },
  // scrollBehavior: (to,from,savedPosition) => ({selector:to.hash}),
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
