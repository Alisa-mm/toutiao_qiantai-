// 引入已经配好的基准路径
import axios from '@/utils/myaxios.js'

// 登录
export const login = data=>{
    return axios({
        method:'post',
        url:'/',//login登录页面
        data
    })
}