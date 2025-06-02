import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'


export const useCustomerStore = defineStore('customers', {
  state: () => ({
    counter: 0,

    customer: {},
    customer_id: 0,
    customers: [],
    customersOftheDay:[],
    transactions_id:'',

    isEdit: false,
    isSave:true,
    closeNewCustomer:false,

    customer_transactions_list:[],
    customer_transactions_list_exploded:[],

  }),

  actions: {

    async get_transactions(id){
      try {
        this.customer_transactions_list = []
        const response = await api.get('/customers/transactions/' + id )
        this.customer_transactions_list = response.data.result
      } catch (error) {
        console.log(error)
      }
    },

    async get_transactions_exploded(id,trans_id){
      try {
         this.customer_transactions_list_exploded = []
        const response = await api.get('/customers/transactions/' + id + '/list/' + trans_id )
        this.customer_transactions_list_exploded = response.data.result
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomers() {
      try {
        const response = await api.get('/customers')
       // console.log(response.data.customers)
        this.customers = response.data.customers
       // console.log(response.data.customers)
      } catch (error) {
        console.log(error)
      }
    },

    async getCustomer(id) {
      try {
        const response = await api.get('/customers/' + id)
        //console.log(response.data[0])
        this.customer = response.data[0];
        // console.log(this.customer[0])
      } catch (error) {
       console.error( error);
      }
    },

    async newCustomer(payload) {

       try {
         const response = await api.post('/customers', payload)
         this.customers.push(response.data.customers)
         this.customer_id = response.data.customers.id

       } catch (error) {
        console.error( error);
       }


    },

    async updateCustomer(id, payload) {
      try {
        const response = await api.put('/customers/' + id, payload)
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

    async getCustomerOftheDay(payload){
      try {
        const response = await api.get('/orders/transaction/latest/'+ payload)
        this.customersOftheDay= response.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}
