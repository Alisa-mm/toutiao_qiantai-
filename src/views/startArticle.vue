<template>
  <div class="stars">
    <!--使用封装好的头部 -->
    <hmheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <!-- 使用封装好的文章模块 -->

    <van-swipe-cell :before-close="beforeClose"   v-for="item in startList"
        :key="item.id" :name="item.id">
      <hmarticle
        :post="item"
        @click="$router.push({path:`/articleDetail/${item.id}`})"
      ></hmarticle>
      <template slot="right">
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";

import hmarticle from "@/components/hmarticle.vue";

import { getUserStars } from "@/api/user.js";

import {collectArticle} from '@/api/articles.js'

export default {
  data() {
    return {
      startList: []
    };
  },
  components: {
    hmheader,
    hmarticle
  },
  async mounted() {
    let res = await getUserStars();
    console.log(res);
    this.startList = res.data.data;
  },
  methods: {
    beforeClose({name,position, instance }) {
      switch (position) {
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？"
            })
            .then(async () => {
              instance.close();
              console.log(name);
              let res= await collectArticle(name);
              console.log(res);
              if(res.data.message=='取消成功'){
                   this.startList.forEach((value,index)=>{
                       if(value.id==name){
                           this.startList.splice(index,1)
                       }
                   })
              }
              
            });
          break;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.van-button{
    height: 100%;
}
</style>