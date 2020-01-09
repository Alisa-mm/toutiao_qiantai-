<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        :class="{active:article.has_follow}"
        @click="followUser"
      >{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user&&article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <!-- 如果type=1 就是文章类型 就用html解析就可以 -->
      <div class="content" v-html="article.content" v-if="article.type===1"></div>
      <!-- 如果type=2 就是视频类型 加video -->
      <video :src="article.content" v-if="article.type===2" controls></video>
      <!-- controls是否显示控制面板  
      autoplay:自动播放，在chrome是有问题，不会响应
      loop:是否循环播放
      poster:首帧画面-->
      <div class="opt">
        <span class="like" :class="{active:article.has_like}" @click="likeThisArticle">
          <van-icon name="good-job-o" />
          {{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 添加底部评论栏 -->
    <hmComment></hmComment>
  </div>
</template>

<script>
// 引入通过id获取文章详情的方法
import { getArticleById } from "@/api/articles.js";
// 引入关注和取消关注用户的方法
import { followUser, unfollowUser } from "@/api/user.js";
// 引入点赞和取消点赞的方法
import { likeArticle } from "@/api/articles.js";
// 引入封装好的底部评论栏
import hmComment from "@/components/hmCommentFoot.vue"
export default {
  data() {
    return {
      article: {}
    };
  },
  components:{
    hmComment
  },
  async mounted() {
    // 根据文章id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleById(this.$route.params.id);
    // console.log(res);
    // 把后台返回来的文章结果 赋值给article对象 再在页面结构中去渲染
    this.article = res.data.data;
  },
  methods: {
    async followUser() {
      let res;
      //  满足下面这个条件  说明已经关注过了 就调用取消关注的方法
      if (this.article.has_follow) {
        res = await unfollowUser(this.article.user.id);
      } else {
        //  满足这个条件 说明没有关注 就调用关注的方法
        res = await followUser(this.article.user.id);
      }
      //  刷新
      this.article.has_follow = !this.article.has_follow;
      // console.log(this.article.has_follow);

      this.$toast.success(res.data.message);
    },
    async likeThisArticle() {
      let res = await likeArticle(this.article.id);
      console.log(res);
      if(res.data.message=='点赞成功'){
        this.article.like_length++
      }else{
         this.article.like_length--
      }
       this.article.has_like = !this.article.has_like
    this.$toast.success(res.data.message)
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #fff;
    color: #000;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      color: #fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      img {
        width: 100%;
        display: block;
      }
    }
  }
  video {
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
