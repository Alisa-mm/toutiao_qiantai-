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
// 3.根据id获取用户详情
export const getUserById=(id)=>{
    return axios({
        url:`/user/${id}`,
        // headers:{'Authorization':localStorage.getItem('totiao_token')}
    })
}
// 4.更新个人信息
export const updateUserById=(id,data)=>{
    return axios({
        method:'post',
        url:`/user_update/${id}`,
        data
    })
}
// 5.根据文章id获取文章详情
export const getArticleById =(id)=>{
    return axios({
        url:`/post/${id}`
    })
}