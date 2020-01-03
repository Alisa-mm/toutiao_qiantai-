import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'

// 挂载
Vue.use(VueRouter)


// 引入路由所映射的组件
import Login from '@/views/login.vue'

import Personal from '@/views/personal.vue'
//创建路由
let router = new VueRouter({
    // 配置路由
    routes:[
        {
            name:'Login',
            path:'/',
            component:Login
        },
        {
            name:'Personal',
            path:'/personal',
            component:Personal
        }
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.path.indexOf('/personal')===0){
        let token = localStorage.getItem('key')
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