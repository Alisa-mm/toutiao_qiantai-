<template>
<!-- 顶部栏 -->
 <div class="index">
    <div class="header">
    <div class="logo">
       <span class="iconfont iconnew"></span>
    </div>
    <div class="search" @click="$router.push({name:'Search'})">
      <span><van-icon name="search" /></span>
      <span>搜索新闻</span>
    </div>
    <div class="user" @click="$router.push({path:`personal/${id}`})" >
      <van-icon name="manager-o" />
    </div>
  </div>
  <!-- 标签页 -->
  <div class="nav">
    <van-tabs v-model="active" sticky swipeable>
      <!-- 遍历cateList动态生成标签页 -->
  <van-tab :title="value.name" v-for='value in cateList' :key='value.id'>内容 1</van-tab>
</van-tabs>
  </div>
 </div>
</template>

<script>
import {getCateList} from '@/api/cate.js'
export default {
  data () {
    return {
      id:'',
      active:localStorage.getItem('toutiao_token')? 1 :0,
      cateList:[]

    }
  },
async mounted () {
  // 获取用户id
  this.id = JSON.parse(localStorage.getItem('userData')||'{}').id
  // console.log(this.id);//undefined
  //获取所有栏目数据
  let res = await getCateList();
  console.log(res);
  this.cateList=res.data.data
  

  
}
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