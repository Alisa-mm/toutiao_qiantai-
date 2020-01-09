<template>
   <div class="stars">
       <!--使用封装好的头部 -->
      <hmheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </hmheader>
      <!-- 使用封装好的文章模块 -->
      <hmarticle v-for="item in startList" :key="item.id" :post='item' @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticle>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue"

import hmarticle from "@/components/hmarticle.vue"

import {getUserStars} from  '@/api/user.js'

export default {
    data () {
        return {
            startList:[]
        }
    },
components:{
    hmheader,hmarticle
},
async mounted () {
    let res= await getUserStars()
    console.log(res);
    this.startList=res.data.data
    
}
}
</script>

<style>

</style>