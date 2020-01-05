<template>
  <div class="edit">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
  </div>
</template>

<script>
// 引入封装好的header
import hmheader from "@/components/hmheader.vue";
export default {
  components: {
    hmheader
  }
};
</script>

<style>
</style>