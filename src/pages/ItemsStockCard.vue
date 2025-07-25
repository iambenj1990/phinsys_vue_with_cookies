<template>
  <q-page class="q-pa-xl">
    <q-form ref="configForm" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-2 rounded-borders">
        <q-card-section>
          <div class="text-h6 q-mb-md text-green">Item Stockcard</div>

          <!-- <div class="q-gutter-md row q-pb-md">
            <div class="col-md-12 col-md-3">
              <q-input v-model="po_no" label="PO No" outlined dense required />
            </div>
          </div> -->

          <div class="q-gutter-md row q-pb-md">
            <div class="col-md-3">
              <q-input v-model="generic_name" label="Generic Name" outlined dense required />
            </div>
            <div class="col-md-3">
              <q-input v-model="brand_name" label="Brand Name" outlined dense required />
            </div>
            <!-- <div class="col-md-3">
              <q-input v-model="dosage" label="Dosage" outlined dense required />
            </div>
            <div class="col-md-2">
              <q-input v-model="dosage_form" label="Type" outlined dense required />
            </div> -->
          </div>
          <div class="q-gutter-md row">
            <div class="text-h6 q-pt-md text-green col-md-12">
              Movement History
            </div>
            <div class="col-md-12">
             <q-table
                :rows="row"
                :columns="cols"
                row-key="id"
                class=""
                style="height: 500px;"
                :rows-per-page-options="[0]"
              >
             <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="date" style="font-size: 11px;" align="left">
                    {{ props.row.date }}
                  </q-td>
                  <q-td key="po_no" style="font-size: 11px;" align="left">

                    <!-- {{ props.row.po_no }} -->
                      {{ props.row.transaction_type === 'IN'? props.row.po_no : '' }}
                  </q-td>
                  <q-td key="quantity_in" style="font-size: 11px;" align="left">
                    {{ props.row.quantity_in }}
                  </q-td>
                  <q-td key="quantity_out" style="font-size: 11px;" align="left">
                    {{ props.row.quantity_out}}
                  </q-td>
                  <q-td key="openning" style="font-size: 11px;" align="left">
                    {{ props.row.openning }}
                  </q-td>
                  <q-td key="closing" style="font-size: 11px;" align="left">
                    {{ props.row.closing }}
                  </q-td>
                  <q-td key="running_balance" style="font-size: 11px;" align="left">
                    {{ props.row.running_balance }}
                  </q-td>
              </q-tr>
             </template>
              </q-table>
            </div>

          </div>
        </q-card-section>
        <q-card-actions>

          <q-btn flat color="secondary" label="Cancel" @click="$router.back()" />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
export default {


  name: 'StockCard',

  setup() {
    const itemsStore = useItemStore()
    return {
      itemsStore,
       cols: [

        {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: "date",
        sortable: true
      },

        {
        name: 'po_no',
        required: true,
        label: 'P.O No.',
        align: 'left',
        field: "po_no",
        sortable: true
      },

      {
        name: 'quantity_in',
        required: true,
        label: 'IN',
        align: 'left',
        field: "quantity_in",
        sortable: true
      },
       {
        name: 'quantity_out',
        required: true,
        label: 'OUT',
        align: 'left',
        field: "quantity_out",
        sortable: true
      },
       {
        name: 'opening_quantity',
        required: true,
        label: 'Opening Quantity',
        align: 'left',
        field: "opening",
        sortable: true
      },
      {
        name: 'closing_quantity',
        required: true,
        label: 'Closing Quantity',
        align: 'left',
        field: "closing",
        sortable: true
      },
       {
        name: 'running_balance',
        required: true,
        label: 'Running Balance',
        align: 'left',
        field: "running_balance",
        sortable: true
      }

       ],
    }
  },
  data() {
    return {
      row: [],

      po_no: '',
      generic_name: '',
      brand_name: '',
      dosage: '',
      dosage_form: '',

    }
  },
  mounted() {
    this.generic_name = this.itemsStore.selected_stockCard.generic_name
    this.brand_name = this.itemsStore.selected_stockCard.brand_name

    this.getStockCard()
  },
  methods: {
    async getStockCard(){

      const payloadData = {
        generic_name : this.itemsStore.selected_stockCard.generic_name,
        brand_name : this.itemsStore.selected_stockCard.brand_name,
      }

      await this.itemsStore.getStockCard(payloadData)
      this.row = this.itemsStore.stockCard

    }
  },
}
</script>

<style scoped></style>
