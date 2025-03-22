import Mock from 'mockjs'

// 设置延迟时间
Mock.setup({
  timeout: '300-600'
})

// 用户相关接口
Mock.mock('/api/user/login', 'post', options => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      data: {
        token: 'admin-token',
        userInfo: {
          name: '管理员',
          avatar: '',
          roles: ['admin']
        }
      },
      message: '登录成功'
    }
  } else if (username === 'super' && password === '123456') {
    return {
      code: 200,
      data: {
        token: 'super-token',
        userInfo: {
          name: '超级管理员',
          avatar: '',
          roles: ['super-admin']
        }
      },
      message: '登录成功'
    }
  } else if (username === 'user' && password === '123456') {
    return {
      code: 200,
      data: {
        token: 'user-token',
        userInfo: {
          name: '普通用户',
          avatar: '',
          roles: ['user']
        }
      },
      message: '登录成功'
    }
  }
  return {
    code: 401,
    message: '用户名或密码错误'
  }
})

// 文章相关接口
Mock.mock(/\/api\/article\/list/, 'get', {
  code: 200,
  data: {
    'total': 100,
    'items|10': [{
      'id|+1': 1,
      'title': '@ctitle(10, 20)',
      'author': '@cname',
      'category|1': ['技术', '生活', '工作', '其他'],
      'publishTime': '@datetime',
      'views|100-10000': 1000,
      'status|1': ['已发布', '草稿']
    }]
  },
  message: '获取成功'
})

// 商品相关接口
Mock.mock(/\/api\/goods\/list/, 'get', {
  code: 200,
  data: {
    'total': 100,
    'items|10': [{
      'id|+1': 1,
      'name': '@ctitle(5, 10)',
      'category|1': ['手机', '电脑', '平板', '耳机', '配件'],
      'price|1000-10000': 1000,
      'stock|50-200': 50,
      'status|1': ['上架', '下架']
    }]
  },
  message: '获取成功'
})

// 获取用户信息接口
Mock.mock('/api/user/info', 'get', function() {
  // 从 localStorage 获取 token
  const token = localStorage.getItem('token')
  
  if (token === 'admin-token') {
    return {
      code: 200,
      data: {
        roles: ['admin'],
        userInfo: {
          name: '管理员',
          avatar: '',
          introduction: '我是管理员'
        }
      },
      message: '获取成功'
    }
  } else if (token === 'super-token') {
    return {
      code: 200,
      data: {
        roles: ['super-admin'],
        userInfo: {
          name: '超级管理员',
          avatar: '',
          introduction: '我是超级管理员'
        }
      },
      message: '获取成功'
    }
  } else if (token === 'user-token') {
    return {
      code: 200,
      data: {
        roles: ['user'],
        userInfo: {
          name: '普通用户',
          avatar: '',
          introduction: '我是普通用户'
        }
      },
      message: '获取成功'
    }
  }
  
  return {
    code: 401,
    message: '未授权'
  }
})

// 用户登出接口
Mock.mock('/api/user/logout', 'post', {
  code: 200,
  data: null,
  message: '登出成功'
})

export default Mock 