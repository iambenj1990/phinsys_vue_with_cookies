<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%;">
      <div class="row q-gutter-md">
        <div class="col-12">
          <div align="left" class="text-h6 text-primary">
            Supplies Information
          </div>
        </div>
      </div>
      <q-separator />
      <div v-if="loading" class="flex flex-center">
        <q-circular-progress indeterminate size="90px" color="primary" />
      </div>
      <div v-else class="row q-gutter-md">
        <div class="col-12 col-md-12 q-pa-sm">
          <q-table :rows="rows" :columns="cols" row-key="id"  :filter="filter" flat bordered class="q-mr-md"
            style=" min-height: 500px; max-height: 500px; height: 100%;">
            <!-- <q-table flat bordered :rows="itemsHolder" :columns="columns" row-key="id"
                        style="max-width: 900px;width: 100%; " :filter="filter" class="q-mr-md"> -->
            <template v-slot:top-left>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:top-right>
              <q-btn flat type="button" label="New Stocks" class="q-mr-md q-ml-md" color="primary"
                 icon="add" to="/items/new" />
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
                  {{ props.row.Openning_quantity }}
                </q-td>
                  <q-td key="unit" style="font-size: 11px" align="left">
                  {{ props.row.unit }}
                </q-td>

                 <q-td key="expiration_date" style="font-size: 11px" align="left">
                  {{ props.row.expiration_date }}
                </q-td>

                <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                  <q-badge  style="width: 100px;" :color="getStockColor(props.row.Closing_quantity,props.row.quantity)" text-color="black" class="flex flex-center q-pa-xs">

                    {{props.row.Closing_quantity}}
                   </q-badge>

                </q-td>

                <q-td key="last_inventory_date" style="font-size: 11px;" class="text-weight-bolder" align="left">
                  {{ props.row.last_inventory_date }}
                </q-td>


                <!-- <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn flat color="primary" @click="editItem(props.row)" icon="edit" />
                  <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" />
                </q-td> -->
              </q-tr>

            </template>
          </q-table>
        </div>
      </div>
    </q-card>
    </div>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore';
export default {
  computed:{

    itemStore (){
      return useItemStore();
    }
  },
  setup(){
    return{
      cols:[
      {
        name: 'po_no',
        required: true,
        label: 'PO No',
        align: 'left',
        field: "po_no",
        sortable: true
      },

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
      {
        name: 'Openning_quantity',
        required: true,
        label: 'Quantity',
        align: 'left',
        field: "Openning_quantity",
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
        name: 'remaining_quantity',
        required: true,
        label: 'Remaining Quantity',
        align: 'left',
        field: "remaining_quantity",
        format: val => val ? val : 0, // If empty, set to 0
        sortable: true
      },

      {
        name: 'last_inventory_date',
        required: true,
        label: 'As of',
        align: 'left',
        field: "last_inventory_date",
        format: val => val ? val : 0, // If empty, set to 0
        sortable: true
      }
      // {
      //   name: 'actions',
      //   required: true,
      //   label: 'Actions',
      //   align: 'center',
      //   field: "actions",
      //   sortable: true
      // },
      ]
    }
  },
  data(){

    return{
      color:'',
      rows:[],
      filter:'',
      loading:false,
      MedicineInfo: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: '',
        unit: '',
        quantity: '',
        price:0,
        expiration_date: '',
        user_id: 0,
      },
    }

  },

  methods:{
   async fetchAllStocks(){
    await this.itemStore.getJoinedTable_DailyInventor_Items()
      this.rows = this.itemStore.items
    },

    getStockPercentage(remaining, total) {
      if (total === 0) return 0; // Prevent division by zero
      return Math.round((remaining / total) * 100);
    },
    getStockColor(remaining, total) {
      const percentage = this.getStockPercentage(remaining, total);

      if (percentage === 0) return  "red"; // Out of stock (0%)
      if (percentage <= 10) return  "orange"; // Critical (≤10%)
      if (percentage <= 20) return  "yellow"; // Low (≤20%)
      if (percentage <= 50) return  "blue"; // Medium (≤50%)
      return   "green"; // Safe (>50%)
    },

  },

  mounted(){
    this.fetchAllStocks()
  },
  watch(){

  }


}
</script>
