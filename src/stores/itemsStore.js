import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useItemStore = defineStore('items', {
  state: () => ({
    counter: 0,
    item_id: 0,
    items: [],
    item: {},
    expiring:[],
    expired:[],
    po_items:[]
  }),

  actions: {
    async getItems() {
      try {
        const response = await api.get('/items')
        this.items = response.data.items
      } catch (error) {
        console.error(error)
      }
    },

    async getItem(id) {
      try {
        const response = await api.get('/items/' + id)
        this.item = response.data.items[0]
      } catch (error) {
        console.log(error)
      }
    },

    async getItemsByPO(po_num) {
      try {
        const response = await api.get('/items/po/show/' + po_num)
        this.po_items = response.data.items
      } catch (error) {
        console.log(error)
      }
    },

    async postItem(payload) {
      try {
        const response = await api.post('/items/new', payload)
        console.log(response.data.success)
        console.table(response.data.item)
      } catch (error) {
        console.log(error)
      }
    },

    async updateItem(id, payload) {
      try {
        const response = await api.put('/items/' + id, payload)
        this.item = response.data.item[0]
      } catch (error) {
        console.log(error)
      }
    },

    async deleteItem(id) {
      try {
        const response = await api.delete('/items/' + id)
        console.log(response.data.success, ' --- ', response.data.message)
      } catch (error) {
        console.log(error)
      }
    },

    async deletePOItems(po_no) {
      try {
        const response = await api.delete('/items/po/' + po_no)
        console.log(response.data.success, ' --- ', response.data.message)
      } catch (error) {
        console.log(error)
      }
    },

    async getExpiringItems(){
      try {
        const response = await api.get('/items/expiring')
        this.expiring = response.data.items
        console.log(response.data.success, ' --- ', response.data.message)
      } catch (error) {
        console.log(error)
      }
    },

    async getJoinedTable_DailyInventor_Items(){

      try {
        const response = await  api.get('/items/stock/list')
        this.items = response.data
      } catch (error) {
        console.log(error)
      }
    }



  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemStore, import.meta.hot))
}
