import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
    roles: []
  }),
  actions: {
    /**
     * 用户登录
     * @param {Object} userInfo - 登录信息
     * @returns {Promise} - 登录结果
     */
    login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        // 这里模拟登录，实际项目中应该调用后端接口
        setTimeout(() => {
          if (username === 'admin' && password === '123456') {
            // 管理员登录
            this.token = 'admin-token'
            this.roles = ['admin'] // 管理员角色
            this.userInfo = { name: '管理员', avatar: '' }
            resolve()
          } else if (username === 'super' && password === '123456') {
            // 超级管理员登录
            this.token = 'super-token'
            this.roles = ['super-admin'] // 超级管理员角色
            this.userInfo = { name: '超级管理员', avatar: '' }
            resolve()
          } else if (username === 'user' && password === '123456') {
            // 普通用户登录
            this.token = 'user-token'
            this.roles = ['user'] // 普通用户角色
            this.userInfo = { name: '普通用户', avatar: '' }
            resolve()
          } else {
            // 登录失败
            reject('用户名或密码错误')
          }
        }, 1000)
      })
    },
    /**
     * 用户登出
     */
    logout() {
      const permissionStore = usePermissionStore()
      this.token = ''
      this.roles = []
      this.userInfo = null
      // 重置路由
      permissionStore.routes = []
      permissionStore.addRoutes = []
      // 刷新页面以重置路由
      location.reload()
    }
  }
}) 