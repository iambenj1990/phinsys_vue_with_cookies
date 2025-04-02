import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    customerTransactions: [],
    customerTransaction: {},
    customerTransactionID: 0,
    newCustomerTransactionID: 0,
    customerTransactionsIdList:[],

    SelecteddailyInventory:{}
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

    async getTransactionID(customer_id) {
      try {
        const response = await api.get('/orders/transaction/unique/' + customer_id)
        // console.log( response.data)
        this.customerTransactionsIdList = response.data
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

    async getTransactionOrders(transaction_id) {
      try {
        const response = await api.get('/orders/transaction/' + transaction_id)
        this.customerTransactions = response.data.transactions
        // console.log(this.customerTransactions)
      } catch (error) {
        console.log(error)
      }
    },

    async remove_order(id) {
      try {
         await api.delete('/orders/order/'+ id)
      } catch (error) {
        console.log(error)
      }
    },

    async getDailyInventory(id){
      const response = await api.get('/daily/'+id)
      this.SelecteddailyInventory = response.data.transaction
    }
  },


})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}
