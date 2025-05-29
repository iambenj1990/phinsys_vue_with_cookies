import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    registered: 0,
    served: 0,
    male: 0,
    female: 0,

  }),

  getters: {
    // doubleCount: (state) => state.counter * 2
  },

  actions: {
    async customerGenders(payload) {
      try {
        // console.log('Fetching registered customer count with payload:', payload)
        const response = await api.get('/dashboard/customers/gender', {
          params: payload,
        })
        if (response.status === 200) {
          const data = response.data

          data.by_gender.forEach((entry) => {
            if (entry.gender === 'Male') {
              this.male = entry.count
            } else if (entry.gender === 'Female') {
              this.female = entry.count
            }
          })

           console.log('Customer genders count:',this.gender)
        } else {
          console.error('Failed to fetch registered customer count:', response.statusText)
        }
      } catch (error) {
        console.error('Error in customerRegistered action:', error)
      }
    },

    async customerRegistered(payload) {
      try {
        // console.log('Fetching registered customer count with payload:', payload)
        const response = await api.get('/dashboard/customers/registered', {
          params: payload,
        })
        if (response.status === 200) {
          this.registered = response.data.registered_Customers
          // console.log('Customer registered count:', response.data)
        } else {
          console.error('Failed to fetch registered customer count:', response.statusText)
        }
      } catch (error) {
        console.error('Error in customerRegistered action:', error)
      }
    },

    async customerServed(payload) {
      try {
        console.log('Fetching served customer count with payload:', payload)
        const response = await api.get('/dashboard/customers/served', {
          params: payload,
        })
        if (response.status === 200) {
          this.served = response.data.served_Customers
          console.log('Customer served count:', response.data)
        } else {
          console.error('Failed to fetch served customer count:', response.statusText)
        }
      } catch (error) {
        console.error('Error in customerServed action:', error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}
