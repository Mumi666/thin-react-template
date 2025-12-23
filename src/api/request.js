import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 15000,
    withCredentials: false,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 统一只返回 data，避免 response.data.data 到处写
        return response.data
    },
    (error) => {
        const { response } = error

        if (response) {
            switch (response.status) {
                case 401:
                    console.warn('未登录 / 登录过期')
                    // TODO: 跳转登录页
                    break
                case 403:
                    console.warn('无权限')
                    break
                case 500:
                    console.warn('服务器错误')
                    break
                default:
                    console.warn('请求错误', response.status)
            }
        }

        return Promise.reject(error)
    }
)

export default service
