import axios from '@/utils/myaxios.js'

// 获取文章列表数据
export const getCateList = ()=>{
    return axios({
        url:'/category'
    })
}