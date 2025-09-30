// src/services/auth.js
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

class AuthService {

  async login(credentials) {
    try {
      // const response = await api.post('/api/user/login', credentials)
      // // console.log('response =>', response)

      // if (response.data.success) {
      //   // Store token in localStorage
      //   console.log('User authentication token:', response.data.data)
      //   LocalStorage.set('auth_token', response.data.data.token)
      //   LocalStorage.set('user', response.data.data.user)

      //   // Set default authorization header
      //   this.setAuthHeader(response.data.data.token)

      //   return response.data
      await api.get('/sanctum/csrf-cookie');
      console.log('CSRF cookie set');
      console.log('Logging in with credentials:', credentials);
      const response = await api.post('/login', credentials);

      console.log('response =>', response);

    return response.data.user;

    } catch (error) {
      throw error.response?.data || error
    }
  }

  async logout() {
    try {
      await api.post('/user/logout')
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error)
    } finally {
      // Clear local storage and auth header
      LocalStorage.remove('auth_token')
      LocalStorage.remove('user')
      delete api.defaults.headers.common['Authorization']
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/register', userData)

      if (response.data.success) {

        LocalStorage.set('auth_token', response.data.data.token)
        LocalStorage.set('user', response.data.data.user)
        this.setAuthHeader(response.data.data.token)

        return response.data
      }
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async getUser() {
    try {
      const response = await api.get('/user/profile')
      return response.data.data.user
    } catch (error) {
      // If getting user fails, likely token is invalid
      this.logout()
      throw error
    }
  }

  setAuthHeader(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  initializeAuth() {
    const token = LocalStorage.getItem('auth_token')
    if (token) {
      this.setAuthHeader(token)
    }
  }

  isAuthenticated() {
    return !!LocalStorage.getItem('auth_token')
  }

  getToken() {
    return LocalStorage.getItem('auth_token')
  }

  getCurrentUser() {
    return LocalStorage.getItem('user')
  }


  getCredentials(){
    this.initializeAuth()
    try {

        console.error('getting credentials:')
    } catch (error) {
      console.error('Error getting credentials:', error)
      return null
    }
  }
}

export default new AuthService()
