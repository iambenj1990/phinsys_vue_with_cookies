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
          <div class="q-pa-sm row items-center justify-between" >
           <div class="flex justify-start">
             <q-input
              dense
              flat
              type="date"
              filled
              v-model="Trans_Date"
              label="Transaction Date"
              class="text-h11"
              style="width: 150px;"
              @update:model-value="get_clients(this.Trans_Date)"
            />
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
            style="height: 600px;"
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
  </q-page>
</template>
<script>

import { useRequisitionIssuanceSlip } from 'src/stores/RequisitionIssuanceSlip'
import { useItemStore } from 'src/stores/itemsStore'
import { date } from 'quasar'

export default {
  setup() {
    const today = date.formatDate(Date.now(), 'YYYY-MM-DD')
    return {
      today,
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
      Trans_Date: this.today,
      hasOpentransaction: false,

      search: '',
      rows: [],

    }
  },
  methods: {

    async get_RIS_List(){
      await this.risStore.allRIS()
      this.rows = this.risStore.ris_list
    },

    showRIS(ris_no){
      console.log(ris_no)
      this.risStore.ris_no = ris_no
      this.$router.push({path: '/ris/orders/info'})

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
  },
}
</script>
