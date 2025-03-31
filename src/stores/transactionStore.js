import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    customerTransactions: [],
    customerTransaction: {},
    customerTransactionID: 0,
    newCustomerTransactionID: 0,
  }),

  actions: {
    async newTransactionID(newCustomerTransaction) {
      try {
        const response = await api.get('/orders/transaction/new/' + newCustomerTransaction)
        this.newCustomerTransactionID = response.data
      } catch (error) {
        console.log(error)
      }
    },

    async newTransaction(payload) {
      try {
         await api.post('/orders/new', payload)
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}
