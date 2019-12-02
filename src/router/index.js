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
            meta:{title:'test',keepAlive:true}
          },
          {
            path: 'headline',
            name: 'Headline',
            component:() => import('@/views/newsList/headlineview' ),
            meta: { title: 'Headline' ,keepAlive:false}
          },
          {
            path: 'social',
            name: 'Social',
            component:() => import('@/views/newsList/social'),
            meta: { title: 'Social' ,keepAlive:false}
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
            meta: { title: 'Science',keepAlive:false }
          }
        ]
      },
      {
        path: 'connectus',
        name: 'ConnectUs',
        component: Home,
        meta: {title:'test'}
      },
      
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
 
 
  
  
]

const router = new VueRouter({
  scrollBehavior: ()=>({y:0}),
  routes
})

export default router
