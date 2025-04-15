<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div class="row q-gutter-md">
          <div class="col-12">
            <div align="left" class="text-h6 text-primary">Supplies Information</div>
          </div>
        </div>
        <q-separator />
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
                  flat
                  type="button"
                  label="Close Stocks"
                  class=""
                  color="grey"

                  @click="closeStock()"
                />
                <q-btn
                  flat
                  type="button"
                  label="Open Stocks"
                  class="q-mx-sm"
                  color="green"

                  @click="openStock()"
                />
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
                  <q-td key="Openning_quantity" style="font-size: 11px" align="left">
                    {{
                      !props.row.Openning_quantity ? 'Stock Closed' : props.row.Openning_quantity
                    }}
                  </q-td>
                  <q-td key="unit" style="font-size: 11px" align="left">
                    {{ props.row.unit }}
                  </q-td>

                  <q-td key="expiration_date" style="font-size: 11px" align="left">
                    {{ props.row.expiration_date }}
                  </q-td>

                  <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                    <q-badge
                      style="width: 100px"
                      :color="getStockColor(props.row.Closing_quantity, props.row.Openning_quantity)"
                      text-color="black"
                      class="flex flex-center q-pa-xs"
                    >
                      {{
                        !props.row.Closing_quantity ? 'Stock Unavailable' : props.row.Closing_quantity
                      }}
                    </q-badge>
                  </q-td>

                  <q-td
                    key="last_inventory_date"
                    style="font-size: 11px"
                    class="text-weight-bolder"
                    align="left"
                  >
                    {{ props.row.last_inventory_date }}
                  </q-td>

                  <q-td key="actions" style="font-size: 11px" align="center">
                    <q-btn flat color="primary" @click="AdjustItem(props.row)" icon="edit_document">
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
              <q-input
                readonly
                dense
                label="Brand Name"
                v-model="holder.brand_name"
              ></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Generic Name"  v-model="holder.generic_name"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Dosage"  v-model="holder.dosage"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption">
              <q-input readonly dense label="Type"  v-model="holder.dosage_form"></q-input>
            </div>
            <div class="col-12 col-md-2 q-mx-sm text-caption q-mb-md">
              <q-input readonly dense label="Quantity"  v-model="holder.Closing_quantity"></q-input>
            </div>

          </div>
          <q-separator></q-separator>
          <q-input label="Adjusted Quantity" type="text" mask="#####" autofocus  v-model="Adjusted_quantity" />
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
    return {
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
        {
          name: 'Openning_quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'Openning_quantity',
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
      Adjusted_quantity:0,
      open:false,
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
      holder:{}
    }
  },

  methods: {


    async getDailyForAdjustment(id) {
      await this.transactionStore.getDailyInventory(id)
      this.inventoryAdjustment = this.transactionStore.SelecteddailyInventory

    },

    AdjustItem(data) {
      this.holder = data
      this.showAdjustment = true
     // this.getDailyForAdjustment(id)


      console.log('Data => ',data)
      console.log('Holder => ', this.holder)
    },
    editItem(id) {
      console.log(id)
    },
    async fetchAllStocks() {
      await this.itemStore.getJoinedTable_DailyInventor_Items()
      this.rows = this.itemStore.items
    },
    async Check_OPEN(){
      await this.indicatorStore.getStatus()
        if (this.indicatorStore.isOpen){
          this.open = true

        }
    },

    async Check_CLOSE(){
      await this.indicatorStore.getStatus()
        if (this.indicatorStore.isClose){
          this.close = true

        }
    },

    async openStock() {
      try {

        await this.itemStore.openingStocks()
        // await this.indicatorStore.open_status()
        // this.Check_OPEN()
        await this.fetchAllStocks()
      } catch (error) {
       this.$q.notify({ type: 'negative', message:  error.response?.data?.message || error.message || 'An unexpected error occurred',position: 'center' })
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
      console.log('remaining =>', remaining ,' total=> ', total)
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
    this.Check_OPEN()
    this.Check_CLOSE()

  },
  watch() {},
}
</script>
