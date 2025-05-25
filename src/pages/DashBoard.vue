<template>
    <q-page class="q-pa-md flex justify-center">
  <div class="">
    <div class="text-h5 q-pa-md">Dashboard</div>
    <q-separator />
    <div class="q-my-sm flex flex-wrap q-px-md justify-end">
      <q-input dense type="date" filled v-model="now_date"  class="q-ma-xs" />
    </div>

    <div>

      <div class="text-h6 q-ma-xs  text-green">Medicines
            <q-separator spaced  />
      </div>

        <div class="flex flex-wrap q-px-md q-mb-lg">
          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">In Stock</div>
              <div class="text-h4" align="right">{{ inventoryCount }}</div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">Expired</div>
              <div class="text-h4" align="right">{{ expiredCount }}</div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">Out of Stock</div>
              <div class="text-h4" align="right">{{ outOfStockCount }}</div>
            </q-card-section>
          </q-card>
        </div>
    </div>

     <div class="text-h6 q-ma-xs q-p-md text-green">Customers
          <q-separator spaced label="Section Title" />
     </div>
        <div class="flex flex-wrap q-px-md">
          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">Registered</div>
              <div class="text-h4" align="right">{{ inventoryCount }}</div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">Served</div>
              <div class="text-h4" align="right">{{ expiredCount }}</div>
            </q-card-section>
          </q-card>

          <q-card class="q-ma-xs q-pa-md" style="width: 250px">
            <q-card-section>
              <div class="text-h6 text-weight-medium">Out of Stock</div>
              <div class="text-h4" align="right">{{ outOfStockCount }}</div>
            </q-card-section>
          </q-card>
        </div>



  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
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
      now_date: null,
      search: '',
    }
  },
  mounted() {
    // Fetch data from API or perform any other setup tasks here
    this.now_date = new Date().toISOString().split('T')[0] // Set default date to today
  },
  watch: {
    search(newValue) {
      // Handle search input changes here
      console.log('Search value changed:', newValue)
    },
  },
  methods: {
    // Define any methods you need here
  },
  computed: {
    // Define any computed properties you need here
  },
}
</script>

<style></style>
