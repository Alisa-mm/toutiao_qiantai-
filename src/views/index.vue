<template>
<!-- 顶部栏 -->
  <div class="header">
    <div class="logo">
       <span class="iconfont iconnew"></span>
    </div>
    <div class="search" @click="$router.push({name:'Search'})">
      <span><van-icon name="search" /></span>
      <span>搜索新闻</span>
    </div>
    <div class="user">
      <span><van-icon name="manager-o" /></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.header{
  width: 100%;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#fff;
  .logo{
    .iconnew{
      padding:0 10px;
      font-size: 50px;
    }  
  }
  .search{
    flex:1;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
   line-height: 40px;
   text-align: center;
   background-color:rgba(255,255,255,.5);

  }
  .user{
    font-size: 25px;
    padding:0 10px;
  }
}
</style>