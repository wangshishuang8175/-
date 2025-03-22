import request from '@/utils/request'

// 获取商品列表
export function getGoodsList(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}

// 获取商品详情
export function getGoodsDetail(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}

// 创建商品
export function createGoods(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}

// 更新商品
export function updateGoods(id, data) {
  return request({
    url: `/goods/${id}`,
    method: 'put',
    data
  })
}

// 删除商品
export function deleteGoods(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete'
  })
} 