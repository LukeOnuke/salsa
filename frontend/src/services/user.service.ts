import axios, { type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";
import type { UserModel } from "@/models/user.model";

const client = axios.create({
    baseURL: 'http://localhost:8090/api',
    headers: {
        'Accept': 'application/json'
    }
})

export class UserService {
    static async login(email: string, password: string) {
        return client.request({
            url: '/user/login',
            method: 'post',
            data: {
                email,
                password
            }
        })
    }

    static async register(model: any) {
        return client.request({
            url: '/user/register',
            method: 'post',
            data: model
        })
    }

    static async useAxios<T>(
        url: string,
        method: 'get' | 'post' | 'put' | 'delete' = 'get',
        data: any = {},
        retry = true
    ): Promise<AxiosResponse<T, any>> {
        try {
            const accessToken = AuthService.getAccessToken()
            const response = await client.request({
                url,
                method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': accessToken ? `Bearer ${accessToken}` : ''
                },
                data,
                validateStatus: () => true
            })

            // Handle 403 or token expiry (you can customize based on backend error message)
            if (response.status === 403 && retry) {
                const newAccess = await this.refreshAccessToken()
                if (newAccess) {
                    return this.useAxios(url, method, data, false) // retry once
                }
            }

            // Handle other status codes - OK and NO_CONTENT
            if (response.status === 200 || response.status === 204) {
                return response
            }

            if (response.status === 500) {
                throw new Error(response.data.message)
            }

            throw new Error("Status code: " + response.status)

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message)
            } else {
                console.error('Unknown error:', error)
            }
            throw error
        }
    }

    static async refreshAccessToken() {
        const refreshToken = AuthService.getRefreshToken()
        if (!refreshToken) return null

        try {
            const rsp = await client.request({
                url: '/user/refresh',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            })

            AuthService.setTokens(rsp.data)
            return rsp.data.access

        } catch (error) {
            AuthService.clearTokens()
            console.error('Token refresh failed')
            return null
        }
    }

    static async getSelfUser() {
        return await this.useAxios<UserModel>('/user/self')
    }
}