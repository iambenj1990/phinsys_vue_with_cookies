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
          <div class="text-h6 text-primary q-my-sm">Requisition and Issuance Slip</div>
          <div class="q-pa-sm row items-center justify-between">
           <div class="flex justify-start">


            <div class="q-my-sm flex flex-wrap q-px-md justify-end">
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

          </div>
            <div class="row items-center">
              <q-btn
                class="q-mr-sm"
                style="font-size: 13px"
                dense
                color="primary"
                label="New Transaction"
                icon="add"
                @click="lookforOpen()"
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
            style="height: 600px"
          >
            <!-- <template v-slot:top-right>
              <q-btn
              style="font-size: 12px"
              color="green"
              label="Export"
              icon="import_export"
            />
            </template> -->

            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="ris_id" style="font-size: 11px" align="left">
                  {{ props.row.ris_id }}
                </q-td>
                <q-td key="purpose" style="font-size: 11px" align="left">
                  {{ props.row.purpose }}
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    color="primary"
                    @click="showRIS(props.row.ris_id)"
                    icon="description"
                    to="/ris/orders/info"
                  >
                    <q-tooltip>Show Information</q-tooltip>
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
    <!-- <q-dialog v-model="warning" persistent> </q-dialog>
    <q-dialog v-model="DeleteClient" persistent>
      <q-card class="q-pa-sm" style="max-width: 400px; width: 100%">
        <q-card-section>
          <div class="text-h6 text-primary">Do you want to delete this client?</div>
        </q-card-section>
        <q-card-actions align="right">
           Button to close dialog -->
    <!-- <q-btn flat label="Yes" color="primary" @click="remove_client()" /> -->
    <!-- <q-btn flat label="No" color="red" @click="DeleteClient = false" /> -->
    <!-- </q-card-actions>
      </q-card>
    </q-dialog> -->
    <!--
    <pre>{{ this.Trans_Date }}</pre> -->

    <q-dialog v-model="show_date" persistent>
      <q-card>
        <q-card-section>
          <q-date range v-model="selectedDates"></q-date>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Yes" color="primary" />
          <q-btn flat label="No" color="red" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { useRequisitionIssuanceSlip } from 'src/stores/RequisitionIssuanceSlip'
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
    console.log(today)
    const start = new Date(today.getFullYear(), today.getMonth(),1)

     console.log(start)

    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    console.log(end)
    return {
      today,
      start,
      end,
      columns: [
        {
          name: 'ris_id',
          label: 'R.I.S. #',
          field: 'ris_id',
          sortable: true,
          align: 'left',

          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'purpose',
          label: 'Purpose',
          field: 'purpose',
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
      show_date: false,
      selectedDates: {
        from: '',
        to: '',
      },
      rangeText: '',
      Trans_Date: this.today,
      hasOpentransaction: false,

      search: '',
      rows: [],
    }
  },
  methods: {

    async get_RIS_List_byDate(payload) {
      await this.risStore.RIS_byDate(payload)
      this.rows = this.risStore.ris_list
    },

    async get_RIS_List() {
      await this.risStore.allRIS()
      this.rows = this.risStore.ris_list
    },

    showRIS(ris_no) {
      console.log(ris_no)
      this.risStore.ris_no = ris_no
      this.$router.push({ path: '/ris/orders/info' })
    },

    get_RIS_by_Date(payload) {
      console.log(payload)
    },

    async lookforOpen() {
      try {
        await this.Items.openLookup()
        this.hasOpentransaction = this.Items.hasOpening
        if (this.hasOpentransaction == false) {
          this.$router.push({ path: '/ris/orders/new' })
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
        this.get_RIS_List_byDate(newRange)

      }, 500),
      immediate: true, // Call the handler immediately with the initial value
      deep: true, // Watch for changes in the object properties
    },

  },
  computed: {
    risStore() {
      return useRequisitionIssuanceSlip()
    },
    Items() {
      return useItemStore()
    },
  },
  mounted() {
     this.get_RIS_List()

    this.selectedDates= {
      from : this.start.toISOString().split('T')[0],
      to : this.end.toISOString().split('T')[0]

    }


  },
}
</script>
