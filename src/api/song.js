import {commonParams} from './config'
import axios from 'axios'
// 获取歌词
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getColor(uu) {
  const url = '/api/color'

  const data = uu;
  return axios.get(url, {
    params: uu
  }).then((res) => {
    return Promise.resolve(res.body)
  })
}