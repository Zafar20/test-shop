import axios from 'axios'
import { jwtDecode } from "jwt-decode"

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// 🔒 Экземпляр без интерцепторов (для refresh)
const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// Очередь на обновление токена
let isRefreshing = false
let refreshQueue: any[] = []

function logoutUser() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_expiry')
    window.location.href = '/login'
}

type JWTPayload = {
    exp: number   // время истечения в секундах
}

function getTokenExpiry(accessToken: string): number {
    try {
        const payload = jwtDecode<JWTPayload>(accessToken)
        return payload.exp * 1000 // timestamp в миллисекунды
    } catch (err) {
        console.error('Ошибка при декодировании JWT:', err)
        return 0
    }
}

async function refreshToken(): Promise<string> {
    try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw new Error('Нет refresh_token')

        const response = await authApi.post('/auth/login/refresh', { refresh: refreshToken })
        const { access, refresh } = response.data

        // сохраняем новый access_token
        localStorage.setItem('access_token', access)

        // если сервер выдал новый refresh — тоже сохраняем
        if (refresh) {
            localStorage.setItem('refresh_token', refresh)
        }

        // устанавливаем срок истечения на основе exp
        const expiry = getTokenExpiry(access)
        localStorage.setItem('token_expiry', expiry.toString())

        return access
    } catch (err) {
        logoutUser()
        throw err
    }
}

// 🛠 Request interceptor
apiInstance.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('access_token')
        const tokenExpiry = Number(localStorage.getItem('token_expiry'))

        // Если токен истёк → обновляем
        if (tokenExpiry && Date.now() > tokenExpiry) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    accessToken = await refreshToken()
                    refreshQueue.forEach(cb => cb.resolve(accessToken))
                } catch (err) {
                    refreshQueue.forEach(cb => cb.reject(err))
                    throw err
                } finally {
                    isRefreshing = false
                    refreshQueue = []
                }
            } else {
                // Ждем завершения refresh
                return new Promise((resolve, reject) => {
                    refreshQueue.push({
                        resolve: (newToken: string) => {
                            config.headers['Authorization'] = `Bearer ${newToken}`
                            resolve(config)
                        },
                        reject: (err: any) => reject(err),
                    })
                })
            }
        }

        // Добавляем токен в запрос
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// 🛠 Response interceptor
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const newAccessToken = await refreshToken()
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                return apiInstance(originalRequest)
            } catch (err) {
                logoutUser()
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)


export default apiInstance