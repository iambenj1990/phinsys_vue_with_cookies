import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useUserStore = defineStore('users', {
  state: () => ({
    user: {},
    users: [],
  }),

  actions: {
    async getUsers() {
      try {
        const response = await api.get('/system/users')
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
        const response = await api.get('/system/user/profile/' + id)
        this.user = response.data.user
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
        const response = await api.post('/system/user/new', payload)
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
        const response = await api.post('/system/user/profile-update/' + id, payload)
        this.user = response.data.user
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
        const response = await api.post('/system/user/profile-remove/' + id)
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

    async loginUser(payload){
     try {
       await api.get('/sanctum/csrf-cookie');  // Get CSRF cookie first
       const response = await api.post('/user/login', payload);
       if(response.data.Login_Status){
        Notify.create({
          type: 'positive',
          message: 'User Logged-in.',
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
    }
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
