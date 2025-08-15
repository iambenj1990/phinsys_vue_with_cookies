<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <q-card-section>
          <q-input filled v-model="search" label="Search Clients" class="text-h11">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <div class="text-h6 text-primary q-my-sm">Daily Customers</div>
          <div class="q-pa-sm row items-center justify-between" >
           <div class="flex justify-start">
             <!-- <q-input
              dense
              flat
              type="date"
              filled
              v-model="Trans_Date"
              label="Transaction Date"
              class="text-h11"
              style="width: 150px;"
              @update:model-value="get_clients(this.Trans_Date)"
            /> -->

              <q-input v-model="rangeText" label="Select Date Range" dense readonly style="width: 250px">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="selectedDates" range mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>


           </div>
           <div class="row items-center">
            <q-btn
              class="q-mr-sm"
              style="font-size: 13px"
              dense
              color="primary"
              label="New Transaction"
              icon="add"
              @click="lookforOpen"
              flat
            />

           </div>

          </div>
          <q-table
            flat
            bordered
            :filter="search"
            :rows="rows"
            :columns="columns"
            row-key="id"
            binary-state-sort
            no-data-label="No data available"
            :rows-per-page-options="[0]"
           class="my-sticky-header-table"
           table-header-class="text-white"
          >
            <template v-slot:top-right>
              <q-btn
              style="font-size: 12px"
              color="green"
              label="Export"
              icon="import_export"
            />
            </template>

            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="lastname" style="font-size: 11px" align="left">
                  {{ props.row.lastname }}
                </q-td>
                <q-td key="firstname" style="font-size: 11px" align="left">
                  {{ props.row.firstname }}
                </q-td>
                <q-td key="middle_name" style="font-size: 11px" align="left">
                  {{ props.row.middlename }}
                </q-td>
                <q-td key="ext" style="font-size: 11px" align="left">
                  {{ props.row.ext }}
                </q-td>
                <q-td key="birthdate" style="font-size: 11px" align="left">
                  {{ props.row.birthdate }}
                </q-td>
                <q-td key="age" style="font-size: 11px" align="left">
                  {{ props.row.age }}
                </q-td>
                <q-td key="contact_number" style="font-size: 11px" align="left">
                  {{ props.row.contact_number }}
                </q-td>
                <q-td key="barangay" style="font-size: 11px" align="left">
                  {{ props.row.barangay }}
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    color="primary"
                    @click="showClient(props.row.id)"
                    icon="description"
                    to="/customers/profile/current"
                  >
                    <q-tooltip> Profile and History </q-tooltip>
                  </q-btn>
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
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="warning" persistent> </q-dialog>
    <q-dialog v-model="DeleteClient" persistent>
      <q-card class="q-pa-sm" style="max-width: 400px; width: 100%">
        <q-card-section>
          <div class="text-h6 text-primary">Do you want to delete this client?</div>
        </q-card-section>
        <q-card-actions align="right">
          <!-- Button to close dialog -->
          <q-btn flat label="Yes" color="primary" @click="remove_client()" />
          <q-btn flat label="No" color="red" @click="DeleteClient = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
<!--
    <pre>{{ this.Trans_Date }}</pre> -->
  </q-page>
</template>
<script>
import { useCustomerStore } from '../stores/customersStore'
import { useItemStore } from 'src/stores/itemsStore'


function debounce(fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  }
}

export default {
  setup() {
    const today = new Date()
    today.toLocaleDateString('en-CA')
     const start = new Date(today.getFullYear(), today.getMonth(),1)
     const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return {
      today,
      start,
      end,
      columns: [
        {
          name: 'lastname',
          label: 'Last Name',
          field: 'lastname',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'firstname',
          label: 'First Name',
          field: 'firstname',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'middlename',
          label: 'Middle Name',
          field: 'middlename',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'ext',
          label: 'Ext',
          field: 'ext',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'birthdate',
          label: 'Birthdate',
          field: 'birthdate',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'age',
          label: 'Age',
          field: 'age',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'contact_number',
          label: 'Contact Number',
          field: 'contact_number',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'barangay',
          label: 'Barangay',
          field: 'barangay',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'Actions',
          label: 'Actions',
          field: 'actions',
          align: 'center',

          headerStyle: 'font-size: 1.2 em',
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
      Trans_Date: this.today,
      hasOpentransaction: false,
      warning: false,
      Selected_ID: 0,
      DeleteClient: false,
      search: '',
      rows: [],
      CustomerInfo: {
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


    }
  },
  methods: {
    showDeletepage(id) {
      this.Customers.customer_id = id
      this.DeleteClient = !this.DeleteClient
    },

    showClient(id) {
       console.log(id)
      this.Customers.isEdit = true
      this.Customers.isSave = false
      this.Customers.customer_id = id
       this.Customers.transactions_id = id.transaction_id


    },

    async get_clients(payload) {
      try {
        // await this.Customers.getCustomerOftheDay(payload)
        await this.Customers.getCustomersByDate(payload)
        this.rows = this.Customers.customers //fetch all clients from array
        //console.log(this.rows)
      } catch (error) {
        console.log(error)
      }
    },

    async remove_client() {
      try {
        // await this.ClientStore.removeClient(this.Selected_ID)
        await this.Customers.removeCustomer(this.Customers.customer_id)
        this.$q.notify({
          type: 'positive',
          message: 'Deleting record successful!',
          position: 'center',
          timeout: 1200,
        })
        this.get_clients()
        this.DeleteClient = false
      } catch (error) {
        console.error(error)
      }
    },

    async lookforOpen() {
      try {
        await this.Items.openLookup()
        this.hasOpentransaction = this.Items.hasOpening

        if (this.hasOpentransaction == false) {
          this.$router.push({ path: '/customers/orders/new' })
        } else
          this.$q.notify({
            type: 'negative',
            message:
              'Unable to proceed, Please Coordinate with personnel incharge to open Inventory!',
            position: 'center',
            timeout: 2200,
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
   watch: {

      selectedDates: {
      handler: debounce(function (newRange) {
        this.rangeText = `${newRange.from} to ${newRange.to}`

        console.log(newRange)
        //this.get_RIS_List_byDate(newRange)
        this.get_clients(newRange)

      }, 500),
      immediate: true, // Call the handler immediately with the initial value
      deep: true, // Watch for changes in the object properties
    },

  },
  computed: {
    Customers() {
      return useCustomerStore()
    },
    Items() {
      return useItemStore()
    },
  },
  mounted() {


    this.selectedDates= {
      from : this.start.toISOString().split('T')[0],
      to : this.end.toISOString().split('T')[0]

    }

      // this.get_clients(this.selectedDates)
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
