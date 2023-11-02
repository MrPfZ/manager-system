import axios, { AxiosError } from 'axios'
import { message } from './AntdGloble'
import { showLoading, hideLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types'

// 创建axios实例对象
const instance = axios.create({
  baseURL: env.baseAPI,
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    config.headers.icode = '8126FAA7CDD41424'
    if (env.mock) {
      config.baseURL = env.mockAPI
    } else {
      config.baseURL = env.baseAPI
    }
    return {
      ...config
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(response => {
  const data: Result = response.data
  hideLoading()
  if (data.code === 500001) {
    // 没有登录或者登录失效，删除token，并重定向到登录页面
    message.error(data.msg)
    storage.remove('token')
    // location.href = './login'
  } else if (data.code != 0) {
    message.error(data.msg)
    return Promise.reject(data)
  }
  return data.data
})

// 封装axios实例
export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  }
}
