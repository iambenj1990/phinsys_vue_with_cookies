<template>
  <q-page class="q-pa-md flex flex-block">
    <div class="">
      <div class="text-h4 text-grey q-pa-md">Dashboard</div>
      <q-separator />
      <div class="q-my-sm flex flex-wrap q-px-md justify-end">
        <q-input dense type="date" filled v-model="now_date" class="q-ma-xs" />
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

      <div class="q-pa-md">
        <canvas id="myChart"></canvas>
      </div>
      <div class="q-pa-md">
        <canvas id="CustomerperClassification"></canvas>
      </div>
    </div>
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
    }
  },
  mounted() {
    // Fetch data from API or perform any other setup tasks here
    this.now_date = new Date().toISOString().split('T')[0] // Set default date to today
    this.draw_Per_Brgy_Chart()
    this.draw_Per_CustomerClassification_Chart()
  },
  watch: {
    search(newValue) {
      // Handle search input changes here
      console.log('Search value changed:', newValue)
    },
  },
  methods: {
    // Define any methods you need here

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
              text: 'Customer per Classification',
              position: 'bottom',
            },
          },
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
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
  width: 50%;
  max-width: 100%;
}
</style>
