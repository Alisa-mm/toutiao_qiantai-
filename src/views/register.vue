<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <hminput
        placeholder="用户名/手机密码"
        :rules="/^(\d{5,6})$|^(1\d{10})$/"
        msg="用户名或手机号输入不合法"
        v-model="user.username"
      ></hminput>
      <hminput placeholder="昵称" :rules=" /^\S{1,16}$/" msg="昵称不能为空" v-model="user.nickname"></hminput>
      <hminput placeholder="密码" :rules="/^\S{3,16}$/" msg="请输入3-16位的密码" v-model="user.password"></hminput>

      <hmbutton @click="Register">注册</hmbutton>
      <p class="tips">
        有账号？
        <a href="#/" class>去登录</a>
      </p>
    </div>
  </div>
</template>

<script>
// 引入封装的button按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入封装的文本框组件
import hminput from "@/components/hminput.vue";
// 引入封装好的api方法
import { register } from "@/api/user.js";
export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    async Register() {
      // console.log('11');
      if (
        /^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) &&
        /^\S{3,16}$/.test(this.user.password)
      ) {
        let res = await register(this.user);
        console.log(res);
        if (res.data.message === "用户名已经存在") {
          // 给出用户提示信息
          this.$toast.fail(res.data.message);
        } else {
          // 实现页面跳转 跳转到个人中心
          this.$router.push({ name: "Personal" });
        }
      }else{
           this.$toast.fail('用户数据输入不合法')
      }
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