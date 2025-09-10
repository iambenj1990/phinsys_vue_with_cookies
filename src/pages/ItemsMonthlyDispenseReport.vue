<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div v-if="loading" class="flex flex-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
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
              class="q-mr-md q-table--grid my-sticky-header-table"

              :rows-per-page-options="[0]"
              table-header-class="text-white"
              table-header-style="background-color: #f5f5f5"
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
              <template v-slot:top-right>
                <q-btn
                  color="green"
                  label="Export"
                  icon="import_export"
                  @click="exportToExcel"

                />
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useReportsStore } from 'src/stores/reportsStore'
import ExcelJS from 'exceljs/dist/exceljs.min.js'

export default {
  computed: {
    reportStore() {
      return useReportsStore()
    },
  },
  setup() {
    const months = [
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
    ]
    const MonthCols = months.map((month) => ({
      name: month,
      required: true,
      label: month,
      align: 'left',
      field: month,
      format: (val) => (val ? val : 0), // If empty, set to 0
    }))

    const staticCols = [
      { name: 'po_no', label: 'PO No', field: 'po_no', align: 'left', sortable: true },
      // { name: 'stock_id', label: 'Stock ID', field: 'stock_id', align: 'left', sortable: true },
      {
        name: 'item',
        label: 'Item Description',
        field: 'item',
        align: 'left',
        sortable: true,
        class: 'text-wrap',
        style: 'white-space: normal; word-break: break-word; max-width: 300px;',
      },
      { name: 'quantity', label: 'Quantity', field: 'quantity', align: 'center', sortable: true },
      { name: 'balance', label: 'Balance', field: 'balance', align: 'center', sortable: true },
    ]

    const cols = [...staticCols, ...MonthCols]
    return {
      staticCols,
      MonthCols,
      cols,
      months,
      pagination: {

        rowsPerPage: 15,
        sortBy: null,
        descending: false,
      },
    }
  },
  data() {
    return {
      openPrompt: false,
      dateRange: {
        from: '',
        to: '',
      },

      rows: [],
      filter: '',
      loading: false,

    }
  },

  methods: {
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Stock Movements')

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
      a.download = `Medicines_Monthly_Dispense_${new Date().toISOString()}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    },

    async getMontlyDispenseReport() {
      this.loading = true
      try {
         await this.reportStore.MonthlyDispenseReports()
        const data = this.reportStore.monthly_dispense
        // console.table( data)

        const pivot = {}

        data.forEach((row) => {
          if (!pivot[row.stock_id]) {
            pivot[row.stock_id] = {
              stock_id: row.stock_id,
              po_no: row.po_no,
              item: row.item,
              quantity: row.quantity,
              balance: row.latest_balance,
              dispensed: 0, // will sum below
            }
            // Initialize months with 0
            this.months.forEach((m) => {
              pivot[row.stock_id][m] = 0
            })
          }
          pivot[row.stock_id][row.month_name] = row.total_dispensed
          pivot[row.stock_id].dispensed += row.total_dispensed
        })

        this.rows =  Object.values(pivot)
        // console.table( this.rows)
        this.loading = false
      } catch (error) {
        console.error('Error fetching monthly dispense report:', error)
        this.loading = false
      }
    },
  },
  mounted() {
    this.getMontlyDispenseReport()
  },
  watch: {

  },
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
