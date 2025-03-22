import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '../router/routes'

/**
 * 检查用户角色是否有权限访问路由
 * @param {Array} roles - 用户角色列表
 * @param {Object} route - 路由对象
 * @returns {boolean} - 是否有权限
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 检查路由是否允许当前用户的角色访问
    for (let i = 0; i < roles.length; i++) {
      if (route.meta.roles.includes(roles[i])) {
        return true
      }
    }
    return false
  }
  return true // 如果路由没有设置roles，则所有人都可以访问
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param {Array} routes - 异步路由表
 * @param {Array} roles - 用户角色列表
 * @returns {Array} - 过滤后的路由表
 */
function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route } // 复制一份路由对象
    if (hasPermission(roles, tmp)) { // 检查用户是否有权限访问该路由
      if (tmp.children) {
        // 递归过滤子路由
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp) // 将有权限的路由添加到结果中
    }
  })
  return res
}

// 定义权限状态管理
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [], // 完整的路由表
    addRoutes: [] // 动态添加的路由
  }),
  actions: {
    /**
     * 根据用户角色生成可访问的路由表
     * @param {Array} roles - 用户角色列表
     * @returns {Promise} - 返回可访问的路由表
     */
    generateRoutes(roles) {
      return new Promise(resolve => {
        let accessedRoutes
        // 根据角色过滤路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        this.addRoutes = accessedRoutes // 保存动态添加的路由
        this.routes = constantRoutes.concat(accessedRoutes) // 合并基础路由和动态路由
        resolve(accessedRoutes)
      })
    }
  }
}) 