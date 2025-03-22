<template>
  <div class="image-container">
    <h1>图片列表</h1>
    
    <!-- 搜索和操作区域 -->
    <div class="operation-container">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入图片名称"
        style="width: 200px;"
        clearable
        @clear="handleSearch"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="success" @click="handleUpload">上传图片</el-button>
    </div>
    
    <!-- 图片列表 -->
    <div class="image-list" v-loading="loading">
      <el-card v-for="item in imageList" :key="item.id" class="image-item">
        <div class="image-wrapper">
          <img :src="item.url" :alt="item.name" class="image">
        </div>
        <div class="image-info">
          <div class="image-name">{{ item.name }}</div>
          <div class="image-size">{{ item.size }}</div>
          <div class="image-time">{{ item.uploadTime }}</div>
        </div>
        <div class="image-actions">
          <el-button size="small" @click="handlePreview(item)">预览</el-button>
          <el-button size="small" type="danger" @click="handleDeleteImage(item)">删除</el-button>
        </div>
      </el-card>
    </div>
    
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
    
    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="50%">
      <img :src="previewImage" style="width: 100%;" />
    </el-dialog>
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
const pageSize = ref(12)
// 总数据量
const total = ref(0)
// 预览对话框可见性
const previewVisible = ref(false)
// 预览图片URL
const previewImage = ref('')

// 图片列表数据
const imageList = ref([
  {
    id: 1,
    name: '风景图1.jpg',
    url: 'https://picsum.photos/300/200?random=1',
    size: '1.2MB',
    uploadTime: '2023-05-20 10:30:00'
  },
  {
    id: 2,
    name: '产品展示.jpg',
    url: 'https://picsum.photos/300/200?random=2',
    size: '0.8MB',
    uploadTime: '2023-05-18 14:20:00'
  },
  {
    id: 3,
    name: '用户头像.png',
    url: 'https://picsum.photos/300/200?random=3',
    size: '0.5MB',
    uploadTime: '2023-05-15 09:15:00'
  },
  {
    id: 4,
    name: '背景图.jpg',
    url: 'https://picsum.photos/300/200?random=4',
    size: '2.1MB',
    uploadTime: '2023-05-12 16:45:00'
  },
  {
    id: 5,
    name: 'banner1.jpg',
    url: 'https://picsum.photos/300/200?random=5',
    size: '1.5MB',
    uploadTime: '2023-05-10 11:30:00'
  },
  {
    id: 6,
    name: 'banner2.jpg',
    url: 'https://picsum.photos/300/200?random=6',
    size: '1.6MB',
    uploadTime: '2023-05-08 08:20:00'
  },
  {
    id: 7,
    name: '图标集.png',
    url: 'https://picsum.photos/300/200?random=7',
    size: '0.3MB',
    uploadTime: '2023-05-05 15:10:00'
  },
  {
    id: 8,
    name: '产品细节.jpg',
    url: 'https://picsum.photos/300/200?random=8',
    size: '0.9MB',
    uploadTime: '2023-05-03 13:25:00'
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
    total.value = imageList.value.length
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

// 处理上传
const handleUpload = () => {
  ElMessage.info('上传图片功能开发中...')
}

// 处理预览
const handlePreview = (item) => {
  previewImage.value = item.url
  previewVisible.value = true
}

// 处理删除
const handleDeleteImage = (item) => {
  ElMessageBox.confirm(
    `确定要删除图片 "${item.name}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage.success(`删除成功: ${item.name}`)
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
.image-container {
  padding: 20px;
  
  .operation-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .image-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    
    .image-item {
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
      
      .image-wrapper {
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .image-info {
        padding: 10px 0;
        
        .image-name {
          font-weight: bold;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .image-size, .image-time {
          font-size: 12px;
          color: #999;
          margin-bottom: 3px;
        }
      }
      
      .image-actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style> 