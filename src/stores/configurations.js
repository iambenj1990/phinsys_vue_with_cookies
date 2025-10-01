import { defineStore, acceptHMRUpdate } from 'pinia'
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'

export const useConfigurationsStore = defineStore('configurations', {
  state: () => ({
    // Add your state properties here
    selected_ID: 1,
    normal_color: '',
    low_color: '',
    empty_color: '',
    low_count: 0,
    days_toExpire: 0,

    configuration: {},
  }),
  getters: {
    // Add your getters here
  },
  actions: {
    // Add your actions here
    async updateConfiguration(payload) {
      try {

        const response = await api.put('/api/system/configuration/'+ this.selected_ID +'/config', payload)

        if (response == null) {
          Notify.create({
            type: 'negative',
            message: 'cannot update configuration',
            position: 'center',
            timeout: 5000,
          })
        }
        this.configuration = response.data.configuration


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
    async getConfiguration() {
      try {
        const response = await api.get('/api/system/configuration/'+ this.selected_ID)
        if (response == null) {
          Notify.create({
            type: 'negative',
            message: 'No Configurations Implemented',
            position: 'center',
            timeout: 5000,
          })
        }

        this.configuration = response.data.configuration
        console.log('response => ', this.configuration)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async newConfig(payload) {
      try {
        const response = await api.post('/api/system/configuration/', payload)
        this.configuration = response.data.configuration

        if (response.data.success) {
          Notify.create({
            type: 'positive',
            message:  'Configuration saved!',
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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigurationsStore, import.meta.hot))
}
