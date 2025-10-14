import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    registered: 0,
    served: 0,
    male: 0,
    female: 0,

    ageData: {
      senior: 0,
      adult: 0,
      children: 0,
    },

    barangayData: [],
    expire: {},
    inStock: 0,
    noStock: 0,
    lowStock: 0, // Assuming you will populate this with data later
    countTemp: 0,

    top10: [], // Assuming you will populate this with data later
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2
  },

  actions: {

    injectToken(){
    const token = localStorage.getItem('auth_token')
    // If token exists, set it in the default headers
    if (token) {
      const sanitized_object = token.replace('__q_strn|', '')
      // console.log('Sanitized token:', sanitized_object)
      api.defaults.headers.common['Authorization'] = `Bearer ${sanitized_object}`
    }
    },



    async customerBarangay(payload) {
      try {
        this.barangayData = []
        const response = await api.get('/api/dashboard/customers/perbrgy', {
          params: payload,
        })

        if (response.status === 200) {
          const data = response.data.barangay
          this.barangayData = data

          //console.log('Barangay data:', data)
        } else {
           Notify.create({
          type: 'negative',
          message:'No barangay data found for the given parameters.' ,
          position: 'center',
          timeout: 5000,
        })
          // console.log('No barangay data found for the given parameters.')
          // console.error('Failed to fetch barangay data:', response.statusText)
        }
      } catch (error) {

        if (error.response && error.response.status === 404) {
          console.error('Barangay data not found')
        }


      }
    },

    async customerAge(payload) {
      try {
        this.ageData.senior = 0
        this.ageData.adult = 0
        this.ageData.children = 0
        const response = await api.get('/api/dashboard/customers/age', {
          params: payload,
        })

        if (response.status === 200) {
          const data = response.data
          this.ageData.senior = data.seniors
          this.ageData.adult = data.adults
          this.ageData.children = data.children
        } else {
          console.error('Failed to fetch customer age data:', response.statusText)
        }
      } catch (error) {
        console.error('Error in customerAge action:', error)
      }
    },

    async customerGenders(payload) {
      try {
        // console.log('Fetching registered customer count with payload:', payload)
        this.male = 0
        this.female = 0
        const response = await api.get('/api/dashboard/customers/gender', {
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

          // console.log('Customer genders count:', this.gender)
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
        const response = await api.get('/api/dashboard/customers/registered', {
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
        // console.log('Fetching served customer count with payload:', payload)
        const response = await api.get('/api/dashboard/customers/served', {
          params: payload,
        })
        if (response.status === 200) {
          this.served = response.data.served_Customers
          // console.log('Customer served count:', response.data)
        } else {
          console.error('Failed to fetch served customer count:', response.statusText)
        }
      } catch (error) {
        console.error('Error in customerServed action:', error)
      }
    },

    async medicineExpiry() {
      try {
        const response = await api.get('/api/dashboard/medicines/expiredStocks')
        if (response.status === 200) {
          const data = response.data
          this.expire = data
          // Assuming data contains the expiry information you need
        } else {
          console.error('Failed to fetch medicine expiry data:', response.statusText)
        }
      } catch (error) {
        console.error('Error in medicineExpiry action:', error)
      }
    },

    async medicineInStock() {
      try {
        const response = await api.get('/api/dashboard/medicines/activeStocks')
        if (response.status === 200) {
          const data = response.data
          this.inStock = data
          // Assuming data contains the in-stock information you need
        } else {
          console.error('Failed to fetch medicine in stock data:', response.statusText)
        }
      } catch (error) {
        console.error('Error in medicineInStock action:', error)
      }
    },

    async medicineNoStock() {
      try {
        const response = await api.get('/api/dashboard/medicines/noStocks')
        if (response.status === 200) {
          const data = response.data.noStock
          this.noStock = data
          // console.log('Out of stock medicines:', this.noStock)
          // Assuming data contains the in-stock information you need
        } else {
          console.error('Failed to fetch medicine in stock data:')
        }
      } catch (error) {
        console.error('Error in medicineInStock action:', error)
      }
    },

       async medicineLowStock(threshold) {
      try {
        const response = await api.get('/api/dashboard/medicines/LowStocks/' + threshold)
        if (response.status === 200) {
          const data = response.data.stocks
          // console.log('Low stock medicines:', data)
          this.lowStock = data ? data : 0
          // console.log('Out of stock medicines:', this.noStock)
          // Assuming data contains the in-stock information you need
        } else {
          console.error('Failed to fetch medicine in stock data:')
        }
      } catch (error) {
        console.error('Error in medicineInStock action:', error)
      }
    },

    async medicineTempPOno() {
      try {
        const response = await api.get('/api/dashboard/medicines/temporary')
        if (response.status === 200) {
          const data = response.data.count
          this.countTemp = data
          // Assuming data contains the in-stock information you need
        } else {
          console.error('Failed to fetch medicine in stock data:', response.statusText)
        }
      } catch (error) {
        console.error('Error in medicineInStock action:', error)
      }
    },

    async medicineTop10() {
      try {
        const response = await api.get('/api/dashboard/medicines/ten')
        if (response.status === 200) {
          const data = response.data.top_ten_medicines
          this.top10 = data
          // Assuming data contains the top 10 medicine information you need
        } else {
          console.error('Failed to fetch top 10 medicines:', response.statusText)
        }
      } catch (error) {
        console.error('Error in medicineTop10 action:', error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}
