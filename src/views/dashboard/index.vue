<template>
  <div class="dashboard-container">
    <h1>欢迎使用后台管理系统</h1>
    
    <!-- 数据概览卡片 -->
    <div class="data-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>商品总数</span>
                <el-icon><ShoppingCart /></el-icon>
              </div>
            </template>
            <div class="card-content">
              <div class="number">{{ statistics.goods }}</div>
              <div class="text">件商品</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>文章总数</span>
                <el-icon><Document /></el-icon>
              </div>
            </template>
            <div class="card-content">
              <div class="number">{{ statistics.articles }}</div>
              <div class="text">篇文章</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>用户总数</span>
                <el-icon><User /></el-icon>
              </div>
            </template>
            <div class="card-content">
              <div class="number">{{ statistics.users }}</div>
              <div class="text">位用户</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>图片总数</span>
                <el-icon><Picture /></el-icon>
              </div>
            </template>
            <div class="card-content">
              <div class="number">{{ statistics.images }}</div>
              <div class="text">张图片</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- 系统信息 -->
    <el-card class="system-info" shadow="never">
      <template #header>
        <div class="card-header">
          <span>系统信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
        <el-descriptions-item label="Node版本">v16.0.0</el-descriptions-item>
        <el-descriptions-item label="操作系统">Windows 10</el-descriptions-item>
        <el-descriptions-item label="Vue版本">v3.0.0</el-descriptions-item>
        <el-descriptions-item label="Element Plus">v2.0.0</el-descriptions-item>
        <el-descriptions-item label="Pinia">v2.0.0</el-descriptions-item>
      </el-descriptions>
    </el-card>
    
    <!-- 最近活动 -->
    <el-card class="recent-activity" shadow="never">
      <template #header>
        <div class="card-header">
          <span>最近活动</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :type="activity.type"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingCart, Document, User, Picture } from '@element-plus/icons-vue'

// 统计数据
const statistics = ref({
  goods: 128,
  articles: 85,
  users: 256,
  images: 1024
})

// 活动列表
const activities = ref([
  {
    content: '管理员更新了系统设置',
    timestamp: '2023-05-20 12:30:00',
    type: 'primary'
  },
  {
    content: '新增商品：iPhone 13 Pro',
    timestamp: '2023-05-19 10:15:00',
    type: 'success'
  },
  {
    content: '发布新文章：Vue3最佳实践',
    timestamp: '2023-05-18 15:45:00',
    type: 'info'
  },
  {
    content: '新用户注册：张三',
    timestamp: '2023-05-17 09:20:00',
    type: 'warning'
  }
])
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  h1 {
    margin-bottom: 30px;
    font-size: 24px;
    color: #303133;
  }
  
  .data-overview {
    margin-bottom: 20px;
    
    .el-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }
      
      .card-content {
        text-align: center;
        
        .number {
          font-size: 28px;
          font-weight: bold;
          color: #409EFF;
          margin-bottom: 10px;
        }
        
        .text {
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
  
  .system-info {
    margin-bottom: 20px;
    
    .card-header {
      font-size: 16px;
      font-weight: bold;
    }
  }
  
  .recent-activity {
    .card-header {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style> 