<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <q-card-section>
          <div class="q-pa-sm flex justify-center">
            <q-card class="q-pa-sm" style="max-width: 1000px; width: 100%">
              <div class="text-h6 text-green text-weight-bolder">Patient Name</div>
              <q-separator></q-separator>
              <div class="row q-gutter-sm">
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.lastname"
                    label="Last name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.firstname"
                    label="First name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.middlename"
                    label="Middle name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.ext"
                    label="Ext"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
              </div>
              <div class="row q-gutter-sm">
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.gender"
                    label="Gender"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.age"
                    label="Age"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.category"
                    label="Category"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
              </div>
            </q-card>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-sm flex justify-center">
            <q-card class="q-pa-sm" style="max-width: 1000px; width: 100%">
              <div class="text-h6 text-green text-weight-bolder">Patient Dispense History</div>
              <!-- <div class="text-caption text-weight-regular" style="color:grey;">Transacation ID: {{ this.transaction_id }}</div> -->
              <q-separator />
              <q-table
                bordered
                dense
                :rows="DispenseList"
                :columns="cols"
                row-key="id"
                no-data-label="No data available"
                hide-bottom
              >
                <!-- Body slot -->
                <template #body="props">
                  <q-tr :v-bind="props">
                    <q-td key="transaction_id" style="font-size: 11px" align="left">
                      {{ props.row.transaction_id }}
                    </q-td>
                    <q-td key="transaction_date" style="font-size: 11px" align="left">
                      {{ props.row.transaction_date }}
                    </q-td>
                    <q-td key="total" style="font-size: 11px" align="left">
                      {{ props.row.total }}
                    </q-td>
                    <q-td key="actions" style="font-size: 11px" align="left">
                      <q-btn
                        icon="visibility"
                        flat
                        class="text-blue"
                        @click="
                          () => {
                            get_transactions_exploded(
                              props.row.customer_id,
                              props.row.transaction_id,
                            )
                            dialog_open = true
                          }
                        "
                      />
                    </q-td>
                  </q-tr>
                </template>

                <!-- Bottom row slot placed correctly -->
                <template #bottom-row>
                  <q-tr class="bg-grey-3 text-weight-bold">
                    <q-td colspan="2" align="right">Total:</q-td>
                    <q-td>{{ totalPrice.toFixed(2) }}</q-td>
                    <q-td></q-td>
                  </q-tr>
                </template>
              </q-table>
              <div class="q-pa-sm flex justify-end">
                <q-btn style="font-size: 13px" color="red" label="Close" @click="$router.go(-1)" />
              </div>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="dialog_open" style="width: 100%; max-width: 800px">
      <q-card style="max-width: 1000px; width: 100%">
        <q-card-section>
          <div class="text-green text-subtitle1 text-weight-bold">Transaction Breakdown</div>
          <q-separator />
          <q-table
            bordered
            dense
            :rows="DispenseListExploded"
            :columns="cols_exploded"
            row-key="id"
            no-data-label="No data available"
            style="height: 200px"
            hide-bottom
            class="q-mt-sm"
          >
            <template v-slot:top-left> </template>
            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="brand_name" style="font-size: 11px" align="left">
                  {{ props.row.brand_name }}
                </q-td>
                <q-td key="generic_name" style="font-size: 11px" align="left">
                  {{ props.row.generic_name }}
                </q-td>

                <q-td key="quantity" style="font-size: 11px" align="left">
                  {{ props.row.quantity }}
                </q-td>
                <q-td key="total" style="font-size: 11px" align="left">
                  {{ props.row.amount }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" class="text-red" @click="dialog_open = false"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useCustomerStore } from 'src/stores/customersStore'
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
export default {
  setup() {
    return {
      cols: [
        {
          name: 'transaction_id',
          label: 'Transaction ID',
          field: 'transaction_id',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'transaction_date',
          label: 'Transaction Date',
          field: 'transaction_date',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'total',
          label: 'Amount',
          field: 'total',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
      ],

      cols_exploded: [
        {
          name: 'brand_name',
          label: 'Brand Name',
          field: 'brand_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'generic_name',
          label: 'Generic name',
          field: 'generic_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'quantity',
          label: 'Quantity',
          field: 'quantity',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'total',
          label: 'Amount',
          field: 'total',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
      ],
    }
  },
  data() {
    return {
      dialog_open: false,
      selectedTransactionID: '',
      transactionIDList: [],
      DispenseList: [],
      DispenseListExploded: [],
      rows: [],
      costumer: {
        firstname: '',
        lastname: '',
        middlename: '',
        ext: '',
        birthdate: '',
        contact_number: '',
        age: 0,
        gender: '',
        is_not_tagum: false,
        street: '',
        purok: '',
        barangay: '',
        city: 'Tagum City',
        province: 'Davao del Norte',
        category: '',
        is_pwd: false,
        is_solo: false,
        user_id: 0,
      },

      transactionDetails: {
        transaction_id: '',
        customer_id: 0,
        transaction_date: 0,
        item_id: 0,
        quantity: 0,
        user_id: 0,
      },
    }
  },
  mounted() {
    console.log(this.customerStore.customer_id)
    this.get_client(this.customerStore.customer_id)
    // this.getTransactionIds(this.customerStore.customer_id)
    this.get_transactions(this.customerStore.customer_id)
  },
  methods: {
    async get_transactions(id) {
      await this.customerStore.get_transactions(id)
      this.DispenseList = this.customerStore.customer_transactions_list
    },
    async get_transactions_exploded(id, transid) {
      await this.customerStore.get_transactions_exploded(id, transid)
      this.DispenseListExploded = this.customerStore.customer_transactions_list_exploded
    },

    async getTransactionIds(id) {
      await this.transactionStore.getTransactionID(id)
      // console.log( this.transactionStore.customerTransactionsIdList)
      this.transactionIDList = this.transactionStore.customerTransactionsIdList
    },

    async getOrders(transaction_id) {
      await this.transactionStore.getTransactionOrders(transaction_id)
      this.rows = this.transactionStore.customerTransactions
    },

    async get_client(id) {
      await this.customerStore.getCustomer(id)
      this.costumer = this.customerStore.customer
    },

    show_id(id) {
      this.$q.notify({
        type: 'positive',
        message: `user id: ${id} is selected`,
        position: 'center',
        timeout: 1200,
      })
      console.log(id)
      this.searchTerm = ''
    },
  },

  watch: {
    selectedTransactionID(newvalue) {
      this.getOrders(newvalue)
    },
  },
  computed: {
    customerStore() {
      return useCustomerStore()
    },

    itemStore() {
      return useItemStore()
    },

    transactionStore() {
      return useTransactionStore()
    },

    totalPrice() {
      return this.DispenseList.reduce((sum, row) => {
        const clean = (row.total || '0').toString().replace(/,/g, '')
        return sum + parseFloat(clean)
      }, 0)
    },
  },
}
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}

.q-item:hover {
  background-color: #f0f0f0; /* Example hover color */
  cursor: pointer;
}

.q-item.active {
  background-color: #ccc; /* Example active color */
}

.q-item.active:hover {
  background-color: #aaa; /* Example active hover color */
}
</style>
