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
    <hmcell title="昵称" :desc="currentUser.nickname" @click="nicknameshow=!nicknameshow"></hmcell>
    <hmcell
      title="密码"
      :desc="currentUser.password"
      @click="passwordshow=!passwordshow"
      type="password"
    ></hmcell>
    <hmcell title="性别" :desc="currentUser.gender===0?'女':'男'"></hmcell>
    <!-- 添加昵称对话框 -->
    <van-dialog v-model="nicknameshow" @confirm="updateNickname" title="修改昵称" show-cancel-button>
      <van-field :value="currentUser.nickname" ref="nick" label="昵称" placeholder="请输入昵称" required />
    </van-dialog>
    <!-- 添加密码对话框 -->
    <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button :beforeClose="beforeClose">
      <van-field ref="originPass" label="原密码" placeholder="请输入原密码" required />
      <van-field ref="newPass" label="新密码" placeholder="请输入新密码" required />
    </van-dialog>
  </div>
</template>

<script>
// 引入封装好的header
import hmheader from "@/components/hmheader.vue";
// 引入封装的hmcell
import hmcell from "@/components/hmcell.vue";
//引入user.js 调用api方法
import { getUserById } from "@/api/user.js";
// 调用api方法 实现文件上传
import { uploadFile } from "@/api/upload.js";
// 调用api方法 更新个人信息
import { updateUserById } from "@/api/user.js";

export default {
  data() {
    return {
      currentUser: {},
      nicknameshow: false,
      passwordshow: false
    };
  },
  components: {
    hmheader,
    hmcell
  },
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    // console.log(res);
    if (res.data.message == "获取成功") {
      this.currentUser = res.data.data;
      if (this.currentUser.head_img) {
        // 如果有图片就拼接
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        // 如果没有图片，则设置默认图片
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/images/default.png";
      }
    }
  },
  methods: {
    // 上传文件
    async afterRead(file) {
      // 此时可自行将文件上传至服务器
      let formdata = new FormData();
      // file.file是当前的文件对象
      formdata.append("file", file.file);
      let res = await uploadFile(formdata);
      // console.log(res);
      if (res.data.message == "文件上传成功") {
        // 实现图片的预览
        this.currentUser.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        // 再次发送请求 实现头像的更新
        let res1 = await updateUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        // console.log(res1);
        if (res1.data.message == "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    // 修改昵称
    async updateNickname() {
      // 获取用户输入的内容
      let name = this.$refs.nick.$refs.input.value;
      console.log(name);
      let res = await updateUserById(this.currentUser.id, { nickname: name });
      // console.log(res);
      if (res.data.message == "修改成功") {
        this.currentUser.nickname = name;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    // 修改密码
    // async updatePassword(){
    //   // 获取用户输入的原密码，判断原密码是否匹配
    //   // 匹配的话，再获取新密码，验证是否符合正则，符合的话获取新密码 再发送请求 修改密码
    //   let originPass = this.$refs.originPass.$refs.input.value
    //   // console.log(this.currentUser);
    //   if(originPass ==this.currentUser.password){
    //     let newPass = this.$refs.newPass.$refs.input.value
    //     if(/^\S{3,16}$/.test(newPass)){
    //       // 如果新密码符合规范，就发请求修改密码
    //      let res = await updateUserById(this.currentUser.id,{password:newPass});
    //       console.log(res);

    //       if(res.data.messsage=="修改成功"){
    //         this.currentUser.password=newPass
    //         this.$toast.success('修改成功')
    //       }else{
    //         this.$toast.fail('修改失败')

    //       }
    //     }
    //   }
    // },
    // dialog关闭前的回调函数
// 用户体验
// beforeClose(action, done) {
//     console.log(action);
//     // 1.如果用户单击的是确认，那么就需要判断原密码是否输入正确
//     if (action === "confirm") {
//         // 2.获取用户输入的原密码
//         let originPass = this.$refs.originPass.$refs.input.value;
//         // 获取原密码进行密码否正确的判断
//         if (originPass !== this.currentUser.password) {
//             // 3.给出提示
//             this.$toast.fail("原密码输入不正确");
//             // 4.阻止dialog的关闭
//             this.$refs.originPass.$refs.input.select();
//             this.$refs.originPass.$refs.input.focus();
//             done(false);
//         } else if (!/^\S{3,16}$/.test(this.$refs.newPass.$refs.input.value))         {
//             this.$toast.fail("请输入3-16位的新密码");
//             done(false);
//         }else{
//             // 如果这里没有添加done,那么窗口不会关闭且在转啊转
//             done()
//         }
//     } else {
//         done();
//     }
// }
    // 修改密码 简化
    // beforeClose：弹框关闭前的回调函数
    // beforeClose要当做一个属性来用
    async beforeClose(action, done) {
      if (action == "confirm") {
        // 获取用户输入的原密码
        let originPass = this.$refs.originPass.$refs.input.value;
        // 获取新密码
        let newPass = this.$refs.newPass.$refs.input.value;
        if (originPass !== this.currentUser.password) {
          this.$toast.fail("原密码输入不正确，请重新输入");
          this.$refs.originPass.$refs.input.select();
          // 阻止dialog框的关闭
          done(false);
        } else if (!/^\S{3,16}$/.test(newPass)) {
          this.$toast.fail("请输入3-16位密码");
          done(false);
        } else if (
          originPass == this.currentUser.password &&
          /^\S{3,16}$/.test(newPass)
        ) {
          // 发送请求 修改密码
          let res = await updateUserById(this.currentUser.id, {
            password: newPass
          });
          console.log(res);
          if (res.data.message == "修改成功") {
            this.currentUser.password = newPass;
            this.$toast.success("修改成功");
            done();
          } else {
            this.$toast.fail("修改失败");
            done(false);
          }
        }else{
          done()
        }
      }else{
        done()
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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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