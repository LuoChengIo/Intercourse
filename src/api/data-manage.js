import request from '@/utils/request'

export function inquireList(data) {
  return request({
    url: '/inquireList',
    method: 'post',
    data
  })
}
