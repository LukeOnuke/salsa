import type { AuthModel } from "../models/auth.model"

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const EMAIL_KEY = 'email'

export class AuthService {
    static setTokens(auth: AuthModel) {
        localStorage.setItem(ACCESS_TOKEN_KEY, auth.access)
        localStorage.setItem(REFRESH_TOKEN_KEY, auth.refresh)
        localStorage.setItem(EMAIL_KEY, auth.email)
    }
    
    static getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    }
    
    static getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    }
    
    static getUserEmail() {
        return localStorage.getItem(EMAIL_KEY)
    }
    
    static clearTokens() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(EMAIL_KEY)
    }
}
