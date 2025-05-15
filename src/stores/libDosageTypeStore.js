import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useDosageStore = defineStore('dosage', {
  state: () => ({
    counter: 0,
    dosage_id: 0,
    dosageTypes: [],
    dosageInfo: {},
  }),

  actions: {

    async getDosageTypes() {
      try {
        const response = await api.get('/system/library/units')
        this.dosageTypes = response.data.dosages
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 2000,
        })
      }
    },
    async getDosageType(id) {
      try {
        const response = await api.get('/system/library/units/'+ id)
        this.dosageTypes = response.data.dosage
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 2000,
        })
      }
    },

    async newUnit(payload) {
      try {
        await api.post('/system/library/units', payload)
        this.getDosageTypes()
        Notify.create({
          type: 'positive',
          message: 'Unit created successfully',
          position: 'center',
          timeout: 2000,
        })
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async updateDosageType(id,payload) {
      try {
        await api.put('/system/library/units/'+ id, payload)
        this.getDosageTypes()
        Notify.create({
          type: 'positive',
          message: 'Unit updated successfully',
          position: 'center',
          timeout: 2000,
        })
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 2000,
        })
      }
    },

    async removeDosageType(id) {
    try {
      await api.delete('/system/library/units/'+ id)
      this.getDosageTypes()
      Notify.create({
        type: 'positive',
        message: 'Unit deleted successfully',
        position: 'center',
        timeout: 2000,
      })
    } catch (error) {
      console.error(error)
      Notify.create({
        type: 'negative',
        message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        position: 'center',
        timeout: 2000,
      })
    }
  }

  },

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDosageStore, import.meta.hot))
}
