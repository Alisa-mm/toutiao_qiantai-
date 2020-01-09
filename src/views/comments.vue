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
          <span>回复</span>
        </div>
        <!-- 下面评论内容 -->
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'

import {getCommentList} from '@/api/articles.js'
export default {
  data () {
    return {
      commentList:[]
    }
  },
  components:{
    hmheader
  },
 async mounted () {
   let id = this.$route.params.id
    let res =await getCommentList(id,{pageSize:40,pageIndex:1});
    // console.log(res);
    this.commentList = res.data.data.length>0? res.data.data:this.commentList
    this.commentList=this.commentList.map(value=>{
      value.user.head_img = 'http://127.0.0.1:3000'+value.user.head_img
      return value
    })

    
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
    }
  }
  
}
</style>