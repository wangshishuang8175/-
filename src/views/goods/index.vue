<template>
  <div class="goods-container">
    <h1>商品列表</h1>
    
    <!-- 搜索和操作区域 -->
    <div class="operation-container">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入商品名称"
        style="width: 200px;"
        clearable
        @clear="handleSearch"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="success" @click="handleAdd">添加商品</el-button>
    </div>
    
    <!-- 商品表格 -->
    <el-table :data="tableData" style="width: 100%; margin-top: 20px;" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="price" label="价格">
        <template #default="scope">
          ¥{{ scope.row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '上架' ? 'success' : 'info'">
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
    name: 'iPhone 13 Pro',
    category: '手机',
    price: 7999.00,
    stock: 100,
    status: '上架'
  },
  {
    id: 2,
    name: 'MacBook Pro',
    category: '电脑',
    price: 12999.00,
    stock: 50,
    status: '上架'
  },
  {
    id: 3,
    name: 'iPad Air',
    category: '平板',
    price: 4799.00,
    stock: 80,
    status: '上架'
  },
  {
    id: 4,
    name: 'AirPods Pro',
    category: '耳机',
    price: 1999.00,
    stock: 200,
    status: '上架'
  },
  {
    id: 5,
    name: 'Apple Watch',
    category: '智能手表',
    price: 2999.00,
    stock: 60,
    status: '上架'
  },
  {
    id: 6,
    name: 'iMac',
    category: '电脑',
    price: 9999.00,
    stock: 30,
    status: '下架'
  },
  {
    id: 7,
    name: 'HomePod mini',
    category: '智能音箱',
    price: 749.00,
    stock: 150,
    status: '上架'
  },
  {
    id: 8,
    name: 'Magic Keyboard',
    category: '配件',
    price: 999.00,
    stock: 100,
    status: '上架'
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
  ElMessage.info('添加商品功能开发中...')
}

// 处理编辑
const handleEdit = (row) => {
  ElMessage.info(`编辑商品: ${row.name}`)
}

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除商品 "${row.name}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage.success(`删除成功: ${row.name}`)
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
.goods-container {
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