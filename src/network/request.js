import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config){
    // 1.创建axios实例
    const instance = axios.create({
        baseURL:'http://localhost:5000/api', //配置请求的根路径
        timeout:10000, // 配置超时时间
    })
    // 配置拦截器 加入token令牌
    instance.interceptors.request.use(config => {
        NProgress.start() // 开启上方的进度条
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    instance.interceptors.response.use(config => {
        NProgress.done() // 关闭上方的进度条
        return config
    })
    // 2. 发送真正的网络请求
    return instance(config)
}