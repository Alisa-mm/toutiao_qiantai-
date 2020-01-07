import axios from '@/utils/myaxios'

// 获取栏目新闻数据
// get请求 数据传params post请求传data
export const getNewList = (params)=>{
    return axios({
        url:'/post',
        params
    })
}