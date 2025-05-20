<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <!-- <div class="row q-gutter-md">
          <div class="col-12">
            <div align="left" class="text-h6 text-primary">Supplies Information</div>
          </div>
        </div> -->
        <!-- <q-separator /> -->
        <div class="q-my-sm q-mx-sm" align="right">
          <q-btn flat label="Close Stocks" color="grey" @click="closeStock()" />
          <q-btn flat label="Open Stocks" class="q-mx-sm" color="green" @click="openStock()" />
        </div>
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
              class="q-mr-md"
              style="min-height: 500px; max-height: 1000px; height: 100%"
              v-model:pagination="pagination"
            >
              <template v-slot:top-left>
                <div class="q-gutter-sm flex">
                  <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  filled
                  style="width: 300px"
                  class="q-mr-md"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-input filled dense type="date" v-model="dateRange" @update:model-value="showStocks(dateRange)"/>
                  <!-- <q-input dense filled v-model="dateRange" mask="####-##-##" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateRange" mask="YYYY-MM-DD" @update:model-value="showStocks(dateRange)">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input> -->

                <q-btn
                  dense
                  flat
                  color="green"
                  label="Export"
                  icon="import_export"
                  @click="exportToExcel"
                  style="height: 40px; "

                />
                </div>

              </template>

              <template #body="props">
                <q-tr :v-bind="props">
                  <q-td key="po_no" style="font-size: 11px" align="left">
                    {{ props.row.po_no }}
                  </q-td>
                  <q-td key="generic_name" style="font-size: 11px" align="left">
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
                    {{ !props.row.quantity ? '0' : props.row.quantity }}
                  </q-td> -->
                  <!-- <q-td key="unit" style="font-size: 11px" align="left">
                    {{ props.row.unit }}
                      pcs
                  </q-td> -->

                  <q-td key="expiration_date" style="font-size: 11px" align="left">
                    {{ props.row.expiration_date }}
                  </q-td>

                  <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                    <q-badge
                      style="width: 100px"
                      :color="getStockColor(props.row.Closing_quantity, props.row.quantity)"
                      text-color="black"
                      class="flex flex-center q-pa-xs"
                    >
                      {{
                        !props.row.total_closing_quantity ? '0' : props.row.total_closing_quantity
                      }}
                    </q-badge>
                  </q-td>

                  <q-td
                    key="stock_status"
                    style="font-size: 11px"
                    class="text-weight-bolder"
                    align="left"
                  >
                    <!-- <q-badge :color="getStockStatusColor(props.row)">
                      {{ getStockStatus(props.row) }}
                    </q-badge> -->
                    {{ props.row.stock_status }}
                  </q-td>

                  <q-td
                    key="transaction_date"
                    style="font-size: 11px"
                    class="text-weight-bolder"
                    align="left"
                  >
                    {{ props.row.transaction_date }}
                  </q-td>

                  <q-td key="actions" style="font-size: 11px" align="center">
                    <q-btn
                      flat
                      color="primary"
                      @click="GetAdjustItem(props.row)"
                      icon="edit_document"
                      :disable="
                        !props.row.Closing_quantity
                          ? true
                          : new Date(props.row.expiration_date) <= new Date()
                            ? true
                            : false
                      "
                    >
                      <q-tooltip> Adjustment </q-tooltip>
                    </q-btn>
                    <!-- <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" /> -->
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>
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
              <q-input
                readonly
                dense
                label="Current Quantity"
                v-model="holder.Closing_quantity"
              ></q-input>
            </div>
          </div>

          <q-separator></q-separator>
          <pre>Adjustment Type:</pre>
          <div class="q-mx-sm q-my-md row flex">
            <div class="col-12 col-md-1 text-caption">
              <q-checkbox keep-color v-model="Increase" label="In" color="green" />
            </div>
            <div class="col-12 col-md-1 text-caption">
              <q-checkbox keep-color v-model="Decrease" label="Out" color="red" />
            </div>
            <div class="col-12 col-md-2 text-caption q-mx-md">
              <q-input
                type="number"
                dense
                label="Desired Adjustment"
                v-model="Adjusted_quantity"
                @update:model-value="adjustTypeComputation()"
              />
            </div>
          </div>

          <q-separator></q-separator>

          <div class="q-mx-sm row flex">
            <q-input
              label="Requested Quantity"
              type="number"
              mask="#####"
              autofocus
              readonly
              v-model="final_Adjusted_quantity"
            />
          </div>

          <q-input label="Remarks" type="textarea" v-model="remarks" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="showAdjustment = false" />
          <q-btn flat label="Add" color="primary" @click="adjustInventory" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openDate" persistent style="max-width: 500px; width: 50%">
      <q-card style="max-width: 320px; width: 100%">
        <q-card-section>
          <q-date
            v-model="dateRange"
            range
            mask="YYYY-MM-DD"
            label="Select Date Range"
            :min="today"
            :max="today"
          />
          <q-separator></q-separator>
          <pre>Selected Date Range:</pre>
          <pre>FROM: {{ this.dateRange.from }}</pre>
          <pre>TO: {{ this.dateRange.to }}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="grey" @click="clearDates()" />
          <q-btn flat label="Add" color="primary" @click="showCLosedStocks(this.dateRange)" />
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
import { date } from 'quasar'

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
    const today = date.formatDate(new Date(), 'YYYY-MM-DD')
    const indicatorStore = useIndicatorStore()
    return {
      today,
      indicatorStore,
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
        //   field: 'quantity',
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
          name: 'total_closing_quantity',
          required: true,
          label: 'Remaining Quantity',
          align: 'left',
          field: 'total_closing_quantity',
          format: (val) => (val ? val : 0), // If empty, set to 0
          sortable: true,
        },

        {
          name: 'stock_status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'stock_status',
          format: (val) => (val ? val : 0), // If empty, set to 0
        },

        {
          name: 'transaction_date',
          required: true,
          label: 'As of',
          align: 'left',
          field: 'transaction_date',
          format: (val) => (val ? val : 0), // If empty, set to 0
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
          field: 'actions',
        },
      ],
    }
  },
  data() {
    return {
      openDate: false,
      openPrompt: false,
      dateRange: this.today,
      Increase: false,
      Decrease: false,
      Adjusted_quantity: 0,
      final_Adjusted_quantity: 0,
      remarks: '',
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
      adjusted: {},
    }
  },

  methods: {
    async showStocks(date) {
      try {
        await this.itemStore.getStocksList( date)
        this.rows = this.itemStore.items
      } catch (error) {
        console.log(error)
      }
    },

    clearDates() {
      this.dateRange=''
    },

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
      a.download = `Stock_Movement_Medicines_${new Date().toISOString()}.xlsx`
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

    async getDailyForAdjustment(id) {
      await this.transactionStore.getDailyInventory(id)
      this.inventoryAdjustment = this.transactionStore.SelecteddailyInventory[0]
      this.adjusted = this.transactionStore.SelecteddailyInventory[0]

      console.log('Adjustment data => ', this.inventoryAdjustment)
    },

    async GetAdjustItem(data) {
      this.holder = data
      this.showAdjustment = true
      await this.getDailyForAdjustment(data.inventory_id)
    },
    editItem(id) {
      console.log(id)
    },
    async fetchAllStocks() {
      await this.itemStore.getJoinedTable_DailyInventor_Items()
      this.rows = this.itemStore.items
    },

    async openStock() {
      try {
        await this.itemStore.openingStocks()
        // await this.fetchAllStocks()
        await this.showStocks(this.today)
      } catch (error) {
        console.log(error)
      }
    },

    async closeStock() {
      try {
        await this.itemStore.closingStocks()
        // await this.fetchAllStocks()
        await this.showStocks(this.today)
      } catch (error) {
        console.log(error)
      }
    },

    getStockPercentage(remaining, total) {
      if (total === 0) return 0 // Prevent division by zero
      return Math.round((remaining / total) * 100)
    },

    getStockColor(remaining, total) {
      // console.log('remaining =>', remaining, ' total=> ', total)
      const percentage = this.getStockPercentage(remaining, total)

      if (percentage === 0) return 'red' // Out of stock (0%)
      if (percentage <= 10) return 'orange' // Critical (≤10%)
      if (percentage <= 20) return 'yellow' // Low (≤20%)
      if (percentage <= 50) return 'blue' // Medium (≤50%)
      return 'light-green' // Safe (>50%)
    },

    getStockStatus(row) {
      if (!row.Closing_quantity) {
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

    async updateDailyInventory(id, payload) {
      try {
        await this.transactionStore.updateDailyInvetory(id, payload)
      } catch (error) {
        console.log(error)
      }
    },

    async newDailyInventory(payload) {
      try {
        await this.transactionStore.newDailyInventory(payload)
      } catch (error) {
        console.log(error)
      }
    },

    async adjustInventory() {
      try {
        this.inventoryAdjustment.status = 'ADJUSTED'
        this.inventoryAdjustment.remarks = 'Openning Quantity Adjusted'
        // console.log('inventoryAdjustment => ',this.inventoryAdjustment)
        await this.updateDailyInventory(this.inventoryAdjustment.id, this.inventoryAdjustment)

        this.adjusted.id = 0
        this.adjusted.Openning_quantity = this.Adjusted_quantity
        this.adjusted.Closing_quantity =
          this.adjusted.Openning_quantity - this.adjusted.quantity_out
        this.adjusted.status = 'OPEN'
        this.adjusted.remarks = 'Openning Quantity adjusted'
        // console.log('ADJUSTED = > ',this.adjusted)
        await this.newDailyInventory(this.adjusted)
        await this.fetchAllStocks()
      } catch (error) {
        console.log(error)
      }
    },
  },

  mounted() {
    this.showStocks(this.today)
  },

  watch: {
    Increase(newVal) {
      if (newVal) {
        this.adjustTypeComputation()
      }
    },

    Decrease(newVal) {
      if (newVal) {
        this.adjustTypeComputation()
      }
    },
  },
}
</script>
