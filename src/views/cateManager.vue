<template>
  <div class="cate">
    <hmheader title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <div class="mycate">
      <p>点击删除频道</p>
      <span v-for="(item,index) in cateList" :key="item.id" @click="removeCate(index)">{{item.name}}</span>
    </div>
    <div class="mycate">
      <p>点击添加频道</p>
      <span
        v-for="(item,index) in unaddCateList"
        :key="item.id"
        @click="addCate(index)"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";

import { getCateList } from "@/api/articles.js";
export default {
  data() {
    return {
      cateList: [],
      unaddCateList: []
    };
  },
  components: {
    hmheader
  },
  async mounted() {
    // 调用方法 渲染数据
    // 获取已添加栏目数据
    if(localStorage.setItem("cate_data",JSON.stringify(this.cateList))){
        this.cateList=JSON.parse(localStorage.getItem("cate_data"));
    }else{
        let res = await getCateList();
        console.log(res);
        this.cateList = res.data.data;
        // 不用考虑头条和关注
        if (localStorage.getItem("toutiao_token")) {
            // 登录的话默认有关注和头条
            this.cateList = this.cateList.splice(2);
        } else {
            // 未登录的 默认有头条
            this.cateList = this.cateList.splice(1);
        }
    }
    // 获取未添加栏目的数据
    if(localStorage.setItem("add_data",JSON.stringify(this.unaddCateList))){
        this.unaddCateList=JSON.parse(localStorage.getItem("add_data"))
    }
  },
  // 实现栏目的移除
  methods: {
    //   移除栏目
    removeCate(index) {
      // 先添加再移除
      // 将当前栏目添加到“未添加栏目数组”中
      this.unaddCateList.push(this.cateList[index]);
      //  console.log(this.unaddCateList);
      // 移除
      this.cateList.splice(index, 1);
      // 将当前的数据存储在本地
      localStorage.setItem(
        "cate_data",
        JSON.stringify(this.cateList)
      );
      localStorage.setItem(
        "add_data",
        JSON.stringify(this.unaddCateList)
      );
    },
    // 添加栏目
    addCate(index){
        // 将未添加的栏目添加到现有栏目中
        this.cateList.push(this.unaddCateList[index]);
        // 再移除
        this.unaddCateList.splice(index,1)
        //将当前数据存进本地存储
        localStorage.setItem("cate_data",JSON.stringify(this.cateList))
        localStorage.setItem("add_data",JSON.stringify(this.unaddCateList))

    }
  }
};
</script>

<style lang='less' scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>