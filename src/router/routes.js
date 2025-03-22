import Layout from '../layout/index.vue'

// 基础路由，所有用户都可以访问
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    meta: { title: '首页', icon: 'House' },
    children: [
      {
        path: '',
        name: 'DashboardIndex',
        component: () => import('../views/dashboard/index.vue')
      }
    ]
  }
]

// 动态路由，根据用户角色动态加载
export const asyncRoutes = [
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    meta: { title: '文章列表', icon: 'Document', roles: ['admin', 'super-admin', 'user'] },
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: () => import('../views/article/index.vue')
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    name: 'Goods',
    meta: { title: '商品管理', icon: 'ShoppingCart', roles: ['admin', 'super-admin', 'user'] },
    children: [
      {
        path: 'index',
        name: 'GoodsList',
        component: () => import('../views/goods/index.vue'),
        meta: { title: '商品列表' }
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    name: 'Image',
    meta: { title: '图片管理', icon: 'Picture', roles: ['admin', 'super-admin'] },
    children: [
      {
        path: 'index',
        name: 'ImageList',
        component: () => import('../views/image/index.vue'),
        meta: { title: '图片列表' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: { title: '用户管理', icon: 'User', roles: ['super-admin'] },
    children: [
      {
        path: 'index',
        name: 'UserList',
        component: () => import('../views/user/index.vue'),
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: 'Statistics',
    meta: { title: '数据统计', icon: 'DataLine', roles: ['admin', 'super-admin'] },
    children: [
      {
        path: 'index',
        name: 'StatisticsIndex',
        component: () => import('../views/statistics/index.vue'),
        meta: { title: '统计概览' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    name: 'Profile',
    meta: { title: '个人中心', icon: 'UserFilled', roles: ['admin', 'super-admin', 'user'] },
    children: [
      {
        path: 'index',
        name: 'ProfileIndex',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '个人信息' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'Setting',
    meta: { title: '系统设置', icon: 'Setting', roles: ['admin', 'super-admin'] },
    children: [
      {
        path: 'index',
        name: 'SettingIndex',
        component: () => import('../views/setting/index.vue'),
        meta: { title: '系统设置' }
      }
    ]
  }
] 