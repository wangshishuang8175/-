// 导入Vue Router相关函数
import { createRouter, createWebHistory } from 'vue-router'
// 导入基础路由配置
import { constantRoutes } from './routes'
// 导入用户状态管理
import { useUserStore } from '../stores/user'
// 导入权限状态管理
import { usePermissionStore } from '../stores/permission'
// 导入ElMessage
import { ElMessage } from 'element-plus'

// 创建路由实例
const router = createRouter({
  // 使用HTML5 History模式
  history: createWebHistory(),
  // 初始化时只挂载基础路由
  routes: constantRoutes
})

// 定义白名单路由，不需要登录就可以访问
const whiteList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      try {
        // 如果没有用户角色信息，获取用户信息
        if (userStore.roles.length === 0) {
          await userStore.getInfo()
        }
        
        // 如果没有动态路由，生成路由
        if (permissionStore.addRoutes.length === 0) {
          const accessRoutes = await permissionStore.generateRoutes(userStore.roles)
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          // 重新进入当前路由
          return next({ ...to, replace: true })
        }
        next()
      } catch (error) {
        // 发生错误时清除token并重定向到登录页
        await userStore.logout()
        ElMessage.error(error.message || '路由守卫出错')
        next('/login')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

console.log('测试');


// 导出路由实例
export default router 