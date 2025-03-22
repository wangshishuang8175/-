<template>
  <div class="statistics-container">
    <h1>数据统计</h1>
    <el-alert
      title="只有超级管理员和管理员可以访问此页面"
      type="success"
      :closable="false"
    />
    <div class="chart-container">
      <div class="chart-item">
        <h3>访问量统计</h3>
        <div class="chart-placeholder">
          <el-empty description="图表区域" />
        </div>
      </div>
      <div class="chart-item">
        <h3>销售额统计</h3>
        <div class="chart-placeholder">
          <el-empty description="图表区域" />
        </div>
      </div>
    </div>
    <div class="data-summary">
      <el-descriptions title="数据概览" :column="3" border>
        <el-descriptions-item label="今日访问量">1,234</el-descriptions-item>
        <el-descriptions-item label="今日销售额">¥ 12,345</el-descriptions-item>
        <el-descriptions-item label="今日订单数">123</el-descriptions-item>
        <el-descriptions-item label="总用户数">5,432</el-descriptions-item>
        <el-descriptions-item label="总销售额">¥ 543,210</el-descriptions-item>
        <el-descriptions-item label="转化率">12.3%</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
// 统计页面逻辑
</script>

<style lang="scss" scoped>
.statistics-container {
  padding: 20px;
  
  .chart-container {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    
    .chart-item {
      flex: 1;
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      
      .chart-placeholder {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  
  .data-summary {
    margin-top: 20px;
  }
}
</style> 