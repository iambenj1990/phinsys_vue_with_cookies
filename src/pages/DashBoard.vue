<template>
  <q-page class="q-pa-md flex flex-block overflow-auto">
    <q-card scrolled class="q-pa-md" style="width: 100%; max-width: 1200px; margin: auto">
      <div class="">
        <div class="text-h4 text-grey q-pa-md">Dashboard</div>
        <q-separator />
        <div class="q-my-sm flex flex-wrap q-px-md justify-end">
          <!-- <q-input dense type="date" filled v-model="now_date" class="q-ma-xs" /> -->
          <q-input v-model="rangeText" label="Select Date Range" dense readonly style="width: 250px;">
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

        <div class="">
          <div class="text-h6 q-ma-xs text-green">
            Medicines
            <q-separator spaced />
          </div>

          <div class="flex flex-wrap q-px-md q-mb-lg">
            <q-card class="q-ma-xs q-pa-md" style="width: 250px">
              <q-card-section>
                <div class="text-subtitle1 text-weight-medium">
                  <q-icon name="inventory_2" color="green" size="50px" class="q-mr-sm" />
                  In Stock
                </div>
                <div class="text-h4" align="right">{{ inventoryCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 250px">
              <q-card-section>
                <div class="text-subtitle1 text-weight-medium">
                  <q-icon name="event_busy" color="green" size="50px" class="q-mr-sm" />
                  Expired
                </div>
                <div class="text-h4" align="right">{{ expiredCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 250px">
              <q-card-section>
                <div class="text-subtitle1 text-weight-medium">
                  <q-icon
                    name="production_quantity_limits"
                    color="green"
                    size="50px"
                    class="q-mr-sm"
                  />
                  Out of Stock
                </div>
                <div class="text-h4" align="right">{{ outOfStockCount }}</div>
              </q-card-section>
            </q-card>

            <q-card class="q-ma-xs q-pa-md" style="width: 250px">
              <q-card-section>
                <div class="text-subtitle1 text-weight-medium">
                  <q-icon name="description" color="green" size="50px" class="q-mr-sm" />
                  Temporary PO #
                </div>
                <div class="text-h4" align="right">{{ expiredCount }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="text-h6 q-ma-xs q-p-md text-green">
          Customers
          <q-separator spaced label="Section Title" />
        </div>
        <div class="flex flex-wrap q-px-md q-mb-lg">
          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-subtitle1 text-weight-medium">
                <q-icon name="people" color="green" size="50px" class="q-mr-sm" />
                Registered
              </div>
              <div class="text-h4" align="right">{{ inventoryCount }}</div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-subtitle1 text-weight-medium">
                <q-icon name="medical_services" color="green" size="50px" class="q-mr-sm" />
                Served
              </div>
              <div class="text-h4" align="right">{{ expiredCount }}</div>
            </q-card-section>
          </q-card>

          <!-- <q-card class="q-ma-xs q-pa-md" style="width: 250px">
          <q-card-section>
            <div class="text-h6 text-weight-medium">Out of Stock</div>
            <div class="text-h4" align="right">{{ outOfStockCount }}</div>
          </q-card-section>
        </q-card> -->
        </div>
        <div class="text-h6 q-ma-xs q-p-md text-green">
          Demographics
          <q-separator spaced label="Section Title" />
        </div>

        <div class="q-pa-md flex flex-center" style="width: 800px">
          <canvas id="myChart"></canvas>
        </div>

        <div class="q-pa-md flex">
          <div class="q-pa-md" style="width: 500px">
            <canvas id="CustomerperClassification"></canvas>
          </div>
          <div class="q-pa-md">
            <canvas id="GenderClassification"></canvas>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'DashBoard',
  setup() {
    // Placeholder data, replace with API calls as needed
    const inventoryCount = ref(120)
    const expiredCount = ref(8)
    const outOfStockCount = ref(15)

    return {
      inventoryCount,
      expiredCount,
      outOfStockCount,
    }
  },
  data() {
    return {
      chart: null,
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
      barangay: [
        'Apokon',
        'Bincungan',
        'Busaon',
        'Canocotan',
        'Cuambogan',
        'La Filipina',
        'Liboganon',
        'Madaum',
        'Magdum',
        'Magugpo East',
        'Magugpo North',
        'Magugpo Poblacion',
        'Magugpo South',
        'Magugpo West',
        'Mankilam',
        'New Balamban',
        'Nueva Fuerza',
        'Pagsabangan',
        'Pandapan',
        'San Agustin',
        'San Isidro',
        'San Miguel (Camp 4)',
        'Visayan Village',
      ],
      classification_person: ['Adult (18-59)', 'Children (0-17)', 'Senion Citizen (60+)'],
      now_date: null,
      search: '',
      barData: [12, 19, 3, 5, 2, 3], // Example data for the bar chart
      genderData: [100, 150],
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
    this.draw_Per_Brgy_Chart()
    this.draw_Per_CustomerClassification_Chart()
    this.GenderCustomerClassification_Chart()
  },
  watch: {
    search(newValue) {
      // Handle search input changes here
      console.log('Search value changed:', newValue)
    },
  },
  methods: {
    // Define any methods you need here
    updateRangeText() {
      const { from, to } = this.range
      this.rangeText = `From: ${from} To: ${to}`
      console.log('Date range updated:', this.range)
    },

    draw_Per_Brgy_Chart() {
      const ctx = document.getElementById('myChart').getContext('2d')

      this.chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: this.barangay,
          datasets: [
            {
              label: 'Customer Visits per Barangay',
              data: this.barData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Customer Visits per Barangay',
              position: 'bottom',
            },
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },

    draw_Per_CustomerClassification_Chart() {
      const ctx = document.getElementById('CustomerperClassification').getContext('2d')

      this.chart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: this.classification_person,
          datasets: [
            {
              label: 'Customer per Classification',
              data: this.barData,
              backgroundColor:  ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },

          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Customer per Classification',
              position: 'bottom',
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },

    GenderCustomerClassification_Chart() {
      const ctx = document.getElementById('GenderClassification').getContext('2d')

      this.chart = new Chart(ctx, {
        type: 'pie',

        data: {
          labels: this.genders,
          datasets: [
            {
              label: 'Gender',
              data: this.genderData,
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Gender per Classification',
              position: 'bottom',
            },
          },
          responsive: true,
          maintainAspectRatio: true,
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
