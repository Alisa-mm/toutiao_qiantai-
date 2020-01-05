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
      <hmcell title="密码" :desc="currentUser.password" type='password'></hmcell>
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
// 调用api方法 实现文件上传
import {uploadFile} from "@/api/upload.js"
// 调用api方法 更新个人信息
import {updateUserById} from "@/api/user.js"

export default {
  data() {
    return {
      currentUser: {}
    };
  },
  components: {
    hmheader,hmcell,
  },
  async mounted(){
    let res = await getUserById(this.$route.params.id)
    // console.log(res);
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
    
    async afterRead(file){
      // 此时可自行将文件上传至服务器
      let formdata = new FormData()
      // file.file是当前的文件对象
      formdata.append('file',file.file)
      let res = await uploadFile(formdata)
      // console.log(res);
      if(res.data.message=='文件上传成功'){
        // 实现图片的预览
        this.currentUser.head_img='http://127.0.0.1:3000'+res.data.data.url
        // 再次发送请求 实现头像的更新
        let res1 = await updateUserById(this.currentUser.id,{head_img:res.data.data.url})
        // console.log(res1);
        if(res1.data.message=="修改成功"){
          this.$toast.success('修改成功')
        }else{
          this.$toast.fail('修改失败')
        }
        
      }else{
        this.$toast.fail('文件上传失败')
      }
      

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