<template>
  <q-page class="">
    <div class="q-pa-md" style="width: 100%">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-green">Items Adjustment Form</div>
          <div class="text-caption text-grey">
            You can use this form to adjust the items quantity in the inventory.
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-subtitle1 text-grey q-pa-md">Item Information</div>
          <!-- Row 1: PO No. (half width) -->
          <div class="row q-pa-md q-gutter-md">
            <div class="col-12 col-sm-2">
              <q-input v-model="MedicineData.po_no" class="text-caption full-width" filled label="PO No." dense />
            </div>
          </div>

          <!-- Row 2: 4 equal columns -->
          <div class="row q-pa-md q-gutter-md">
            <div class="col-12 col-md-4">
              <q-input v-model="MedicineData.brand_name" class="text-caption full-width" filled label="Brand Name" dense />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="MedicineData.generic_name" class="text-caption full-width" filled label="Generic Name" dense />
            </div>

            <div class="col-12 col-md-2">
              <q-input v-model="MedicineData.expiration_date" class="text-caption full-width" filled label="Expiration Date" dense />
            </div>

            <div class="col-12 col-md-2">
              <q-input v-model="MedicineData.dosage" class="text-caption full-width" filled label="Dosage" dense />
            </div>

            <div class="col-12 col-md-2">
              <q-input v-model="MedicineCurrentQuantity" class="text-caption full-width" filled label="Current Quantity" dense />
            </div>
          </div>
          <q-separator />

          <div class="text-subtitle1 text-grey q-pa-md">Quantity to Adjust</div>

          <div class="row q-pa-md q-gutter-md">
            <div class="col-12 col-md-2">
              <q-select
                class="text-caption full-width"
                filled
                label="Adjustment Type"
                dense
                :options="AdjustmentTypeSeletiion"
              />
            </div>
            <div class="col-12 col-md-2">
              <q-input class="text-caption full-width" filled label="Adjustment Quantity" dense />
            </div>
          </div>
          <div class="row q-pa-md q-gutter-md">
            <div class="col-12 col-md-12">
              <q-input
                class="text-caption full-width"
                filled
                label="Reason for Adjustment"
                type="textarea"
                dense
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <div class="q-pa-md q-gutter-md">
            <q-btn label="Cancel" color="grey" flat />
            <q-btn label="Submit" color="primary" />
          </div>
        </q-card-actions>
      </q-card></div
  ></q-page>
</template>
<script>
import { useItemAdjustmentStore } from '../stores/ItemAdjustmentStore'
export default {
  name: 'ItemsAdjustmentForm',

  
  setup() {
    const itemAdjustmentStore = useItemAdjustmentStore()
    return {
      itemAdjustmentStore,
      AdjustmentTypeSeletiion: [
        'Physical Count Adjustment',
        'Inventory Reconciliation',
        'Encoding Error Correction',
      ],
    }
  },
  data() {
    return {
     
      MedicineData: {},
      MedicineCurrentQuantity: 0,
      AdjustmentData: {},
    }
  },

  mounted() {
    // Example payload, replace with actual data as needed
    const payload = 662; // Replace with actual item ID
    
    this.fetchMedicineData(payload)
    console.log('Medicine Data:', this.MedicineData) 
    console.log('Current Quantity:', this.MedicineCurrentQuantity)

  },

  methods: {
    async fetchMedicineData(payload) {
      try {
       await this.itemAdjustmentStore.getSelectedItemDescription(payload)
        this.MedicineData = this.itemAdjustmentStore.selectedItemDescription
        this.MedicineCurrentQuantity = this.itemAdjustmentStore.currentItemQuantity
      } catch (error) {
        console.error('Error fetching medicine data:', error)
      }
    },
   
  },
}
</script>
<style scoped></style>
