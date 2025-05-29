<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="text-h4 text-grey q-pa-md">Dashboard</div>
      <q-separator />
      <div class="q-my-sm flex flex-wrap q-px-md justify-end">
        <!-- <q-input dense type="date" filled v-model="now_date" class="q-ma-xs" /> -->
        <q-input v-model="rangeText" label="Select Date Range" dense readonly style="width: 250px">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="range"
                  range
                  mask="YYYY-MM-DD"
                  @update:model-value="updateRangeText"
                />
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
            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="inventory_2" color="green" size="30px" class="q-mr-sm" />
                  In Stock
                </div>
                <div class="text-h4" align="right">{{ inventoryCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="event_busy" color="green" size="30px" class="q-mr-sm" />
                  Expired
                </div>
                <div class="text-h4" align="right">{{ expiredCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
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
                <div class="text-h4" align="right">{{ outOfStockCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="description" color="green" size="30px" class="q-mr-sm" />
                  Temporary PO #
                </div>
                <div class="text-h4" align="right">{{ expiredCount }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col col-lg-5">
          <div class="text-h6 q-ma-xs q-p-md text-green">
            Customers
            <q-separator spaced label="Section Title" />
          </div>
          <div class="flex flex-wrap q-px-md q-mb-lg">
            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
              <q-card-section>
                <div class="text-subtitle2 text-weight-medium">
                  <q-icon name="people" color="green" size="30px" class="q-mr-sm" />
                  Registered
                </div>
                <div class="text-h4" align="right">{{ registered_customer }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 220px; height: 110px">
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
            Top 10 Most Requested Medicines
            <q-separator spaced label="Section Title" />
          </div>
          <q-table
            flat
            bordered
            :columns="cols"
            :rows="rows"
            :data="[]"
            :pagination="{
              rowsPerPage: 10,
            }"
            :no-data-label="'No data available'"
            :no-results-label="'No results found'"
            :loading="false"
            :filter="search"
            :filter-method="
              (row, filter) => {
                return row.name.toLowerCase().includes(filter.toLowerCase())
              }
            "
            :row-key="'name'"
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
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-green">Patient Requests per Barangay</div>
            </q-card-section>
            <q-card-section>
              <canvas id="myChart" style="height: 400px; width: 100%"></canvas>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pt-md">
          <div class="col-lg-6">
            <q-card class="flex flex-center">
              <q-card-section class="text-h6 text-green">
                Customer Visitor per Age Classification
              </q-card-section>
              <q-separator spaced />
              <q-card-section>
                <canvas id="CustomerperClassification" style="height: 200px; width: 500px"></canvas>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-6 q-pl-md">
            <q-card class="flex flex-center">
              <q-card-section class="text-h6 text-green">
                Customer Visitor per Gender Classification
              </q-card-section>
              <q-separator spaced />
              <q-card-section>
                <canvas id="GenderClassification" style="height: 200px; width: 500px"></canvas>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import Chart from 'chart.js/auto'
import { useTagumStore } from 'src/stores/TagumStore'
import { useDashboardStore } from 'src/stores/dashboard'
export default {
  name: 'DashBoard',
  setup() {
    // Placeholder data, replace with API calls as needed
    const inventoryCount = ref(120)
    const expiredCount = ref(8)
    const outOfStockCount = ref(15)
    const tagumStore = useTagumStore()
    const dashboardStore = useDashboardStore()
    // Fetch data from the store or API
    return {
      tagumStore,
      dashboardStore,
      inventoryCount,
      expiredCount,
      outOfStockCount,

      cols: [
        {
          name: 'brand_name',
          label: 'Brand Name',
          field: 'brand_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2em',
        },
        {
          name: 'generic_name',
          label: 'Generic Name',
          field: 'generic_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2em',
        },
        {
          name: 'total_dispense',
          label: 'Dispensed',
          field: 'total_dispense',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2em',
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
      genderChart: null,
      brgyChart: null,
      AgeChart: null,

      genders: ['Male', 'Female'],
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],

      classification_person: ['Adult (18-59)', 'Children (0-17)', 'Senion Citizen (60+)'],
      now_date: null,
      search: '',
      barData: [12, 19, 3, 5, 2, 3], // Example data for the bar chart
      genderData: [],
      range: {
        from: '',
        to: '',
      },
      rangeText: '',
    }
  },
  mounted() {
    // Fetch data from API or perform any other setup tasks here
    this.now_date = new Date().toISOString().split('T')[0] // Set default date to today
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    this.range = {
      from: start.toISOString().slice(0, 10),
      to: end.toISOString().slice(0, 10),
    }

    this.updateRangeText()

    this.draw_Per_Brgy_Chart()
    this.draw_Per_CustomerClassification_Chart()
    // this.GenderCustomerClassification_Chart()
  },
  watch: {
    search(newValue) {
      // Handle search input changes here
      console.log('Search value changed:', newValue)
    },
  },
  methods: {
    async get_Gender_Classification(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }
        await this.dashboardStore.customerGenders(data)
        this.customer_male = this.dashboardStore.male
        this.customer_female = this.dashboardStore.female

        console.log('Male:', this.customer_male)
        console.log('Female:', this.customer_female)

        this.genderData = [this.customer_male, this.customer_female]
        console.log('GENDER DATA:',this.genderData)

        // Update chart if already exists
        if (this.genderChart) {
          this.genderChart.data.datasets[0].data = this.genderData
          this.genderChart.update()
        } else {
          this.GenderCustomerClassification_Chart() // draw chart if not created yet
        }
      } catch (error) {
        console.error('Error fetching genders:', error)
      }
    },

    async get_Served_customers(payload) {
      try {
        const data = {
          start_date: payload.from,
          end_date: payload.to,
        }

        await this.dashboardStore.customerServed(data)
        console.log('Sum of customers:', this.dashboardStore.served)
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
    // Define any methods you need here
    updateRangeText() {
      this.rangeText = `${this.range.from} to ${this.range.to}`

      this.get_registered_customers(this.range)
      this.get_Served_customers(this.range)
      this.get_Gender_Classification(this.range)

      // console.log('Date range updated:', this.range)
    },

    draw_Per_Brgy_Chart() {
      const ctx = document.getElementById('myChart').getContext('2d')

      this.brgyChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.tagumStore.barangay,
          datasets: [
            {
              label: 'Customer Visits per Barangay',
              data: this.barData,
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

              borderColor: 'rgb(255, 255, 255)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },

    draw_Per_CustomerClassification_Chart() {
      const ctx = document.getElementById('CustomerperClassification').getContext('2d')

      this.AgeChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.classification_person,
          datasets: [
            {
              label: 'Customer per Classification',
              data: this.barData,
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },

    GenderCustomerClassification_Chart() {
      const ctx = document.getElementById('GenderClassification')
      if (!ctx) return // avoid error if canvas doesn't exist yet

      if (this.genderChart) {
        this.genderChart.destroy()
      }

      this.genderChart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
          labels: this.genders,
          datasets: [
            {
              label: 'Gender',
              data: this.genderData.length ? this.genderData : [0, 0],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    },
  },
  computed: {
    // Define any computed properties you need here
  },
}
</script>

<style scoped>
canvas {
  width: 75%;
  max-width: 100%;
}
</style>
