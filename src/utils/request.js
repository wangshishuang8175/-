import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
// import { storeToRefs } from 'pinia'

// import { toRaw } from 'vue'
// 创建axios实例
const service = axios.create({
  baseURL: '/api', // API的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    if (res.code !== 200) {
      ElMessage({
        message: res.message || '系统错误',
        type: 'error',
        duration: 5 * 1000
      })
      
      // 401: 未授权或Token过期
      if (res.code === 401) {
        // 重新登录
        const userStore = useUserStore()
        userStore.logout().then(() => {
          // 刷新页面
          location.reload()
        })
      }
      
      return Promise.reject(new Error(res.message || '系统错误'))
    }
    return res
  },
  error => {
    console.log('err' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
