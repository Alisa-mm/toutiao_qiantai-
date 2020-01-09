<template>
  <div class="comment">
    <div class="addcomment"  v-show='!isFocus'>
      <!-- 写跟帖的文本框 -->
      <input type="text" placeholder="写跟帖" @focus="handleFocus"  />
      <!-- 评论条数 -->
      <span class="commentCount" @click="$router.push({path:`/comments/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>50</em>
      </span>
      <!-- 收藏图标 -->
      <i class="iconfont iconshoucang " :class="{active:post.has_star}" @click="collectThisArticle"></i>
      <!-- 分享图标 -->
      <i class="iconfont iconfenxiang"></i>
    </div>
    <!-- 文本域输入框 -->
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" @blur="isFocus = false"></textarea>
      <div>
        <span>发送</span>
      </div>
    </div>
  </div>
</template>

<script>
import {collectArticle} from '@/api/articles.js'
export default {
 props:['post'],
    data () {
        return {
           isFocus:false 
        }
    },
    methods:{
        // 获取焦点时触发
        handleFocus(){
            this.isFocus=!this.isFocus
            this.$refs.commtext.focus()
        },
       async collectThisArticle(){
         let res = await collectArticle(this.post.id);
         this.post.has_star = !this.post.has_star;
         this.$toast.success(res.data.message)
       }
    }
};
</script>

<style lang='less' scoped>
.comment{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -10px;
      font-size: 5px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active{
  color: red;
}
</style>