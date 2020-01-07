<template>
  <div class="article">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
</template>

<script>
export default {
    props:['post']
};
</script>

<style lang='less' scoped>
.article {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
  .left {
    .content {
      font-size: 14px;
      padding: 0 5px;
    }
    .info {
      font-size: 12px;
      padding-left: 5px;
      color: #999;
      > span:nth-of-type(1) {
        padding-right: 15px;
      }
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
  }
}
</style>