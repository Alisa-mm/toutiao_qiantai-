import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'

// 挂载
Vue.use(VueRouter)


// 引入路由所映射的组件
import Login from '@/views/login.vue'

import Personal from '@/views/personal.vue'

import Register from '@/views/register.vue'

import EditPersonal from '@/views/editPersonal.vue'

import Index from '@/views/index.vue'

//创建路由
let router = new VueRouter({
    // 配置路由
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Personal',
            path:'/personal/:id',
            component:Personal
        },
        {
            name:'Register',
            path:'/register',
            component:Register
        },
        {
            name:'EditPersonal',
            path:'/editPersonal/:id',
            component:EditPersonal
        },
        {
            name:'Index',
            path:'/',
            component:Index
        }
    ]
})
// 导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path.indexOf('/personal')===0){
        let token = localStorage.getItem('totiao_token')
        if(token){
            next()
        }else{
            next({name:'Login'})
        }
    }else{
        next()
    }
})
// 暴露路由
export default router