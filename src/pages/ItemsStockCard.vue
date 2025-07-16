<template>
  <q-page class="q-pa-xl">
    <q-form ref="configForm" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-2 rounded-borders">
        <q-card-section>
          <div class="text-h6 q-mb-md text-green">Item Stockcard</div>

          <div class="q-gutter-md row q-pb-md">
            <div class="col-md-12 col-md-3">
              <q-input v-model="po_no" label="PO No" outlined dense required />
            </div>
          </div>

          <div class="q-gutter-md row q-pb-md">
            <div class="col-md-3">
              <q-input v-model="generic_name" label="Generic Name" outlined dense required />
            </div>
            <div class="col-md-3">
              <q-input v-model="brand_name" label="Brand Name" outlined dense required />
            </div>
            <div class="col-md-3">
              <q-input v-model="dosage" label="Dosage" outlined dense required />
            </div>
            <div class="col-md-2">
              <q-input v-model="dosage_form" label="Type" outlined dense required />
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="text-h6 q-pt-md text-green col-md-12">
              Movement History

            </div>
            <div class="col-md-12">
             <q-table
                :rows="row"
                :columns="cols"
                row-key="id"
                class=""
              >
              </q-table>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'StockCard',

  setup() {
    return {
       cols: [

        {
        name: 'generic_name',
        required: true,
        label: 'Date',
        align: 'left',
        field: "generic_name",
        sortable: true
      },

      {
        name: 'generic_name',
        required: true,
        label: 'Opening Quantity',
        align: 'left',
        field: "generic_name",
        sortable: true
      },
      {
        name: 'brand_name',
        required: true,
        label: 'Closing Quantity',
        align: 'left',
        field: "brand_name",
        sortable: true
      },
      {
        name: 'dosage',
        required: true,
        label: 'Consumed Quantity',
        align: 'left',
        field: "dosage",
        sortable: true
      },

       ],
    }
  },
  data() {
    return {
      row: [],

      po_no: '',
      generic_name: '',
      brand_name: '',
      dosage: '',
      dosage_form: '',
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
