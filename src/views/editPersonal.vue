<template>
  <div class="edit">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <!-- 添加文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
      <!-- 使用封装好的单元格 -->
      <hmcell title="昵称" :desc="currentUser.nickname"></hmcell>
      <hmcell title="密码" :desc="currentUser.nickname"></hmcell>
      <hmcell title="性别" :desc='currentUser.gender===0?"女":"男"'></hmcell>
  </div>
</template>

<script>
// 引入封装好的header
import hmheader from "@/components/hmheader.vue";
// 引入封装的hmcell
import hmcell from "@/components/hmcell.vue"
//引入user.js 调用api方法
import {getUserById} from "@/api/user.js"
export default {
  data() {
    return {
      currentUser: {}
    };
  },
  components: {
    hmheader,hmcell
  },
  async mounted(){
    let res = await getUserById(this.$route.params.id)
    console.log(res);
    if(res.data.message=='获取成功'){
      this.currentUser = res.data.data
      if(this.currentUser.head_img){
        // 如果有图片就拼接
        this.currentUser.head_img='http://127.0.0.1:3000'+this.currentUser.head_img
      }else{
          // 如果没有图片，则设置默认图片
            this.currentUser.head_img = 'http://127.0.0.1:3000/uploads/images/default.png'
      }
    }
  },
  methods:{
    afterRead(){

    }
  }
};
</script>

<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%)
  }
}
/deep/.van-uploader__upload {
  width: 90/360 * 100vw;
  height: 90/360 * 100vw;
}
/deep/.van-uploader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>