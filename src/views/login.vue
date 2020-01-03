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
      <hmbutton @click="isclick">登录</hmbutton>
    </div>
  </div>
</template>

<script>
// import axios from '@/utils/myaxios.js'
// 引入封装的button按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入封装的文本框组件
import hminput from "@/components/hminput.vue";
// 引入封装好的api方法
import {login} from '@/api/user.js'
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
    // login(){
    // var fff =  axios({
    //     method:'post',
    //     url:'/login',//login登录页面
    //     data:this.user
    // })
    //   console.log(fff);
      
    // }
    // 这里用到async await 可以让我们以同步的方式来调用异步方法，意味着我们可以直接获取异步操作的返回结果
    // await必须处于async函数中，async标记的函数就是await关键字所在的函数
    async isclick() {
      // console.log(this.user);
      // 验证
      if(/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password)){
        let res = await login(this.user)
        console.log(res);
        if(res.data.mssage=='用户不存在'){
          // 给出用户提示信息
          this.$toast.fail(res.data.mssage)
        }else{
          // 实现页面跳转 跳转到个人中心
          this.$router.push({name:'Personal'})
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