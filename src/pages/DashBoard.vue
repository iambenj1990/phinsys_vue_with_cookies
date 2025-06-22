<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="text-h4 text-grey q-pa-md">Dashboard</div>
      <q-separator />
      <div class="q-my-sm flex flex-wrap q-px-md justify-end">

        <q-input v-model="rangeText" label="Select Date Range" dense readonly style="width: 250px">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="range" range mask="YYYY-MM-DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="row q-gutter-md">
        <div class="col col-lg-6">
          <div class="text-h6 q-ma-xs text-green">
            Medicines
            <q-separator spaced />
          </div>
          <div class="flex flex-wrap q-px-md q-mb-lg">
            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{ this.$router.push({ path: '/items/reports', query: { tab: 'Inventory' } }) }" >
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="inventory_2" color="green" size="30px" class="q-mr-sm" />
                  In Stock
                </div>
                <div class="text-h4" align="right">{{ instock.instock }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{this.$router.push({ path: '/items/reports', query: { tab: 'Expired' }})}">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="event_busy" color="green" size="30px" class="q-mr-sm" />
                  Expired
                </div>
                <div class="text-h4" align="right">{{ expiredData.expired }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{ this.$router.push({ path: '/items/reports', query: { tab: 'Low' }})}" >
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon
                    name="production_quantity_limits"
                    color="green"
                    size="30px"
                    class="q-mr-sm"
                  />
                  Out of Stock
                </div>
                <div class="text-h4" align="right">{{ nostock }}</div>
              </q-card-section>
            </q-card>

              <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{ this.$router.push({ path: '/items/reports', query: { tab: 'Low' }})}">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="description" color="green" size="30px" class="q-mr-sm" />
                  Low Stocks
                </div>
                <div class="text-h4" align="right">{{ countTemporaryPO }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="description" color="green" size="30px" class="q-mr-sm" />
                  Temporary PO #
                </div>
                <div class="text-h4" align="right">{{ countTemporaryPO }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col col-lg-5">
          <div class="text-h6 q-ma-xs q-p-md text-green">
            Patients
            <q-separator spaced label="Section Title" />
          </div>
          <div class="flex flex-wrap q-px-md q-mb-lg">
            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{ this.$router.push({ path: '/customers'})}">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="people" color="green" size="30px" class="q-mr-sm" />
                  Registered
                </div>
                <div class="text-h4" align="right">{{ registered_customer }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px" @click="()=>{ this.$router.push({ path: '/customer/orders'})}">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="medical_services" color="green" size="30px" class="q-mr-sm" />
                  Served
                </div>
                <div class="text-h4" align="right">{{ served_customer }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <div class="row q-pb-lg">
        <div class="col col-lg-12">
          <div class="text-h6 q-ma-xs text-green">
            Top 10 Most Released Medicines
            <q-separator spaced label="Section Title" />
          </div>
          <q-table
            flat
            dense
            bordered
            :columns="cols"
            :rows="rows"
            :pagination="{
              rowsPerPage: 10,
            }"
            :no-data-label="'No data available'"
            :no-results-label="'No results found'"
            :loading-label="'Loading data...'"
          />
        </div>
      </div>

      <q-space />
      <div class="text-h6 q-ma-xs text-green">
        Demographics
        <q-space />
        <q-separator spaced />
      </div>

      <div class="row-span-12">
        <div class="col-9">
          <q-card >
            <q-card-section>
              <div class="text-h6 text-green">Patient Requests per Barangay</div>
              <Bar
                :data="BrgybarChartData"
                :chart-options="chartOptions"
                :key="JSON.stringify(BrgybarChartData.datasets[0].data)"
                :style="{ height: '300px', width: '100%' }"
              >
                Chart couldn't be loaded.
              </Bar>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pt-md flex flex-center">
          <div class="col-lg-6">
            <q-card class="flex flex-center">
              <q-card-section class="text-h6 text-green">
                Patients per Age Classification
              </q-card-section>

              <q-card-section>
                <Bar
                  :data="barChartData"
                  :options="chartOptions"
                  :key="JSON.stringify(barChartData.datasets[0].data)"
                  :style="{ height: '360px', width: '100%' }"
                >
                  Chart couldn't be loaded.
                </Bar>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-5 q-ml-md">
            <q-card class="flex flex-center">
              <q-card-section  class="text-h6 text-green">
                Patients per Gender Classification
              </q-card-section>
              <q-card-section class="q-pa-md">
                <Pie
                  :data="pieChartData"
                  :options="chartOptions"
                  :key="JSON.stringify(pieChartData.datasets[0].data)"
                  :style="{ height: '360px', width: '100%' }"
                >
                  Chart couldn't be loaded.
                </Pie>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useTagumStore } from 'src/stores/TagumStore'
import { useDashboardStore } from 'src/stores/dashboard'
import { Pie, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)

function debounce(fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

export default {
  name: 'DashBoard',
  components: {
    Bar,
    Pie,
  },
  setup() {
    const tagumStore = useTagumStore()
    const dashboardStore = useDashboardStore()

    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    // Fetch data from the store or API
    return {
      start,
      end,
      tagumStore,
      dashboardStore,
      expiredCount: 0,
      outOfStockCount: 0,
      availableCount: 0,

      cols: [
        {
          name: 'brand_name',
          label: 'Brand Name',
          field: 'brand_name',
          sortable: true,
          align: 'left',
         headerClasses: 'bg-green-7 text-white text-subtitle1 text-weight-regular',
        },
        {
          name: 'generic_name',
          label: 'Generic Name',
          field: 'generic_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-green-7 text-white text-subtitle1 text-weight-regular',

        },
        {
          name: 'total_quantity_out',
          label: 'Dispensed',
          field: 'total_quantity_out',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-green-7 text-white text-subtitle1 text-weight-regular',

        },
      ],
    }
  },
  data() {
    return {
      registered_customer: 0,
      served_customer: 0,
      customer_male: 0,
      customer_female: 0,
      rows: [],
      genders: ['Male', 'Female'],
      classification_person: ['Adult (18-59)', 'Children (0-17)', 'Senior Citizen (60+)'],
      now_date: null,
      ageData: { children: 0, adult: 0, senior: 0 }, // Example data for the bar chart
      genderData: [],
      barangayData: [], // Example data for the bar chart
      range: {
        from: '',
        to: '',
      },
      rangeText: '',
      expiredData: {},
      instock: 0,
      nostock: 0,
      countTemporaryPO: 0,
      top10_medicine: [],
      backgroundColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(199, 199, 199)',
        'rgb(83, 102, 255)',
        'rgb(255, 102, 255)',
        'rgb(102, 255, 204)',
        'rgb(204, 255, 102)',
        'rgb(255, 204, 102)',
        'rgb(102, 255, 102)',
        'rgb(255, 102, 102)',
        'rgb(102, 153, 255)',
        'rgb(255, 153, 204)',
        'rgb(153, 255, 255)',
        'rgb(204, 102, 255)',
        'rgb(102, 204, 255)',
        'rgb(255, 255, 102)',
        'rgb(153, 255, 153)',
        'rgb(255, 153, 153)',
        'rgb(192, 192, 75)',
      ],
      BrgybarChartData: {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: [],
            data: [],
          },
        ],
      },
      barChartData: {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: [],
            data: [],
          },
        ],
      },

      pieChartData: {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: ['#26C281', '#FAA945'],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: 20,
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    }
  },
  computed: {
    // Computed properties can be added here if needed

  },

  mounted() {
     this.dashboardStore.injectToken() // Ensure the token is injected before making API calls
    // Fetch data from API or perform any other setup tasks here
    //this.now_date = new Date().toISOString().split('T')[0] // Set default date to today
    try {
      this.range = {
        from: this.start.toISOString().split('T')[0],
        to: this.end.toISOString().split('T')[0],
      }

      // console.log('Initial date range:', this.range)

      this.get_medicine_expired()
      this.get_medicine_instock()
      this.get_medicine_noStocks()
      this.get_medicine_temporaryPO()
      this.get_medicine_top10()
    } catch (error) {
      console.error('Error in mounted hook:', error)
    }
  },

  watch: {


    range: {
      handler: debounce(function (newRange) {
        this.rangeText = `${newRange.from} to ${newRange.to}`

        this.get_registered_customers(newRange)
        this.get_Served_customers(newRange)
        this.get_Gender_Classification(newRange)
        this.get_Age_Classification(newRange)
        this.get_Barangay_Classification(newRange)
      }, 500),
      immediate: true, // Call the handler immediately with the initial value
      deep: true, // Watch for changes in the object properties
    },
  },

  methods: {

    async get_Served_customers(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }

        await this.dashboardStore.customerServed(data)
        // console.log('Sum of customers:', this.dashboardStore.served)
        this.served_customer = this.dashboardStore.served // Assuming the API returns the sum of all served customers
      } catch (error) {
        console.error('Error fetching served customers:', error)
      }
    },

    async get_registered_customers(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }

        // console.log('Date range on payload:', data)

        await this.dashboardStore.customerRegistered(data)
        this.registered_customer = this.dashboardStore.registered // Assuming the API returns an array of customer data
      } catch (error) {
        console.error('Error fetching registered customers:', error)
      }
    },

    async get_Barangay_Classification(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }


        await this.dashboardStore.customerBarangay(data)



        // console.log('Barangay data:', this.dashboardStore.barangayData)
        const rawBarangayData = this.dashboardStore.barangayData
        const brgy_labels = this.tagumStore.barangay // static label list

        // Create mapping from API response
        const brgy_mapping = {}
        rawBarangayData.forEach((item) => {
          brgy_mapping[item.barangay] = item.count
          // console.log(`Mapping: ${item.barangay} -> ${item.count}`)
        })

        // Generate counts in correct order
        const counts = brgy_labels.map((brgy) => brgy_mapping[brgy] || 0)
        // Pass labels and counts to the chart drawing function

        this.BrgybarChartData.labels = this.tagumStore.barangay // Assuming the API returns an array of barangay names
        this.BrgybarChartData.datasets[0].label = 'Patients'
        this.BrgybarChartData.datasets[0].data = counts
        this.BrgybarChartData.datasets[0].backgroundColor = this.backgroundColor
        // Assuming the API returns an array of counts for each barangay
      } catch (error) {
        console.error('Error fetching barangay classification:', error)
      }
    },

    async get_Age_Classification(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }
        await this.dashboardStore.customerAge(data)
        this.ageData.children = this.dashboardStore.ageData.children // Assuming the API returns an object with age classification data
        this.ageData.adult = this.dashboardStore.ageData.adult
        this.ageData.senior = this.dashboardStore.ageData.senior

        const ages = [this.ageData.adult, this.ageData.children, this.ageData.senior]

        this.barChartData.labels = this.classification_person
        this.barChartData.datasets[0].label = 'Patients per Age Classification'
        this.barChartData.datasets[0].data = ages
        this.barChartData.datasets[0].backgroundColor = this.backgroundColor
      } catch (error) {
        console.error('Error fetching age classification:', error)
      }
    },

    async get_Gender_Classification(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }
        await this.dashboardStore.customerGenders(data)
        this.customer_male = this.dashboardStore.male
        this.customer_female = this.dashboardStore.female

        this.genderData = [this.customer_male, this.customer_female]

        // draw chart if not created yet
        if (!this.pieChartData || !this.pieChartData.datasets) return

        this.pieChartData.labels = this.genders
        this.pieChartData.datasets[0].label = 'Patients per Gender'
        this.pieChartData.datasets[0].data = this.genderData
      } catch (error) {
        console.error('Error fetching genders:', error)
      }
    },

    async get_medicine_expired() {
      try {
        await this.dashboardStore.medicineExpiry()
        this.expiredData = this.dashboardStore.expire // Assuming the API returns the count of expired medicines
      } catch (error) {
        console.error('Error fetching expired medicines:', error)
      }
    },

    async get_medicine_instock() {
      try {
        await this.dashboardStore.medicineInStock()
        this.instock = this.dashboardStore.inStock // Assuming the API returns the count of medicines in stock
      } catch (error) {
        console.error('Error fetching medicines in stock:', error)
      }
    },

    async get_medicine_noStocks() {
      try {
        await this.dashboardStore.medicineNoStock()
        this.nostock = this.dashboardStore.noStock // Assuming the API returns the count of out of stock medicines
      } catch (error) {
        console.error('Error fetching out of stock medicines:', error)
      }
    },

    async get_medicine_temporaryPO() {
      try {
        await this.dashboardStore.medicineTempPOno()
        this.countTemporaryPO = this.dashboardStore.countTemp // Assuming the API returns the count of out of stock medicines
      } catch (error) {
        console.error('Error fetching out of stock medicines:', error)
      }
    },

    async get_medicine_top10() {
      try {
        await this.dashboardStore.medicineTop10()
        this.top10_medicine = this.dashboardStore.top10 // Assuming the API returns the count of out of stock medicines
        this.rows = this.top10_medicine // Assigning top 10 medicine data to rows for the table
        // console.log('Top 10 medicines:', this.rows)
      } catch (error) {
        console.error('Error fetching top 10 medicines:', error)
      }
    },
  },
}
</script>

<style scoped></style>
