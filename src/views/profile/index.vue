<template>
  <div class="profile-container">
    <h1>个人中心</h1>
    <el-alert
      title="所有用户都可以访问此页面"
      type="info"
      :closable="false"
    />
    <div class="profile-content">
      <el-card class="profile-card">
        <div class="user-info">
          <div class="avatar-container">
            <el-avatar :size="100" icon="UserFilled" />
          </div>
          <div class="info-container">
            <h2>{{ userStore.userInfo?.name }}</h2>
            <p>角色: {{ getRoleName(userStore.roles[0]) }}</p>
            <p>账号: {{ userStore.userInfo?.name }}</p>
          </div>
        </div>
        <el-divider />
        <div class="action-container">
          <el-button type="primary">修改密码</el-button>
          <el-button>编辑资料</el-button>
        </div>
      </el-card>
      
      <el-card class="activity-card" header="最近活动">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const activities = ref([
  {
    content: '登录系统',
    timestamp: '2023-05-20 12:30:00',
    type: 'primary'
  },
  {
    content: '更新了个人资料',
    timestamp: '2023-05-19 10:15:00',
    type: 'success'
  },
  {
    content: '发布了新文章',
    timestamp: '2023-05-18 15:45:00',
    type: 'info'
  },
  {
    content: '上传了新图片',
    timestamp: '2023-05-17 09:20:00',
    type: 'warning'
  }
])

const getRoleName = (role) => {
  const roleMap = {
    'super-admin': '超级管理员',
    'admin': '管理员',
    'user': '普通用户'
  }
  return roleMap[role] || role
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
  
  .profile-content {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    
    .profile-card {
      flex: 1;
      
      .user-info {
        display: flex;
        align-items: center;
        
        .avatar-container {
          margin-right: 20px;
        }
        
        .info-container {
          h2 {
            margin-top: 0;
          }
        }
      }
      
      .action-container {
        display: flex;
        justify-content: center;
        gap: 10px;
      }
    }
    
    .activity-card {
      flex: 1;
    }
  }
}
</style> 