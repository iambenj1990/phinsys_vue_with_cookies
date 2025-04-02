<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div>
          <q-input
            v-model="searchTerm"
            label="Search by Name or Lastname"
            outlined
            @input="filterList"

          />

          <q-list>
            <!-- <q-item v-for="item in filteredList" :key="item.id" clickable @click="show_id(item.id)"> -->
            <q-item
              v-for="item in filteredList"
              :key="item.id"
              clickable
              @click="get_client(item.id)"
            >
              <q-item-section>
                <q-item-label>
                  {{ item.firstname }} {{ item.lastname }} {{ item.ext }}
                </q-item-label>
                <q-item-label caption
                  >Date of Birth: {{ item.birthdate }} | Gender: {{ item.gender }} | Category:
                  {{ item.category }}</q-item-label
                >
                <q-item-label caption
                  >Location: {{ item.city }} | Province: {{ item.province }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-card-section>
          <div class="q-pa-sm flex">
            <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
              <div class="text-h6 text-blue text-weight-bolder">Customer Name</div>
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

          <div class="q-pa-sm flex">
            <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
              <div class="text-h6 text-blue text-weight-bolder">Order Requests</div>
              <div class="text-caption text-weight-regular" style="color:grey;">Transacation ID: {{ this.transaction_id }}</div>
              <q-separator />
              <q-table
                bordered
                dense
                :rows="rows"
                :columns="cols"
                row-key="id"
                no-data-label="No data available"
              >
                <template v-slot:top-right>
                  <q-btn color="primary" label="Add Order" icon="add" flat @click="getAvailableMedList()"/>
                </template>
                <template #body="props">
                  <q-tr :v-bind="props">
                    <q-td key="brand_name" style="font-size: 11px" align="left">
                      {{ props.row.brand_name }}
                    </q-td>
                    <q-td key="generic_name" style="font-size: 11px" align="left">
                      {{ props.row.generic_name }}
                    </q-td>
                    <q-td key="dosage" style="font-size: 11px" align="left">
                      {{ props.row.dosage }}
                    </q-td>
                    <q-td key="quantity" style="font-size: 11px" align="left">
                      {{ props.row.quantity }}
                    </q-td>
                    <q-td key="unit" style="font-size: 11px" align="left">
                      {{ props.row.unit }}
                    </q-td>
                    <q-td key="actions" style="font-size: 11px" align="center">
                      <q-btn
                        flat
                        color="red"
                        @click="remove_order(props.row.table_id_transactions)"
                        icon="remove_shopping_cart"
                      />
                      <!-- <q-btn
                    flat
                    color="negative"
                    @click="showDeletepage(props.row.id)"
                    icon="delete"
                  /> -->
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>

     <!-- SHOW AVAILABLE MEDICINES -->
  <q-dialog v-model="cartPrompt" persistent style="max-width: 1280px; width: 100%;">
    <q-card style="max-width: 1280px; width: 100%;">
      <div class="row q-gutter-md q-mb-md q-pa-md flex flex-center">
        <q-table :rows="availableMedsRow" :columns="cartCols" row-key="id" :visible-columns="[
          'generic_name',
          'brand_name',
          'dosage',
          'dosage_form',
          'unit',
          'quantity',
          'expiration_date',
        ]" :filter="filter" flat bordered
          style="max-width: 1180px; width: 100%; min-height: 300px; max-height: 500px; height: 100%;">
          <template v-slot:top>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" class="full-width">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template #body="props">
            <q-tr :v-bind="props">
              <!-- <q-td key="po_no" style="font-size: 11px" align="center">
                {{ props.row.po_no }}
              </q-td> -->
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
              <!-- <q-td key="quantity" style="font-size: 11px" align="center">
                {{ props.row.quantity }}
              </q-td> -->
              <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                {{ props.row.Closing_quantity ? props.row.Closing_quantity : 0 }}
              </q-td>
              <q-td key="unit" style="font-size: 11px" align="left">
                {{ props.row.unit }}
              </q-td>

              <q-td key="expiration_date" style="font-size: 11px" align="left">
                {{ props.row.expiration_date }}
              </q-td>

              <q-td key="actions" style="font-size: 11px" align="center">
                <q-btn flat rounded color="primary" style="background-color: orange;" @click="showData(props.row)"
                  icon="add_shopping_cart" />
                <!-- <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" /> -->
              </q-td>
            </q-tr>

          </template>
        </q-table>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="cartPrompt = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>

    <!-- SHOW QUANTITY -->
    <q-dialog v-model="showQuantity" persistent style="max-width: 500px; width: 50%">
      <q-card style="max-width: 300px; width: 70%">
        <q-card-section>
          <pre style="color: darkslategray; font-weight: 900">Enter Quantity:</pre>
          <q-input v-model.trim="transactionDetails.quantity" label="Quantity" type="text" mask="#####" autofocus/>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="showQuantity = false" />
          <q-btn flat label="Add" color="primary" @click="add_Order(this.transactionDetails)" />
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
          name: 'brand_name',
          label: 'Brandname',
          field: 'brand_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'generic_name',
          label: 'Generic Name',
          field: 'generic_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'dosage',
          label: 'Dosage',
          field: 'dosage',
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
          name: 'unit',
          label: 'Unit',
          field: 'unit',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'Actions',
          label: 'Actions',
          field: 'actions',
          align: 'center',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
      ],

      cartCols:[
      // {
      //   name: 'po_no',
      //   required: true,
      //   label: 'PO No',
      //   align: 'left',
      //   field: "po_no",
      //   sortable: true
      // },

      {
        name: 'generic_name',
        required: true,
        label: 'Generic Name',
        align: 'left',
        field: "generic_name",
        sortable: true
      },
      {
        name: 'brand_name',
        required: true,
        label: 'Brand Name',
        align: 'left',
        field: "brand_name",
        sortable: true
      },
      {
        name: 'dosage',
        required: true,
        label: 'Dosage',
        align: 'left',
        field: "dosage",
        sortable: true
      },
      {
        name: 'dosage_form',
        required: true,
        label: 'Type',
        align: 'left',
        field: "dosage_form",
        sortable: true
      },
      // {
      //   name: 'quantity',
      //   required: true,
      //   label: 'remaining_quantity',
      //   align: 'left',
      //   field: "quantity",
      //   sortable: true
      // },
      { name: 'Closing_quantity',
        required: true,
        label: 'Quantity',
        align: 'left',
        field: "remaining_quantity",
        format: val => val ? val : 0, // If empty, set to 0
        sortable: true
      },

      {
        name: 'unit',
        required: true,
        label: 'Unit',
        align: 'left',
        field: "unit",
        sortable: true
      },

      {
        name: 'expiration_date',
        required: true,
        label: 'Expiration Date',
        align: 'left',
        field: "expiration_date",
        sortable: true
      },
      {
        name: 'actions',
        required: true,
        label: 'Actions',
        align: 'center',
        field: "actions",
        sortable: true
      },
      ],
    }
  },
  data() {
    return {
      selectedClient_id:0,
      transaction_id:0,
      filter:'',
      cartPrompt:false,
      showQuantity:false,
      availableMedsRow:[],
      rows: [],
      searchTerm: '',
      filteredList: [],
      customerList: [],
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

      transactionDetails:{
        transaction_id:'',
        customer_id:0,
        transaction_date:0,
        item_id:0,
        quantity:0,
        user_id:0,
      }


    }
  },
  mounted() {
    // this.filteredList = this.peopleList
    this.get_clients()

  },
  methods: {

     async remove_order(id){
      await this.transactionStore.remove_order(id)
      this.getOrders(this.transaction_id)
      this.$q.notify({ type: 'positive', message: 'order removed successful!' })
    },
    showData(payload){

      if(!payload.Openning_quantity && !payload.Closing_quantity){
        this.$q.notify({ type: 'negative', message: 'Cannot add item Stocks still closed!' })
        return
       }

      this.transactionDetails.transaction_id = this.transaction_id
      this.transactionDetails.customer_id = this.selectedClient_id
      this.transactionDetails.transaction_date = new Date().toISOString().slice(0, 10)
      this.transactionDetails.item_id = payload.item_id
      this.transactionDetails.user_id = 1
      console.log(payload)
      console.log(this.transactionDetails)
      this.showQuantity = true

    },

    async getOrders(transaction_id){
      await this.transactionStore.getTransactionOrders(transaction_id)
      this.rows = this.transactionStore.customerTransactions
    },

    async add_Order(payload){

      payload.quantity = Number(payload.quantity)
      this.showQuantity = false

       await this.transactionStore.newTransaction(payload)
       this.getAvailableMedList()

       this.getOrders(payload.transaction_id)
       this.transactionDetails.quantity=''
      //  this.$q.notify({ type: 'positive', message: 'order added successful!' })
    },

    async getNewTransactionID(id){
      await this.transactionStore.newTransactionID(id)
      this.transaction_id = this.transactionStore.newCustomerTransactionID
    },

    async getAvailableMedList(){

      this.cartPrompt=true
      await this.itemStore.getJoinedTable_DailyInventor_Items()


      this.availableMedsRow = this.itemStore.items
    },
    async get_client(id) {
      this.selectedClient_id = id
      console.log(id)
      await this.customerStore.getCustomer(id)
      this.costumer = this.customerStore.customer
      this.searchTerm = ''
      this.getNewTransactionID(id)

    },
    async get_clients() {
      try {
        await this.customerStore.getCustomers()
        this.customerList = this.customerStore.customers //fetch all clients from array
        console.log(this.customerList)
      } catch (error) {
        console.log(error)
      }
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

    filterList() {
      if (!this.searchTerm) {
        this.filteredList = this.customerList
      } else {
        this.filteredList = this.customerList.filter((person) => {
          const fullName =
            `${person.firstname} ${person.middlename} ${person.lastname} ${person.ext}`.toLowerCase()
          return fullName.includes(this.searchTerm.toLowerCase())
        })
      }
    },
  },

  watch: {
    searchTerm(newValue) {
      if (newValue) {
        this.filteredList = this.customerList.filter((person) => {
          const fullName =
            `${person.firstname} ${person.middlename} ${person.lastname} ${person.ext}`.toLowerCase()
          return fullName.includes(newValue.toLowerCase())
        })
      } else {
        this.filteredList = []
      }
    },
  },
  computed: {
    customerStore() {
      return useCustomerStore()
    },
    itemStore(){
      return useItemStore()
    },
    transactionStore(){
      return useTransactionStore()
    }
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
