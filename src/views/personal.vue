<template>
  <!-- <div class="personal">
      个人中心页面
  </div> -->
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
<van-cell class="cell" title="我的关注" is-link value="关注的用户" />
<van-cell class="cell" title="我的跟帖" is-link value="跟帖/回复" />
<van-cell class="cell" title="我的收藏" is-link value="文章/视频" />
<van-cell class="cell" title="设置"  />
<hmbutton>退出</hmbutton>


    </router-link>
  </div>

</template>

<script>
import hmbutton from "@/components/hmbutton.vue";
import {getUserById} from '@/api/user.js'
export default {
  data () {
    return {
      currentUser:{
        // head_img:''
      },
     
    }
  },
components:{
  hmbutton
}, 
async mounted(){
  // console.log(this.$route.params.id)//拿到id为1
  let res = await getUserById(this.$route.params.id)
  // console.log(res);
  if(res.data.message=='获取成功'){
    // console.log(res);
    this.currentUser=res.data.data
     this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
  }else if(res.data.message=='用户信息验证失败'){
    this.router.push({name:'Login'})
  }
}
}
</script>



<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.cell{
  background-color: #eee;
  border-bottom: 2px solid #ccc
}
</style>
