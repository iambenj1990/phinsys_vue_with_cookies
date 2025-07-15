<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-blue">Pharmarcy Reports</div>
        </q-card-section>

        <q-card-section>
          <q-tabs
            align="left"
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="Inventory" label="Inventory" />
            <q-tab name="Expired" label="Expired Stocks" />
            <q-tab name="Low" label="Low Stocks" />
            <q-tab name="Empty" label="Zero Stocks" />
            <q-tab name="Dispense" label="Dispense" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Inventory">
              <!-- <div class="text-h6">Mails</div> -->
              <inventory />
            </q-tab-panel>

            <q-tab-panel name="Expired">
              <!-- <div class="text-h6">Alarms</div> -->
              <expire />
            </q-tab-panel>

            <q-tab-panel name="Low">
              <!-- <div class="text-h6">Movies</div> -->
              <low />
            </q-tab-panel>

            <q-tab-panel name="Empty">
              <!-- <div class="text-h6">Movies</div> -->
              <Empty />
            </q-tab-panel>


            <q-tab-panel name="Dispense">
              <!-- <div class="text-h6">Movies</div> -->
              <dispense />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import expire from 'pages/ItemsExpiredList.vue'
import low from 'src/pages/ItemsLowStockList.vue'
import Empty from 'src/pages/ItemsEmptyStocksList.vue'
//import stock from './ItemsMovementList.vue'
import dispense from './ItemsMonthlyDispenseReport.vue'
import inventory from './ItemsInventory.vue'

export default {
  name: 'ItemReports',
  components: {
    Empty,
    inventory,
    dispense,
    expire,
    low,
    // stock,
  },
  setup() {
    return {}
  },
  data() {
    return {
      // Add your component data here
      tab: 'Inventory', // Default tab
    }
  },
  methods: {
    onAction() {
      // Add your action logic here
      console.log('Action triggered')
    },
  },
  mounted() {
    const tabFromQuery = this.$route.query.tab
    if (tabFromQuery) {
      this.tab = tabFromQuery
    }
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
