import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    upload_list: [],
    catalog_list: [],
  }),

  actions: {
    injectToken() {
      const token = localStorage.getItem('auth_token')
      // If token exists, set it in the default headers
      if (token) {
        const sanitized_object = token.replace('__q_strn|', '')
        console.log('Sanitized token:', sanitized_object)
        api.defaults.headers.common['Authorization'] = `Bearer ${sanitized_object}`
      }
    },
    async getCatalog() {
      try {
        const response = await api.get('/system/library/medlist')
        this.catalog_list = response.data.items
        console.log('Catalog fetched successfully:', this.catalog_list)
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 3000,
        })
      }
    },

    async newCatalog(payload) {
      try {
        this.catalog_list = [] // Clear the catalog list before adding new items
        const response = await api.post('/system/library/medlist/new', payload)
        this.catalog_list = response.data.items
        Notify.create({
          type: 'positive',
          message: 'Catalog created successfully',
          position: 'center',
          timeout: 3000,
        })
      } catch (error) {
        console.error(error)
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 3000,
        })
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCatalogStore, import.meta.hot))
}
