<template>
  <div class="analysis-container">
    <h1>数据分析</h1>
    <el-alert
      title="只有超级管理员可以访问此页面"
      type="warning"
      :closable="false"
    />
    
    <div class="analysis-content">
      <!-- 趋势分析卡片 -->
      <el-card class="analysis-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>趋势分析</span>
            <el-button type="text">查看详情</el-button>
          </div>
        </template>
        <div class="chart-placeholder">
          <el-empty description="趋势图表区域" />
        </div>
      </el-card>
      
      <!-- 用户画像卡片 -->
      <el-card class="analysis-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>用户画像</span>
            <el-button type="text">查看详情</el-button>
          </div>
        </template>
        <div class="chart-placeholder">
          <el-empty description="用户画像图表区域" />
        </div>
      </el-card>
      
      <!-- 数据明细表格 -->
      <el-card class="analysis-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>数据明细</span>
            <el-button type="primary" size="small">导出数据</el-button>
          </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="pv" label="访问量" width="120" />
          <el-table-column prop="uv" label="独立访客" width="120" />
          <el-table-column prop="conversion" label="转化率" width="120" />
          <el-table-column prop="avgTime" label="平均停留时间" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-01-01',
    pv: 1234,
    uv: 890,
    conversion: '12.5%',
    avgTime: '00:05:30'
  },
  {
    date: '2024-01-02',
    pv: 2341,
    uv: 1023,
    conversion: '15.2%',
    avgTime: '00:06:15'
  },
  {
    date: '2024-01-03',
    pv: 1890,
    uv: 956,
    conversion: '13.8%',
    avgTime: '00:04:45'
  }
])
</script>

<style lang="scss" scoped>
.analysis-container {
  padding: 20px;
  
  .analysis-content {
    margin-top: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    
    .analysis-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chart-placeholder {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      // 数据明细表格占据整行
      &:last-child {
        grid-column: span 2;
      }
    }
  }
}
</style> 