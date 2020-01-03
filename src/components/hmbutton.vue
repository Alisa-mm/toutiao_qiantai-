<template>
  <div class="btn" @click='handleclick'>
    <slot></slot>
  </div>
</template>

<script>
export default {
    methods:{
      handleclick(event){
        // 告诉父组件，我被点击了，还可以传值过去
        this.$emit('click',event)
      }
    }
}
</script>

<style lang='less' scoped>
 .btn{
       width: 318*100vw/360; 
       height: 50px;
       background-color: red;
       border-radius: 25px;
       line-height: 50px;
       text-align: center;
       color:#fff;
       font-weight: bold;
       font-size: 20px;
 }
</style>