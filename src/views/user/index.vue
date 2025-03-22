<template>
  <div class="user-container">
    <h1>用户管理</h1>
    <el-alert
      title="只有超级管理员可以访问此页面"
      type="success"
      :closable="false"
    />
    <div class="content">
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="用户名" width="180" />
        <el-table-column prop="role" label="角色" width="180" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '激活' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 用户表格数据
const tableData = ref([
  {
    id: 1,
    name: 'admin',
    role: '管理员',
    email: 'admin@example.com',
    status: '激活'
  },
  {
    id: 2,
    name: 'user',
    role: '普通用户',
    email: 'user@example.com',
    status: '激活'
  },
  {
    id: 3,
    name: 'test',
    role: '普通用户',
    email: 'test@example.com',
    status: '禁用'
  }
])
</script>

<style lang="scss" scoped>
.user-container {
  padding: 20px;
  
  .content {
    margin-top: 20px;
  }
}
</style> 