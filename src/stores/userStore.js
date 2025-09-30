import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useUserStore = defineStore('users', {
  state: () => ({
    user: {},
    users: [],
    selected_id: null,
    authenticatedUser:0,
    isAuthenticated: false,
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
        const response = await api.put('/system/user/profile-update/' + id, {
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
   async deactivateUser(id){
      try {
        const response = await api.put('/system/user/profile-deactivate/' + id)
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

   async activateUser(id){
      try {
        const response = await api.put('/system/user/profile-activate/' + id)
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
      await api.get('/sanctum/csrf-cookie');
      console.log('CSRF cookie set');
      console.log('Logging in with credentials:', credentials);
      const response = await api.post('/login', credentials);
      this.user = response.data.user
      console.log('response =>', response);
      return response.data.success
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
        const response = await api.get('/api/user/authenticated');
        this.user = response.data.user;
        this.isAuthenticated = response.data.success;

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
