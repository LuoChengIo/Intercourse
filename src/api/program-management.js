import request from '@/utils/request'

export function programList(data) {
  return request({
    url: '/programList',
    method: 'post',
    data
  })
}
