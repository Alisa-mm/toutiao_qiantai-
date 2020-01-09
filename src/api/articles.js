import axios from '@/utils/myaxios'

// 获取栏目新闻数据
// get请求 数据传params post请求传data
export const getNewList = (params)=>{
    return axios({
        url:'/post',
        params
    })
}
// 2.根据文章id获取文章详情
export const getArticleById =(id)=>{
    return axios({
        url:`/post/${id}`
    })
}
// 3.点赞和取消点赞
export const likeArticle = (id)=>{
    return axios({
        url:`/post_like/${id}`
    })
}
// 4.根据文章id 收藏文章和取消收藏
export const collectArticle = (id)=>{
    return axios({
        url:`/post_star/${id}`
    })
}