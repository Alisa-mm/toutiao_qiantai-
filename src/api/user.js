// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.登陆
export const login = (data) => {
    return axios({
        method:'post',
        url:'/login',
        data:data
    })
}
// 2.注册
export const register = data=>{
    return axios({
        method:'post',
        url:'/register',
        data
    })
}