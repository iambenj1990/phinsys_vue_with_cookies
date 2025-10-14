<template>
  <q-page>
    <q-card style="width: auto">
      <q-card-section>
        <div v-if="loading" class="flex flex-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
          <span class="q-ml-sm">Loading...</span>
        </div>
        <div v-else class="q-gutter-md">
          <q-table
            :rows="items"
            :columns="cols"
            row-key="id"
            :filter="filter"
            flat
            bordered
            class="q-ma-md my-sticky-header-table"
            style="height: 500px"
            :rows-per-page-options="[10, 20, 30]"
          >
            <template #top-right>
              <q-input
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
                class="q-ml-md"
                style="max-width: 200px"
                clearable
                outlined
                rounded
                hide-bottom-space
                :loading="items.length === 0"
              >
                <template v-slot:append>
                  <q-icon name="search" class="cursor-pointer" />
                </template>
              </q-input>
            </template>
            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="po_no" style="font-size: 11px" align="left">
                  {{ props.row.po_no }}
                </q-td>
                <q-td key="generic_name" style="font-size: 11px" align="left">
                  {{ props.row.generic_name }}
                </q-td>
                <q-td key="dosage" style="font-size: 11px" align="center">
                  {{ props.row.dosage }}
                </q-td>
                <q-td key="dosage_form" style="font-size: 11px" align="center">
                  {{ props.row.dosage_form }}
                </q-td>
                <q-td key="expiration_date" style="font-size: 11px" align="center">
                  {{ props.row.expiration_date }}
                </q-td>
                <!-- <q-td key="item_quantity" style="font-size: 11px" align="center">
                {{ props.row.item_quantity }}
              </q-td> -->
                <q-td key="transaction_date" style="font-size: 11px" align="center">
                  {{ props.row.last_inventory_date }}
                </q-td>
                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    class="text-green"
                    icon="format_list_numbered"
                    @click="
                      () => {
                        // console.log(props.row)
                        customerUtilization({ item_id: props.row.item_id })
                        showCustomerlist = true
                      }
                    "
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card-section>
      <!-- <q-card-actions align="right" class="q-px-md">
        <q-btn label="Close" flat class="text-subtitle2 text-green" ></q-btn>
      </q-card-actions> -->
    </q-card>

    <q-dialog persisten v-model="showCustomerlist">
      <q-card style="width: 700px; max-width: 90vw">
        <q-card-section>
          <q-table
            :rows="customerList"
            :columns="Customercols"
            row-key="id"
            flat
            bordered
            class="q-ma-md my-sticky-header-table"
            style="height: 600px; width: auto"
            :rows-per-page-options="[10, 20, 30]"
            v-model:pagination="pagination"
          >
            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="no" style="font-size: 11px" align="left">
                  <!-- {{ props.pageIndex + 1 }} -->
                  {{ (pagination.page - 1) * pagination.rowsPerPage + props.pageIndex + 1 }}
                </q-td>
                <q-td key="customer" style="font-size: 11px" align="left">
                  {{ props.row.recipient_name }}
                </q-td>
                <q-td key="age" style="font-size: 11px" align="left">
                  {{ props.row.age }}
                </q-td>
                <q-td key="barangay" style="font-size: 11px" align="center">
                  {{ props.row.barangay }}
                </q-td>
                <q-td key="quantity" style="font-size: 11px" align="center">
                  {{ props.row.quantity }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Close"
            class="text-green text-subtitle2"
            flat
            @click="showCustomerlist = false"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'

export default {
  name: 'ItemsCustomerDispense',
  setup() {
    const itemStore = useItemStore()
    const transactionStore = useTransactionStore()

    return {
      itemStore,
      transactionStore,

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
          label: 'Item Description',
          align: 'left',
          field: 'generic_name',
          sortable: true,
        },

        {
          name: 'dosage',
          required: true,
          label: 'Dosage',
          align: 'center',
          field: 'dosage',
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Type',
          align: 'center',
          field: 'dosage_form',
          sortable: true,
        },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'center',
          field: 'expiration_date',
          sortable: true,
        },

        // {
        //   name: 'total_closing_quantity',
        //   required: true,
        //   label: 'Remaining Quantity',
        //   align: 'center',
        //   field: 'Closing_quantity',
        //   sortable: true,
        // },

        {
          name: 'transaction_date',
          required: true,
          label: 'As of',
          align: 'center',
          field: 'last_inventory_date',
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
          field: 'actions',
        },
      ],

      Customercols: [
        {
          name: 'no',
          required: true,
          label: 'No.',
          align: 'left',
        },
        {
          name: 'customer',
          required: true,
          label: 'Customer Name',
          align: 'left',
          field: 'recipient_name',
          sortable: true,
        },

        {
          name: 'age',
          required: true,
          label: 'Age',
          align: 'left',
          field: 'age',
          sortable: true,
        },

        {
          name: 'barangay',
          required: true,
          label: 'Barangay',
          align: 'center',
          field: 'barangay',
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'center',
          field: 'quantity',
          sortable: true,
        },
      ],
    }
  },
  mounted() {
    this.getItems()
    // console.log(this.items)
  },

  created() {},

  data() {
    return {
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      items: [],
      showCustomerlist: false,
      customerList: [],
      filter: '',
    }
  },

  methods: {
    async getItems() {
      this.loading = true
      await this.itemStore.getJoinedTable_DailyInventor_Items()
      // console.log('items => ', this.itemStore.items)
      this.items = this.itemStore.items
      // console.log(this.items)
      this.loading = false
    },
    async customerUtilization(payload) {
      await this.transactionStore.MedicineUtilizationPerCustomer(payload)
      this.customerList = this.transactionStore.MedicineRecipients
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
