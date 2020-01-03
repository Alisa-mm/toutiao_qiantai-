<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <input placeholder="请输入手机号" class="input" />
        <input placeholder="密码" class="input" type="password" />
      </div>
      <!-- 使用封装好的按钮 -->
       <hmbutton @click="login">登录</hmbutton>
    </div>
  </div>
</template>

<script>
// 引入封装的button按钮
import hmbutton from "@/components/hmbutton.vue";
export default {
  components: {
    hmbutton
  },
  methods: {
    login() {
      console.log("aaa");
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>