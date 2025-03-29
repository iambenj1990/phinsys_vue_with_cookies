<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <q-card-section>
          <div align="left" class="text-h6 text-primary">Medicine Information</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <div>
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.po_no"
                label="Purchase Order Number"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Purchase Order Number is required']"
              />
            </div>
          </div>
          <q-separator></q-separator>
          <div class="row q-gutter-md">
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.brand_name"
                label="Brand Name"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Brand Name is required']"
              />
            </div>
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.generic_name"
                label="Generic Name"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Generic Name is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.dosage"
                label="Dosage"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Dosage is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-select
                dense
                v-model="MedicineInfo.dosage_form"
                :options="MedType"
                label="Dosage form"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Dosage form is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.quantity"
                label="Quantity"
                type="number"
                class="full-width"
                inputmode="numeric"
                lazy-rules
                :rules="[(val) => !!val || 'Quantity is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-select
                dense
                v-model="MedicineInfo.unit"
                :options="sUnit"
                label="Unit"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Unit quantity is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.expiration_date"
                type="date"
                label="Expiration Date"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Expiration date is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.price"
                label="Price"
                type="number"
                class="full-width"
                inputmode="numeric"
                lazy-rules
                :rules="[(val) => !!val || 'Price is required']"
              />
            </div>
          </div>

        </q-card-section>

        <!-- <div class="row q-gutter-md q-pt-md">
                    <div class="col-11 flex justify-end q-pa-md-lg">
                        <q-btn type="submit" label="Save" class=" q-mr-sm" color="primary" /> -->
        <!-- <q-btn type="button" label="Cancel" class="q-mr-md q-ml-md" color="red" /> -->
        <!-- </div> -->
        <!-- </div> -->
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="isOpen = false" />
          <q-btn type="submit" label="Save" class="" color="primary" @click="post_Medicine()" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      columns: [],
      sType: ['Medicine', 'Medical Gadget'],
      MedType: ['Tablet', 'Capsule', 'Syrup', 'Powder'],
      sUnit: ['PCS', 'BOX'],
    }
  },
  data() {
    return {
      rows: [],
      MedicineInfo: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: '',
        unit: '',
        quantity: '',
        price: 0,
        expiration_date: '',
        user_id: 0,
      },
    }
  },
}
</script>

<style></style>
