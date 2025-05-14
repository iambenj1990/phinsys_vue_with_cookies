<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-blue" >Pharmarcy Reports</div>
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
            <q-tab name="Unit" label="Unit" />
            <q-tab name="Configuration" label="Config" />
            <q-tab name="Low" label="Low Stocks" />
            <q-tab name="Dispense" label="Dispense" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Unit">
              <!-- <div class="text-h6">Mails</div> -->
              <units />
            </q-tab-panel>

            <q-tab-panel name="Expired">
              <!-- <div class="text-h6">Alarms</div> -->
              <!-- <expire /> -->
            </q-tab-panel>

            <q-tab-panel name="Low">
              <!-- <div class="text-h6">Movies</div> -->
              <!-- <low /> -->
            </q-tab-panel>

            <q-tab-panel name="Dispense">
              <!-- <div class="text-h6">Movies</div> -->
              <!-- <dispense /> -->
            </q-tab-panel>
          </q-tab-panels>


        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import units from 'src/pages/library/UnitsList.vue'
// import low from 'pages/ItemsNoStockList.vue'
// //import stock from './ItemsMovementList.vue'
// import dispense from './ItemsMonthlyDispenseReport.vue'
// import inventory from './ItemsInventory.vue'

export default {
  name: 'ItemReports',
  components: {
    units,
  },
  setup() {
    return {}
  },
  data() {
    return {
      // Add your component data here
      tab: 'Unit', // Default tab
    }
  },
  methods: {
    onAction() {
      // Add your action logic here
      console.log('Action triggered')
    },
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
