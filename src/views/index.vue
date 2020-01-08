<template>
  <!-- 顶部栏 -->
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <span>
          <van-icon name="search" />
        </span>
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push({path:`personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 标签页 -->
    <div class="nav">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 遍历cateList动态生成标签页 -->
        <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
          <!-- 添加上拉加载结构 -->
          <van-list
            v-model="value.loading"
            :finished="value.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <!-- 添加下拉刷新的结构 -->
            <van-pull-refresh v-model="value.isLoading"  success-text="刷新成功" @refresh="onRefresh">
               <!-- 文章列表数据模块 -->
            <hmarticle v-for="item in value.postList" :key="item.id" :post="item"></hmarticle>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入调用api方法
import { getCateList } from "@/api/cate.js";

import { getNewList } from "@/api/articles.js";

// 引入封装好的文章模块
import hmarticle from "@/components/hmarticle.vue";

export default {
  components: {
    hmarticle
  },
  data() {
    return {
      id: "",
      active: localStorage.getItem("toutiao_token") ? 1 : 0,
      cateList: []
    };
  },
  async mounted() {
    // 获取用户id
    this.id = JSON.parse(localStorage.getItem("userData") || "{}").id;
    // console.log(this.id);//undefined
    //获取所有栏目数据
    let res = await getCateList();
    // console.log(res);
    this.cateList = res.data.data;
    // 对数据进行改造（不同栏目的数据应该是不一样的，所以每个栏目应该有属于自己的新闻列表）
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [],
        pageIndex: 1,
        pageSize: 5, //这个栏目每页所显示的记录数
        loading: false, //这个栏目的加载状态
        finished: false, //这个栏目的数据是否完全加载完毕
        isLoading: false // 这个栏目是否正在下拉刷新
      };
    });
    // console.log( this.cateList);
    //  获取默认栏目的新闻数据，并动态渲染  默认栏目就是this.cateList[this.active]
    // 封装
    this.init();
    // let res1 = await getNewList({
    //   pageIndex: this.cateList[this.active].pageIndex,
    //   pageSize: this.cateList[this.active].pageSize,
    //   category: this.cateList[this.active].id
    // });
    // console.log(res1);

    // // 将数据存进当前的postList栏目中
    // this.cateList[this.active].postList = res1.data.data;
  },
  watch: {
    active() {
      if (this.cateList[this.active].postList.length == 0) {
        this.init();
      }
    }
  },
  methods: {
    async init() {
      let res1 = await getNewList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      });
      console.log(res1.data.data);
      // 将当前栏目的loading重置为false //重置之后就不会一直加载
      this.cateList[this.active].loading = false;
      // 重置isLoading标记
      this.cateList[this.active].isLoading=false //重置之后就不会一直加载
      // 4.将finished设置为false，以便可以继续上拉加载
      this.cateList[this.active].finished=false
      //  如果所有数据加载完毕，则需要手动的将当前栏目的finished重置为true,以显示没有更多数据的提示
      if (res1.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
      // 将数据存进当前的postList栏目中
      // this.cateList[this.active].postList=res1.data.data;
      this.cateList[this.active].postList.push(...res1.data.data);
    },
    // 下拉刷新
    onRefresh(){
      // 重新加载第一页
      // 1.页码重置到第一页
      this.cateList[this.active].pageIndex=1;
      // 2.清空数据
      this.cateList[this.active].postList.length=0
      // 3.发数据 异步请求
       setTimeout(() => {
        // 重新发axios请求 加载数据
        this.init();
      }, 1000);
      


    },
    onLoad() {
      //  加载这个栏目的下一页数据
      this.cateList[this.active].pageIndex++;
      //加一下延迟 看效果
      setTimeout(() => {
        // 重新发axios请求 加载数据
        this.init();
      }, 1000);
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .logo {
    .iconnew {
      padding: 0 10px;
      font-size: 50px;
    }
  }
  .search {
    flex: 1;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .user {
    font-size: 25px;
    padding: 0 10px;
  }
}
</style>