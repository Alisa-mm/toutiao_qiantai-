// 封装axios
// 引入axios
import axios from 'axios'

//设置基准路径
axios.defaults.baseURL='http://localhost:3000'

// ......这里只配置了基准路径  需要配置的还有很多 用到的就配置

// 暴露出去
export default axios
