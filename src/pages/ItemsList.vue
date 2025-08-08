<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div class="row q-gutter-md">
          <div class="col-12">
            <div align="left" class="text-h6 text-primary q-pa-md">Supplies Information</div>
          </div>
        </div>
        <q-separator />
        <div v-if="loading" class="flex flex-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
        </div>
        <div v-else class="row q-gutter-md">
          <div class="col-12 col-md-12 q-pt-md">
            <q-table
              :rows="rows"
              :columns="cols"
              row-key="id"
              :visible-columns="[
                'po_no',
                'generic_name',
                'brand_name',
                'dosage',
                'dosage_form',
                'unit',
                'quantity',
                'expiration_date',
              ]"
              :filter="filter"
              flat
              bordered
              class="q-mr-md"
              style="max-height: 600px; height: 100%"
              :rows-per-page-options="[0]"
            >
              <template v-slot:top-left>
                <div class="q-pa-md q-mr-md">
                  <q-input
                    v-model="rangeText"
                    label="Select Date Range"
                    dense
                    readonly
                    style="width: 200px"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="selectedDates" range mask="YYYY-MM-DD" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div>
                  <q-input  dense debounce="300" v-model="filter" placeholder="Search" style="width: 500px">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>
              <template v-slot:top-right>
                <q-btn
                  flat
                  label="Update P.O. #"
                  class="text-subtitle2"
                  color="primary"
                  icon="source"
                  @click="
                    () => {
                      this.$router.push('/items/temporary-po')
                    }
                  "
                />

                <q-btn
                  flat
                  type="button"
                  label="Add Purchases"
                  class="q-mr-md q-ml-md"
                  color="primary"
                  icon="add"
                  @click="showNew = true"
                />
              </template>
              <template #body="props">
                <q-tr :v-bind="props">
                  <q-td key="po_no" style="font-size: 11px" align="left">
                    {{ props.row.po_no }}
                  </q-td>
                  <q-td
                    key="generic_name"
                    style="
                      font-size: 11px;
                      white-space: normal;
                      word-break: break-word;
                      max-width: 200px;
                    "
                    align="left"
                    class="text-wrap"
                  >
                    {{ props.row.generic_name }}
                  </q-td>
                  <q-td key="brand_name" style="font-size: 11px" align="left">
                    {{ props.row.brand_name }}
                  </q-td>
                  <q-td key="dosage" style="font-size: 11px" align="left">
                    {{ props.row.dosage }}
                  </q-td>
                  <q-td key="dosage_form" style="font-size: 11px" align="left">
                    {{ props.row.dosage_form }}
                  </q-td>
                  <q-td key="quantity" style="font-size: 11px" align="left">
                    {{ props.row.quantity }}
                  </q-td>
                  <q-td key="unit" style="font-size: 11px" align="left">
                    {{ props.row.unit }}
                  </q-td>

                  <q-td key="expiration_date" style="font-size: 11px" align="left">
                    {{ props.row.expiration_date }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="showNew" persistent>
      <q-card style="min-width: 350px; max-width: 600px">
        <q-card-section class="text-h6 text-green"> Select Type of Registration </q-card-section>
        <q-separator />
        <q-card-section>
          <q-btn
            flat
            type="button"
            label="New Purchases"
            class="q-mr-md q-ml-md"
            color="primary"
            icon="add"
            to="/items/new"
          >
            <q-tooltip>
              <div>You can add new purchases here.</div>
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            label="Batch Upload Purchases"
            class="text-subtitle2"
            color="primary"
            icon="format_list_numbered"
            @click="
              () => {
                this.$router.push('/items/new/batch')
              }
            "
          />
        </q-card-section>
        <q-card-actions>
          <q-btn class="text-red" flat label="Cancel" @click="showNew = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'



function debounce(fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}


export default {
  computed: {
    itemStore() {
      return useItemStore()
    },
  },

  watch:{
    selectedDates: {
      handler: debounce(function (newRange) {
        this.rangeText = `${newRange.from} to ${newRange.to}`

        console.log(newRange)
        //this.get_RIS_List_byDate(newRange)
        // this.get_clients(newRange)
        this.fetchAllStocks(newRange)

      }, 500),
      immediate: true, // Call the handler immediately with the initial value
      deep: true, // Watch for changes in the object properties
    },
  },
  setup() {
      const today = new Date()
    today.toLocaleDateString('en-CA')
     const start = new Date(today.getFullYear(), today.getMonth(),1)
     const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return {
      today,
      start,
      end,

      cols: [
        {
          name: 'po_no',
          required: true,
          label: 'PO No',
          align: 'left',
          field: 'po_no',
          sortable: true,
        },

        {
          name: 'generic_name',
          required: true,
          label: 'Generic Name',
          align: 'left',
          field: 'generic_name',
          sortable: true,
        },
        {
          name: 'brand_name',
          required: true,
          label: 'Brand Name',
          align: 'left',
          field: 'brand_name',
          sortable: true,
        },
        {
          name: 'dosage',
          required: true,
          label: 'Dosage',
          align: 'left',
          field: 'dosage',
          sortable: true,
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'dosage_form',
          sortable: true,
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
          sortable: true,
        },

        {
          name: 'unit',
          required: true,
          label: 'Unit',
          align: 'left',
          field: 'unit',
          sortable: true,
        },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },
      ],
    }
  },
  data() {
    return {
      rangeText:'',
      selectedDates:{
        from:'',
        to:''
      },
      showNew: false,
      rows: [],
      filter: '',
      loading: false,
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

  methods: {
    async fetchAllStocks(payload) {
      await this.itemStore.getItems(payload)
      this.rows = this.itemStore.items
    },
  },

  mounted() {

  this.selectedDates= {
      from : this.start.toISOString().split('T')[0],
      to : this.end.toISOString().split('T')[0]

    }
  },
}
</script>
<style scoped>
.scrollable-body {
  display: block;
  max-height: 400px;
  overflow-y: auto;
}

.scrollable-body tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

thead tr {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
}
</style>
