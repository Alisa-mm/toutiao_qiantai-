import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'

// 引入提示插件
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')
