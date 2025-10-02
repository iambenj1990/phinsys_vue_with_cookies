import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useUserStore = defineStore('users', {
  state: () => ({
    user: {},
    users: [],
    selected_id: null,
    authenticatedUser: 0,
    isAuthenticated: false,
    message: '',
    credentials:[]
  }),

  actions: {
    async getUsers() {
      try {
        const response = await api.get('/api/system/users')
        this.users = response.data.users
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async getUser(id) {
      try {
        const response = await api.get('/api/system/user/profile/' + id)
        this.user = response.data.user[0]
        // console.log(id)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async newUser(payload) {
      try {
        payload.status = 'Active'
        const response = await api.post('/api/system/user/new', payload)
        // console.log(response.data.success)
        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message: 'User Successfully Saved.',
            position: 'center',
            timeout: 5000,
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async updateUser(id, payload) {
      try {
        console.log(payload)
        // Add password_confirmation if password is being updated
        if (payload.password) {
          payload.password_confirmation = payload.confirm_password
        }
        // Remove confirm_password from payload before sending to API

        console.log('Payload sent to API:', payload)
        const response = await api.put('/api/system/user/profile-update/' + id, {
          ...payload,
          password_confirmation: payload.confirm_password,
        })
        this.user = response.data.user[0]
        // console.log(response.data.success)
        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message: 'User Profile Successfully Updated.',
            position: 'center',
            timeout: 5000,
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async removeUser(id) {
      try {
        const response = await api.post('/api/system/user/profile-remove/' + id)
        // console.log(response.data.success)
        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message: 'User Successfully Removed.',
            position: 'center',
            timeout: 5000,
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },
    async deactivateUser(id) {
      try {
        const response = await api.put('/api/system/user/profile-deactivate/' + id)
        // console.log(response.data.success)
        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message: 'User Successfully Deactivated.',
            position: 'center',
            timeout: 5000,
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async activateUser(id) {
      try {
        const response = await api.put('/api/system/user/profile-activate/' + id)
        // console.log(response.data.success)
        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message: 'User Successfully Activated.',
            position: 'center',
            timeout: 5000,
          })
        }
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async loginUser(credentials) {
      try {
        await api.get('/sanctum/csrf-cookie')

        const response = await api.post('/login', credentials)
        if (response.data.success) {

          this.user = response.data.user
          this.isAuthenticated = true
          this.credentials = response.data.user.credentials
          console.log('authentications store method fired => ',this.credentials)
          return true
        }
        return false
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async authenticatedUserCheck() {
      try {
        const response = await api.get('/api/system/user/authenticated')
        this.user = response.data.user
        this.isAuthenticated = response.data.success
        this.credentials = response.data.user.credentials
        console.log('authentications store method fired => ',this.credentials)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },
    async logoutUser() {
    try {
      await api.post('/logout')
      this.$reset()
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        position: 'center',
        timeout: 5000,
      })
    }
  },
  },


})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
