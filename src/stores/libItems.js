import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
export const useCatalogStore = defineStore('catalog', {
  state: () => ({
   upload_list: [],
   catalog_list: [],

  }),

  actions: {

    async getCatalog() {

    }

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCatalogStore, import.meta.hot))
}
