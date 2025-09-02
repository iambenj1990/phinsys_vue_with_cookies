import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    customerTransactions: [],
    customerTransaction: {},
    customerTransactionID: 0,
    newCustomerTransactionID: 0,
    customerTransactionsIdList: [],

    SelecteddailyInventory: {},
    maifp_transactions:[],
  }),

  actions: {

    async maif_medication_status(transaction){

      try {
        const response = await api.post('/maif/medication/status', transaction)
        console.log(response.data)
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

    async throw_maif_medication_to_db(transaction){

      try {
        const response = await api.post('/maif/medication/new', transaction)
        this.maifp_transactions = response.data
        console.log(response.data)


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

    async newTransactionID(newCustomerTransaction) {
      try {
        const response = await api.get('/orders/transaction/new/' + newCustomerTransaction)
        this.newCustomerTransactionID = response.data
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async getTransactionID(customer_id) {
      try {
        const response = await api.get('/orders/transaction/unique/' + customer_id)
        // console.log( response.data)
        this.customerTransactionsIdList = response.data
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async newTransaction(payload) {
      try {
        await api.post('/orders/new', payload)
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

    async getTransactionOrders(transaction_id) {
      try {
        const response = await api.get('/orders/transaction/' + transaction_id)
        this.customerTransactions = response.data.transactions
        // console.log(this.customerTransactions)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

      async getLatestOrders(payload) {
      try {
        console.log(payload)
        const response = await api.post('/orders/transactions/last',payload)
        this.customerTransactions = response.data.data
        // console.log(this.customerTransactions)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async remove_order(id) {
      try {
        await api.delete('/orders/order/' + id)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async remove_maifp_order(payload) {
      try {
        console.log('removing maifp order for payload:', payload)
        await api.post('/maif/medication/order', payload)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async getDailyInventory(id) {
      try {
        const response = await api.get('/daily/' + id)
        this.SelecteddailyInventory = response.data.transaction
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async updateDailyInvetory(id, payload) {
      try {
        const response = await api.put('/daily/' + id, payload)
        console.log(response.data)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    async newDailyInventory(payload) {
      try {
        const response = await api.post('/daily/', payload)
        console.log(response.data)
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
  import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}
