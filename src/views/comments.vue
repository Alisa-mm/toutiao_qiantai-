<template>
  <div class="comments">
    <!-- 引入封装好的头部 -->
    <hmheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <!-- 评论列表 -->
    <div class="lists">
      <div class="item" v-for="comment in commentList" :key='comment.id'>
        <!-- 上面的结构 -->
        <div class="head">
            <!-- 左边头像 -->
          <img :src="comment.user.head_img" alt />
          <!-- 中间昵称和时间 -->
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <!-- 右边回复 -->
          <span @click="ReplyComment(comment)">回复</span>
        </div>
        <!-- 使用封装好的评论块 判断要不要生成上一级的评论结构 -->
        <CommentItem v-if="comment.parent" :UpLevel='comment.parent'></CommentItem>
        <!-- 下面评论内容 -->
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <!-- 添加底部评论块 -->
  <hmCommentFoot :post="article" :Robj="obj" @refresh="refresh" @reset='obj=null'></hmCommentFoot>
  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'

import {getCommentList} from '@/api/articles.js'

import CommentItem from '@/components/hmCommentItem.vue'

import hmCommentFoot from '@/components/hmCommentFoot.vue'

import { getArticleById } from "@/api/articles.js";

export default {
  data () {
    return {
      obj:'',
      article:{},
      commentList:[]
    }
  },
  components:{
    hmheader,CommentItem,hmCommentFoot
  },
 async mounted () {
   this.init()
  //  封装
  //  let id = this.$route.params.id
  //   let res =await getCommentList(id,{pageSize:40,pageIndex:1});
  //   console.log(res);
  //   this.commentList = res.data.data.length>0? res.data.data:this.commentList
  //   this.commentList=this.commentList.map(value=>{
  //     value.user.head_img = 'http://127.0.0.1:3000'+value.user.head_img
  //     return value
  //   })
   let res1 = await getArticleById(this.$route.params.id);
    // console.log(res);
    // 把后台返回来的文章结果 赋值给article对象 再在页面结构中去渲染
    this.article = res1.data.data;
  },
  methods:{
    async init(){
      let id = this.$route.params.id
      // 获取评论列表的数据
    let res =await getCommentList(id,{pageSize:40,pageIndex:1});
    // console.log(res);
    this.commentList = res.data.data.length>0? res.data.data:this.commentList
    this.commentList=this.commentList.map(value=>{
      value.user.head_img = 'http://127.0.0.1:3000'+value.user.head_img
      return value
    })
    },
    // 子组件hmCommentFoot发出的事件 父组件刷新页面
    refresh(){
      // 发表评论后刷新页面
      this.init();
    
    window.scrollTo(0,0)
    },
    // 回复评论要实现两个需求 1.单击回复让底部文本框弹出来 2.要知道我回复的是谁的评论 要拿到这个评论的id
   /*  注意父传子要满足两个条件 
   1.子组件要定义props属性 2.要在父组件中使用子组件的位置传
    但是我们传值是在span的回复中传，第二条不满足 所以我们先要在span中 把comment传给一个对象obj 再把这个对象obj给父组件Robj 再让父组件把Robj给子组件就可以了 */
    // 
    // 点击回复的时候 把comment赋值给obj ，然后把obj传给子元素hmCommentFoot
    ReplyComment(comment){
      this.obj=comment
    }
  }

};
</script>

<style lang='less'  scoped>
.lists{
  border-bottom: 2px solid #ccc;
  .item{
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head{
      display: flex;
      justify-content: space-between;
       align-items: center;
        > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      >div{
        flex:1;
        flex-direction: column;
        margin-left:10px;
        >p{
          margin:0;
          padding:0
        }
        >span{
          font-size:12px;
          color:#999;
          line-height: 25px;
        }
      }
      >span{
        color:#999;
        font-size: 13px;
        margin-right: 5px;
      }
    }
     .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
      margin-bottom:20px
    }
  }
  
}
</style>