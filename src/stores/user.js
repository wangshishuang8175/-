import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { login, getUserInfo, logout } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 从 localStorage 初始化 token
    token: localStorage.getItem('token') || '',
    userInfo: null,
    roles: []
  }),
  actions: {
    /**
     * 用户登录
     * @param {Object} userInfo - 登录信息
     * @returns {Promise} - 登录结果
     */
    async login(userInfo) {
      try {
        const { username, password } = userInfo
        const response = await login({ username, password })
        const { token, userInfo: info } = response.data
        // 保存 token 到 localStorage
        localStorage.setItem('token', token)
        this.token = token
        this.userInfo = info
        this.roles = info.roles
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * 获取用户信息
     * @returns {Promise} - 用户信息
     */
    async getInfo() {
      try {
        const response = await getUserInfo()
        const { roles, userInfo } = response.data
        this.roles = roles
        this.userInfo = userInfo
        return response
      } catch (error) {
        return Promise.reject(error)
      }
    },

    /**
     * 用户登出
     * @returns {Promise} - 登出结果
     */
    async logout() {
      try {
        await logout()
        const permissionStore = usePermissionStore()
        // 清除 localStorage 中的 token
        localStorage.removeItem('token')
        this.token = ''
        this.roles = []
        this.userInfo = null
        // 重置路由
        permissionStore.resetRoutes()
        // 不在这里处理路由跳转
        return Promise.resolve()
      } catch (error) {
        // 即使请求失败也清除token
        localStorage.removeItem('token')
        this.token = ''
        this.roles = []
        this.userInfo = null
        return Promise.reject(error)
      }
    }
  }
}) 