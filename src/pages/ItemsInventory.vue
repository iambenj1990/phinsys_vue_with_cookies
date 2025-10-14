<template>
  <q-page>
    <!-- <div class="flex flex-center q-ma-sm"> -->
    <!-- <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%"> -->
    <!-- <div class="row q-gutter-md">
          <div class="col-12">
           <div align="left" class="q-ma-md text-h6 text-primary">Medicine Inventory</div>
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
          class="my-sticky-header-table"
          table-header-class="text-white"
          :rows-per-page-options="[0]"
        >
          <template v-slot:top-left>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
              style="width: 300px"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right>
            <div class="q-gutter-sm flex">
              <q-input
                v-model="rangeText"
                label="Select Date Range"
                dense
                readonly
                style="width: 250px"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" color="gray">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="selectedDates" range mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-btn
                dense
                flat
                color="green"
                label="Export"
                icon="import_export"
                @click="exportToExcel"
                style="height: 40px"
                class="q-pl-md"
              />
            </div>
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
                  max-width: 250px;
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

              <q-td key="unit" style="font-size: 11px" align="left">
                <!-- {{ props.row.unit }} -->
                pcs
              </q-td>

              <q-td key="current_quantity" style="font-size: 11px" align="left">
                {{ !props.row.current_quantity ? 0 : props.row.current_quantity }}
              </q-td>

              <!-- <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                    <q-badge
                      style="width: 100px"
                      :color="getStockColor(props.row.total_closing_quantity, props.row.quantity)"
                      text-color="black"
                      class="flex flex-center q-pa-xs"
                    >
                      {{ props.row.total_closing_quantity }}
                    </q-badge>
                  </q-td> -->
              <q-td key="opening_quantity" style="font-size: 11px" align="left">
                {{ props.row.opening_quantity }}
              </q-td>
              <q-td key="closing_quantity" style="font-size: 11px" align="left">
                {{ props.row.closing_quantity }}
              </q-td>

              <q-td key="total_out_quantity" style="font-size: 11px" align="left">
                {{ !props.row.total_out_quantity ? 0 : props.row.total_out_quantity }}

                <!-- {{ props.row.quantity_out }} -->
              </q-td>

              <q-td key="expiration_date" style="font-size: 11px" align="left">
                {{ props.row.expiration_date }}
              </q-td>

              <!-- <q-td key="status" style="font-size: 11px" align="left">
                    <q-badge :color="props.row.stock_status=='OPEN'?'green':'red'">
                      {{ props.row.stock_status }}
                    </q-badge>
                    <q-badge :color="getStockStatusColor(props.row)" class='q-mx-xs'>
                      {{ getStockStatus(props.row) }}
                    </q-badge>
                  </q-td> -->

              <q-td
                key="last_inventory_date"
                style="font-size: 11px"
                class="text-weight-bolder"
                align="left"
              >
                {{ props.row.transaction_date }}
              </q-td>

              <!-- <q-td key="actions" style="font-size: 11px" align="center">
                    <q-btn flat color="primary" @click="AdjustItem(props.row)" icon="edit_document">
                      <q-tooltip> Adjustment </q-tooltip>
                    </q-btn>
                  </q-td> -->
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <!-- </q-card> -->
    <!-- </div> -->
    <q-dialog v-model="showAdjustment" persistent style="max-width: 500px; width: 50%">
      <q-card style="max-width: 800px; width: 100%">
        <q-card-section class="text-caption">
          <div>
            <pre>Adjust Quantity</pre>
          </div>
          <div class="row flex">
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Brand Name" v-model="holder.brand_name"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Generic Name" v-model="holder.generic_name"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Dosage" v-model="holder.dosage"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Type" v-model="holder.dosage_form"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption q-mb-md">
              <q-input readonly dense label="Quantity" v-model="holder.Closing_quantity"></q-input>
            </div>
          </div>
          <q-separator></q-separator>
          <q-input
            label="Adjusted Quantity"
            type="text"
            mask="#####"
            autofocus
            v-model="Adjusted_quantity"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="showAdjustment = false" />
          <q-btn flat label="Add" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
import { useIndicatorStore } from 'src/stores/indicatorsStore'
import ExcelJS from 'exceljs/dist/exceljs.min.js'
import { Notify } from 'quasar'

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
    transactionStore() {
      return useTransactionStore()
    },
  },
  setup() {
    const indicatorStore = useIndicatorStore()
    const today = new Date()
    today.toLocaleDateString('en-CA')
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return {
      today,
      start,
      end,
      indicatorStore,
      pagination: {
        page: 1,
        rowsPerPage: 5,
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

        {
          name: 'unit',
          required: true,
          label: 'Unit',
          align: 'left',
          field: 'unit',
          sortable: true,
        },
        {
          name: 'current_quantity',
          required: true,
          label: 'Beginning Quantity',
          align: 'left',
          field: 'current_quantity',
        },
        {
          name: 'opening_quantity',
          required: true,
          label: 'Openning Quantity',
          align: 'left',
          field: 'opening_quantity',
        },
        {
          name: 'closing_quantity',
          required: true,
          label: 'Ending Quantity',
          align: 'left',
          field: 'closing_quantity',
          format: (val) => (val ? val : 0), // If empty, set to 0
          sortable: true,
        },

        {
          name: 'total_out_quantity',
          required: true,
          label: 'Quantity Out',
          align: 'left',
          field: 'total_out_quantity',
        },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },

        {
          name: 'last_inventory_date',
          required: true,
          label: 'As of',
          align: 'left',
          field: 'transaction_date',
          format: (val) => (val ? val : 0), // If empty, set to 0
        },
      ],
    }
  },
  data() {
    return {
      selectedDates: {
        from: '',
        to: '',
      },
      rangeText: '',
      dateRange: this.today,
      Adjusted_quantity: 0,
      open: false,
      close: false,
      showAdjustment: false,
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

      inventoryAdjustment: {
        stock_id: 0,
        Closing_quantity: 0,
        Openning_quantity: 0,
        quantity_out: 0,
        transaction_date: '',
        user_id: 1,
        remarks: '',
        status: '',
      },
      holder: {},
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
      a.download = `Stock_Inventory_Medicines_${new Date().toISOString()}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    },

    adjustTypeComputation() {
      if (this.Increase) {
        this.Decrease = false
        this.final_Adjusted_quantity =
          parseInt(this.Adjusted_quantity) + parseInt(this.inventoryAdjustment.Openning_quantity)
      }
      if (this.Decrease) {
        this.Increase = false
        this.final_Adjusted_quantity =
          parseInt(this.Adjusted_quantity) - parseInt(this.inventoryAdjustment.Openning_quantity)
      }
    },

    async showStocks(date) {
      try {
        await this.itemStore.getStocksListbyDate(date)
        this.rows = this.itemStore.items
      } catch (error) {
        // console.log(error)
         Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    },

    getStockStatus(row) {
      if (!row.total_closing_quantity) {
        return 'Out of Stock'
      }
      const expirationDate = new Date(row.expiration_date)
      const today = new Date()
      // Optional: reset time to 00:00:00 for date-only comparison
      expirationDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      return expirationDate <= today ? 'Expired' : 'In Stock'
    },

    getStockStatusColor(row) {
      if (!row.Closing_quantity) {
        return 'red'
      }
      const expirationDate = new Date(row.expiration_date)
      const today = new Date()
      // Optional: reset time to 00:00:00 for date-only comparison
      expirationDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      if (expirationDate <= today) {
        return 'red'
      }
      //return expirationDate <= today ? 'Expired' : 'Active';
    },
    async getDailyForAdjustment(id) {
      await this.transactionStore.getDailyInventory(id)
      this.inventoryAdjustment = this.transactionStore.SelecteddailyInventory
    },

    AdjustItem(data) {
      this.holder = data
      this.showAdjustment = true
      // this.getDailyForAdjustment(id)

      // console.log('Data => ', data)
      // console.log('Holder => ', this.holder)
    },
    // editItem(id) {
    //   console.log(id)
    // },
    async fetchAllStocks() {
      this.loading = true
      await this.itemStore.getJoinedTable_DailyInventor_Items()
      this.rows = this.itemStore.items
      this.loading = false
    },
    async Check_OPEN() {
      await this.indicatorStore.getStatus()
      if (this.indicatorStore.isOpen) {
        this.open = true
      }
    },

    async Check_CLOSE() {
      await this.indicatorStore.getStatus()
      if (this.indicatorStore.isClose) {
        this.close = true
      }
    },

    async openStock() {
      try {
        await this.itemStore.openingStocks()
        await this.indicatorStore.open_status()
        this.Check_OPEN()
        this.fetchAllStocks()
      } catch (error) {
        throw error.response?.data?.message || error.message || 'An unexpected error occurred'
      }
    },

    async closeStock() {
      await this.itemStore.closingStocks()
      await this.indicatorStore.close_status()
      this.Check_CLOSE()
      this.fetchAllStocks()
    },

    getStockPercentage(remaining, total) {
      if (total === 0) return 0 // Prevent division by zero
      return Math.round((remaining / total) * 100)
    },
    getStockColor(remaining, total) {
      const percentage = this.getStockPercentage(remaining, total)

      if (percentage === 0) return 'red' // Out of stock (0%)
      if (percentage <= 10) return 'orange' // Critical (≤10%)
      if (percentage <= 20) return 'yellow' // Low (≤20%)
      if (percentage <= 50) return 'blue' // Medium (≤50%)
      return 'green' // Safe (>50%)
    },
  },

  mounted() {
    this.selectedDates = {
      from: this.start.toISOString().split('T')[0],
      to: this.end.toISOString().split('T')[0],
    }
    // this.showStocks(this.today)
    // this.Check_OPEN()
    // this.Check_CLOSE()
  },
  watch: {
    selectedDates: {
      handler: debounce(function (newRange) {
        this.rangeText = `${newRange.from} to ${newRange.to}`

        // console.log(newRange)
        //this.get_RIS_List_byDate(newRange)
        // this.get_clients(newRange)
        // this.fetchAllStocks(newRange)
        this.showStocks(newRange)
      }, 500),
      immediate: true, // Call the handler immediately with the initial value
      deep: true, // Watch for changes in the object properties
    },
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
