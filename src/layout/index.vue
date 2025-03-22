<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
      <div class="logo-container">
        <h1 class="logo-title" v-if="!isCollapse">后台管理系统</h1>
        <h1 class="logo-title" v-else>后台</h1>
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          router
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <!-- 一级菜单 -->
          <el-menu-item 
            v-for="route in singleLevelRoutes" 
            :key="route.path"
            :index="route.path"
          >
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
            <template #title>{{ route.meta?.title }}</template>
          </el-menu-item>
          
          <!-- 多级菜单 -->
          <el-sub-menu
            v-for="route in multiLevelRoutes"
            :key="route.path"
            :index="route.path"
          >
            <template #title>
              <el-icon v-if="route.meta?.icon">
                <component :is="route.meta.icon" />
              </el-icon>
              <span>{{ route.meta?.title }}</span>
            </template>
            
            <el-menu-item 
              v-for="child in route.children" 
              :key="child.path"
              :index="`${route.path}/${child.path}`"
            >
              <template #title>{{ child.meta?.title }}</template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 头部导航栏 -->
      <div class="navbar">
        <div class="left-menu">
          <el-icon class="fold-icon" @click="toggleSidebar">
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
        </div>
        <div class="right-menu">
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              {{ userStore.userInfo?.name }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => route.path)
const isCollapse = ref(false)

// 过滤出一级菜单（首页和文章列表）
const singleLevelRoutes = computed(() => {
  const routes = permissionStore.routes || []
  return routes.filter(route => 
    !route.hidden && 
    (route.path === '/dashboard' || route.path === '/article')
  )
})

// 过滤出需要折叠的多级菜单
const multiLevelRoutes = computed(() => {
  const routes = permissionStore.routes || []
  return routes.filter(route => 
    !route.hidden && 
    route.path !== '/dashboard' && 
    route.path !== '/article'
  )
})

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  height: 100%;
  
  .sidebar-container {
    width: 210px;
    transition: width 0.3s;
    height: 100%;
    background-color: #304156;
    
    .logo-container {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2b2f3a;
      
      .logo-title {
        color: #fff;
        font-size: 16px;
        white-space: nowrap;
      }
    }
    
    .sidebar-menu {
      height: 100%;
      border: none;
    }
    
    &.is-collapse {
      width: 64px;
      
      .logo-title {
        font-size: 14px;
      }
    }
  }
  
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .navbar {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      
      .left-menu {
        .fold-icon {
          font-size: 20px;
          cursor: pointer;
          
          &:hover {
            color: #409EFF;
          }
        }
      }
      
      .right-menu {
        margin-left: auto;
        
        .user-dropdown {
          cursor: pointer;
          
          .el-icon {
            margin-left: 5px;
          }
        }
      }
    }
    
    .app-main {
      flex: 1;
      padding: 20px;
      background-color: #f0f2f5;
      overflow-y: auto;
    }
  }
}

.sidebar-container:has(.el-menu--collapse) {
  width: 64px;
}
</style> 