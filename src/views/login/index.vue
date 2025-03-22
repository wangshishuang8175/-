<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      status-icon
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      @keyup.enter="handleLogin"
    >
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          type="text"
          autocomplete="off"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
          autocomplete="off"
          show-password
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <p>超级管理员账号：super / 123456</p>
        <p>管理员账号：admin / 123456</p>
        <p>普通用户账号：user / 123456</p>
      </div>
    </el-form>
  </div>
</template>

<script setup>
// 导入Vue的响应式API
import { ref, reactive } from 'vue'
// 导入Element Plus图标
import { User, Lock } from '@element-plus/icons-vue'
// 导入路由
import { useRouter } from 'vue-router'
// 导入用户状态管理
import { useUserStore } from '@/stores/user'
// 导入Element Plus消息组件
import { ElMessage } from 'element-plus'

// 获取路由实例
const router = useRouter()
// 获取用户状态
const userStore = useUserStore()
// 加载状态
const loading = ref(false)
// 表单引用
const loginFormRef = ref(null)

// 登录表单数据
const loginForm = reactive({
  // 用户名
  username: '',
  // 密码
  password: ''
})

// 表单验证规则
const loginRules = {
  // 用户名验证规则
  username: [
    // 必填项验证
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 长度验证
    { min: 3, message: '用户名长度至少为3个字符', trigger: 'blur' }
  ],
  // 密码验证规则
  password: [
    // 必填项验证
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 长度验证
    { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  // 检查表单引用是否存在
  if (!loginFormRef.value) return
  
  // 验证表单
  await loginFormRef.value.validate(async (valid, fields) => {
    // 如果验证通过
    if (valid) {
      // 设置加载状态
      loading.value = true
      try {
        // 调用登录接口
        await userStore.login(loginForm)
        // 跳转到首页
        router.push('/')
      } catch (error) {
        // 显示错误信息
        ElMessage.error(error || '登录失败')
      } finally {
        // 无论成功失败，都关闭加载状态
        loading.value = false
      }
    } else {
      // 验证失败，输出错误信息
      console.log('验证失败', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  
  .login-form {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 4px;
    
    .title {
      text-align: center;
      margin-bottom: 30px;
      font-size: 26px;
      color: #333;
    }
  }
}

.tips {
  margin-top: 20px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}
</style> 