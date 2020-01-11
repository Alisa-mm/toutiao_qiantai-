<template>
  <!-- 左右的文章结构 -->
  <div class="article" v-if="post.type===1 && post.cover.length <=2" @click="handlerClick">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length ||( post.comments&&post.comments.length)}}</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <!--上下的视频结构 -->
  <div class="articleV" v-else-if="post.type===2" @click="handlerClick">
    <!-- 上面标题 -->
    <p class="content">{{post.title}}</p>
    <!-- 视频播放区域 -->
    <div class="playarea">
      <!-- 图片 -->
      <img :src="post.cover[0].url" alt />
      <!-- 字体图标小三角 -->
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}</span>
    </p>
  </div>
  <!-- 文章列表的三图样式 -->
  <div class="articleT" v-else-if="post.type===1 && post.cover.length >=3" @click="handlerClick">
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <img :src="item.url" alt v-for='item in post.cover' :key='item.id'/>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods:{
    // 发出事件
    handlerClick(event){
      this.$emit('click',event)
    }
  }

};
</script>

<style lang='less' scoped>
// 提取复用的样式
// 提取的复用样式
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.article {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;

  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
  }
}
// 视频结构的样式
.articleV {
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  .playarea{
      width: 100%;
      position: relative;
      > img {
        width: 100%;
        display: block;
        margin-bottom: 10px;
      }
      > .playicon{
        position: absolute;
        width: 60/360*100vw;
        height: 60/360*100vw;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.2);
        left:50%; 
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        font-size: 40/360*100vw;
        color: #fff;
        line-height: 65/360*100vw;
        box-shadow: 0 0 15px #fff;
      }
  }
}
// 文章列表三图样式
.articleT{
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  > .imgs {
    display: flex;
    justify-content: space-around;
    > img {
      width: 32.33%;
    }
  }
}
</style>