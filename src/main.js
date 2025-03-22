import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './mock' // 引入mock服务

// 添加 ResizeObserver 错误处理
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const handleError = debounce(() => {
  const resizeObserverError = 'ResizeObserver loop completed with undelivered notifications.'
  const error = console.error
  console.error = (...args) => {
    if (args[0] === resizeObserverError) {
      return
    }
    error.apply(console, args)
  }
}, 0)

handleError()

const app = createApp(App)
const pinia = createPinia()

// 注册所有Element Plus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app') 