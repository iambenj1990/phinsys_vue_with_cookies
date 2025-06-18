import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    upload_list: [],
    catalog_list: [],
  }),

  actions: {
    async getCatalog() {
      try {
        const response = await api.get('/system/library/medlist')
        this.catalog_list = response.data.items

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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCatalogStore, import.meta.hot))
}
