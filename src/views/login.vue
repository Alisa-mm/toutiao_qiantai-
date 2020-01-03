<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <!-- <div class="inputs">
        <input placeholder="请输入手机号" class="input" />
        <input placeholder="密码" class="input" type="password" />
      </div>-->
      <!-- 使用input组件 -->
      <hminput
        placeholder="请输入用户名"
        :rules="/^(\d{5,6})$|^(1\d{10})$/"
        msg="用户名或手机号输入不正确"
        v-model="user.username"
      ></hminput>
      <hminput placeholder="请输入密码" :rules="/^\S{3,16}$/" 
      msg="请输入3-16位的密码" 
      v-model="user.password"></hminput>
      <!-- 使用封装好的按钮 -->
      <hmbutton @click="login">登录</hmbutton>
    </div>
  </div>
</template>

<script>
// 引入封装的button按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入封装的文本框组件
import hminput from "@/components/hminput.vue";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    login() {
      console.log(this.user);
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