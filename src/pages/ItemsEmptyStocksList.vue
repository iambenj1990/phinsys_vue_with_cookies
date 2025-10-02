<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <!-- <div class="row q-gutter-md">
          <div class="col-12">
            <div align="left" class="text-h6 text-primary q-pa-md">Out of Stock Medicines</div>
          </div>
        </div>
        <q-separator /> -->
        <div v-if="loading" class="flex flex-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
              <span class="q-ml-sm">Loading...</span>
        </div>
        <div v-else class="row q-gutter-md">
          <div class="col-12 col-md-12 q-pa-sm">
            <q-table
              :rows="rows"
              :columns="cols"
              row-key="id"
              :filter="filter"
              flat
              bordered
              class="q-mr-md my-sticky-header-table"
              style="height: 500px"
              :rows-per-page-options="[0]"
              table-header-class="text-white"
            >
              <template v-slot:top-left>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  class="full-width"
                  style="width: 300px"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template #top-right>

                <q-btn
                  flat
                  type="button"
                  label="Export"
                  class="q-mr-md q-ml-md text-caption text-white"
                  style="background-color: #26A65B;"
                  icon="import_export"
                  @click="exportToExcel()"
                />
              </template>

              <template #body="props">
                <q-tr :v-bind="props">
                  <q-td key="po_no" style="font-size: 11px" align="left">
                    {{ props.row.po_no }}
                  </q-td>
                  <q-td key="generic_name" style="font-size: 11px; white-space: normal; word-break: break-word; max-width: 200px;" align="left" class="text-wrap">
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
                  <!-- <q-td key="Openning_quantity" style="font-size: 11px" align="left">
                    {{
                      !props.row.Openning_quantity ? 'Stock Closed' : props.row.Openning_quantity
                    }}
                  </q-td> -->
                  <!-- <q-td key="unit" style="font-size: 11px" align="left">
                    {{ props.row.unit }}

                  </q-td> -->

                  <q-td key="expiration_date" style="font-size: 11px" align="left">
                    {{ props.row.expiration_date }}
                  </q-td>

                  <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                      {{
                        props.row.Closing_quantity
                      }}

                  </q-td>

                  <q-td
                    key="last_inventory_date"
                    style="font-size: 11px"
                    class="text-weight-bolder"
                    align="left"
                  >
                    {{ props.row.last_inventory_date }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import ExcelJS from 'exceljs/dist/exceljs.min.js'
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
import { Notify } from 'quasar'
export default {
  computed: {
    itemStore() {
      return useItemStore()
    },
    transactionStore() {
      return useTransactionStore()
    },
  },
  setup() {

    return {

      pagination: {
        page: 1,
        rowsPerPage: 15,
        sortBy: null,
        descending: false,
      },
      cols: [
        {
          name: 'po_no',
          required: true,
          label: 'PO No',
          align: 'left',
          field: 'po_no',
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
        },
        {
          name: 'dosage',
          required: true,
          label: 'Dosage',
          align: 'left',
          field: 'dosage',
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'dosage_form',
          sortable: true,
        },
        // {
        //   name: 'Openning_quantity',
        //   required: true,
        //   label: 'Quantity',
        //   align: 'left',
        //   field: 'Openning_quantity',
        // },

        // {
        //   name: 'unit',
        //   required: true,
        //   label: 'Unit',
        //   align: 'left',
        //   field: 'unit',
        //   sortable: true,
        // },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },

        {
          name: 'Closing_quantity',
          required: true,
          label: 'Remaining Quantity',
          align: 'left',
          field: 'Closing_quantity',
          format: (val) => (val ? val : 0), // If empty, set to 0
          sortable: true,
        },

        {
          name: 'last_inventory_date',
          required: true,
          label: 'As of',
          align: 'left',
          field: 'last_inventory_date',
          format: (val) => (val ? val : 0), // If empty, set to 0
        },
      ],
    }
  },
  data() {
    return {
      color: '',
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
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Out of Stock Medicines')

      // Define columns
      worksheet.columns = this.cols.map((col) => ({
        header: col.label,
        key: col.field,
        width: 20,
      }))

      // Add rows
      this.rows.forEach((row) => {
        worksheet.addRow(row)
      })

      // Save the file
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Out_of_Stock_Medicines_${new Date().toISOString()}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    },

    editItem(id) {
      console.log(id)
    },
    async fetchAllStocks() {
      try {
        this.loading = true
        await this.itemStore.EmptyStocks()
        this.rows = this.itemStore.zero_stocks
      } catch (error) {
        Notify.create({
            type: 'negative',
            message: error.response.data.message || 'An error occurred.',
            position: 'center',
            timeout: 5000,
          })
      }finally{
        this.loading= false
      }
    },

    getStockPercentage(remaining, total) {
      if (total === 0) return 0 // Prevent division by zero
      return Math.round((remaining / total) * 100)
    },

    getStockColor(remaining, total) {
      console.log('remaining =>', remaining, ' total=> ', total)
      const percentage = this.getStockPercentage(remaining, total)

      if (percentage === 0) return 'red' // Out of stock (0%)
      if (percentage <= 10) return 'orange' // Critical (≤10%)
      if (percentage <= 20) return 'yellow' // Low (≤20%)
      if (percentage <= 50) return 'blue' // Medium (≤50%)
      return 'green' // Safe (>50%)
    },
  },

  mounted() {
    this.fetchAllStocks()
  },
  watch() {},
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 610px


  thead tr th
    /* bg color is important for th; just specify one */
    background-color: #008000

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 100px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 50px
</style>
