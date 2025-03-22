// 导入Vue Router相关函数
import { createRouter, createWebHistory } from 'vue-router'
// 导入基础路由配置
import { constantRoutes } from './routes'
// 导入用户状态管理
import { useUserStore } from '../stores/user'
// 导入权限状态管理
import { usePermissionStore } from '../stores/permission'

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
  // 获取用户状态
  const userStore = useUserStore()
  
  // 判断是否有token
  if (userStore.token) {
    // 如果已登录，且要跳转的页面是登录页，则重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 获取权限状态
      const permissionStore = usePermissionStore()
      // 判断用户是否有角色，以及是否已经加载过动态路由
      if (userStore.roles.length > 0 && permissionStore.addRoutes.length === 0) {
        try {
          // 根据角色生成可访问的路由表
          const accessRoutes = await permissionStore.generateRoutes(userStore.roles)
          // 动态添加可访问路由表
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          // 设置 replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 并跳转登录页
          userStore.logout()
          next(`/login?redirect=${to.path}`)
        }
      } else {
        // 已经加载过动态路由，直接放行
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

console.log('测试');


// 导出路由实例
export default router 