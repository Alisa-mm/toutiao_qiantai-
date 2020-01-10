<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch(userKey)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <router-link to="" v-for="(item,index) in historyList" :key="index" @click="onSearch(item)">{{item}}</router-link>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link :to="{path:`/articleDetail/${item.id}`}" v-for="item in searchList" :key="item.id">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
import {searchArticle} from "@/api/articles.js"
export default {
  data(){
    return {
      userKey:'',
      searchList:[],
      historyList:[]
    }
  },
  mounted () {
      this.historyList=this.getData()
  },
  methods:{
   async onSearch(userKey){
        // 调用方法实现搜索
        // 每次搜索前要把之前的清空
        //  this.searchList.length = 0
        let res= await searchArticle({keyword:userKey});
        console.log(res);
        if(res.data.data.length>0){
            this.searchList=res.data.data
        }
        // 把当前到的搜索存在本地
        let arr = this.getData()
        // 判断搜索内容是否已存在 存在就删除
        // let index=arr.indexOf(userKey)
        if(arr.indexOf(userKey)!==-1){
            arr.splice(arr.indexOf(userKey),1)
        }
        console.log(arr);
        
        // unshift:在数组的最前面插入数据
        arr.unshift(userKey)
        // 把搜索历史存储在本地
        localStorage.setItem('searchHistory',JSON.stringify(arr))
    },
    getData(){
        return JSON.parse(localStorage.getItem('searchHistory')|| '[]')
    }
  }
}
</script>

<style lang='less' scoped>
  .header{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .van-search{
      flex: 1;
      padding: 5px 12px;
    }
  }
  .historyList{
    padding:10px;
    border-bottom: 1px solid #ccc;
    h2{
      line-height: 40px;
      font-weight: bold;
    }
    > a {
      display: block;
      text-decoration: underline;
      line-height: 30px;
      color:#666;
    }
  }
</style>