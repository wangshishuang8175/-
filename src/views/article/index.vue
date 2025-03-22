<template>
  <div class="article-container">
    <h1>文章列表</h1>
    
    <!-- 搜索和操作区域 -->
    <div class="operation-container">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入文章标题"
        style="width: 200px;"
        clearable
        @clear="handleSearch"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="success" @click="handleAdd">发布文章</el-button>
    </div>
    
    <!-- 文章表格 -->
    <el-table :data="tableData" style="width: 100%; margin-top: 20px;" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" width="250" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="publishTime" label="发布时间" width="180" />
      <el-table-column prop="views" label="阅读量" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '已发布' ? 'success' : 'info'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
// 导入Vue的响应式API
import { ref, onMounted } from 'vue'
// 导入Element Plus消息组件
import { ElMessage, ElMessageBox } from 'element-plus'

// 加载状态
const loading = ref(false)
// 搜索关键词
const searchKeyword = ref('')
// 当前页码
const currentPage = ref(1)
// 每页数量
const pageSize = ref(10)
// 总数据量
const total = ref(0)

// 表格数据
const tableData = ref([
  {
    id: 1,
    title: '如何提高工作效率：10个实用技巧',
    author: '张三',
    category: '职场',
    publishTime: '2023-05-20 10:30:00',
    views: 1520,
    status: '已发布'
  },
  {
    id: 2,
    title: '2023年最值得学习的编程语言',
    author: '李四',
    category: '技术',
    publishTime: '2023-05-18 14:20:00',
    views: 2340,
    status: '已发布'
  },
  {
    id: 3,
    title: '健康饮食：每天应该吃什么',
    author: '王五',
    category: '健康',
    publishTime: '2023-05-15 09:15:00',
    views: 1890,
    status: '已发布'
  },
  {
    id: 4,
    title: '旅行必备：10个实用小物件',
    author: '赵六',
    category: '旅行',
    publishTime: '2023-05-12 16:45:00',
    views: 1230,
    status: '已发布'
  },
  {
    id: 5,
    title: '如何有效管理个人财务',
    author: '张三',
    category: '理财',
    publishTime: '2023-05-10 11:30:00',
    views: 1750,
    status: '已发布'
  },
  {
    id: 6,
    title: '人工智能在医疗领域的应用',
    author: '李四',
    category: '技术',
    publishTime: '2023-05-08 08:20:00',
    views: 2100,
    status: '草稿'
  },
  {
    id: 7,
    title: '如何培养良好的阅读习惯',
    author: '王五',
    category: '教育',
    publishTime: '2023-05-05 15:10:00',
    views: 980,
    status: '已发布'
  }
])

// 生命周期钩子 - 组件挂载完成时
onMounted(() => {
  // 初始化数据
  fetchData()
})

// 获取数据
const fetchData = () => {
  // 模拟加载数据
  loading.value = true
  setTimeout(() => {
    // 设置总数据量
    total.value = tableData.value.length
    loading.value = false
  }, 500)
}

// 处理搜索
const handleSearch = () => {
  // 重置页码
  currentPage.value = 1
  // 模拟搜索
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('搜索成功')
  }, 500)
}

// 处理添加
const handleAdd = () => {
  ElMessage.info('发布文章功能开发中...')
}

// 处理编辑
const handleEdit = (row) => {
  ElMessage.info(`编辑文章: ${row.title}`)
}

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除文章 "${row.title}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage.success(`删除成功: ${row.title}`)
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchData()
}
</script>

<style lang="scss" scoped>
.article-container {
  padding: 20px;
  
  .operation-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style> 