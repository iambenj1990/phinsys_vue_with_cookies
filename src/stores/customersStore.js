import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useCustomerStore = defineStore('customers', {
  state: () => ({
    counter: 0,

    customer: {},
    customer_id: 0,
    customers: [],
    customersOftheDay: [],
    transactions_id: '',

    isEdit: false,
    isSave: true,
    closeNewCustomer: false,

    customer_transactions_list: [],
    customer_transactions_list_exploded: [],

    customer_maifp: [],
    customer_maifp_latest_trx: '',

    cust_response: {},
  }),

  actions: {
    async latest_Maifp_trx(payload) {
      try {
        console.log(payload)
        const response = await api.post('/api/maif/transactions/latest', payload)
        this.customer_maifp_latest_trx = response.data.trx_num
        console.log(response.data.trx_num)
      } catch (error) {
        console.log(error)
      }
    },
    async ShowMaifpCustomers() {
      try {
        const response = await api.get('/api/maif/patients/medication')
        console.log(response.data.patients)
        this.customer_maifp = response.data.patients
      } catch (error) {
        console.log(error)
      }
    },

    async store_bulk_customers(payload) {
      try {
        const response = await api.post('/api/customers/bulk', payload)
        console.log(response.data)
        this.customers = response.data.customers
      } catch (error) {
        console.log(error)
      }
    },

    async get_transactions(id) {
      try {
        this.customer_transactions_list = []
        const response = await api.get('/api/customers/transactions/' + id)
        this.customer_transactions_list = response.data.result
      } catch (error) {
        console.log(error)
      }
    },

    async get_transactions_exploded(id, trans_id) {
      try {
        this.customer_transactions_list_exploded = []
        const response = await api.get('/api/customers/transactions/' + id + '/list/' + trans_id)
        this.customer_transactions_list_exploded = response.data.result
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomersByDate(payload) {
      console.log(payload)
      try {
        const response = await api.post('/api/customers/list/dates', payload)
        // console.log(response.data.customers)
        console.log(response.data)
        this.customers = response.data.customers
        // console.log(response.data.customers)
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomers() {
      try {
        const response = await api.get('/api/customers')
        // console.log(response.data.customers)
        this.customers = response.data.customers
        // console.log(response.data.customers)
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomer(id) {
      try {
        this.customer = {}
        const response = await api.get('/api/customers/' + id)
        this.customer = response.data[0]
      } catch (error) {
        console.error(error)
      }
    },

    async newCustomer(payload) {
      try {
        if (!payload.contact_number) {
          payload.contact_number = 'N/A'
        }
        const response = await api.post('/api/customers', payload)

        if (response.data.success) {
          // Set customer_id from response
          this.customer_id = response.data.customers.id ? response.data.customers.id : '0'

          Notify.create({
            type: 'positive',
            message: 'Customer registration successful: ',
            position: 'center',
            timeout: 1200,
          })
        }else{
          console.log('existing name => ',response.data.existing_name)
          console.log('existing id => ',response.data.existing_name[0].id)
          this.customer_id = response.data.existing_name[0].id ? response.data.existing_name[0].id : '0'
        }
      } catch (error) {
        // Get a safe error message
        const message = error.response?.data?.message || error.message || 'Unknown error'

        Notify.create({
          type: 'negative',
          message: 'Customer registration not successful: ' + message,
          position: 'center',
          timeout: 1200,
        })

        console.error('Customer registration failed:', error)
      }
    },

    async updateCustomer(id, payload) {
      try {
        const response = await api.put('/api/customers/' + id, payload)
        this.customer = response.data.customers
      } catch (error) {
        console.log(error)
      }
    },

    async removeCustomer(id) {
      try {
        await api.delete('/customers/' + id)
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomerOftheDay(payload) {
      try {
        const response = await api.get('/api/orders/transaction/latest/' + payload)
        this.customersOftheDay = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}
