<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%;">
      <div class="row q-gutter-md">
        <div class="col-12">
          <div align="left" class="text-h6 text-primary q-pa-md">
            Supplies Information
          </div>
        </div>
      </div>
      <q-separator />
      <div v-if="loading" class="flex flex-center">
        <q-circular-progress indeterminate size="90px" color="primary" />
      </div>
      <div v-else class="row q-gutter-md">
        <div class="col-12 col-md-12 q-pt-md">
          <q-table :rows="rows" :columns="cols" row-key="id" :visible-columns="[
            'po_no',
            'generic_name',
            'brand_name',
            'dosage',
            'dosage_form',
            'unit',
            'quantity',
            'expiration_date',
          ]" :filter="filter" flat bordered class="q-mr-md"
            style=" max-height: 700px; height: 100%;">
            <template v-slot:top-left>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:top-right>
               <q-btn
                flat
                label="Update P.O. #"
                class="text-subtitle2"
                color="primary"
                icon="source"
                @click=" () => {
                    this.$router.push('/items/temporary-po');
                  }"
              />
              <q-btn flat type="button" label="Add Purchases" class="q-mr-md q-ml-md" color="primary"
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
                <q-td key="quantity" style="font-size: 11px" align="left">
                  {{ props.row.quantity }}
                </q-td>
                <q-td key="unit" style="font-size: 11px" align="left">
                  {{ props.row.unit }}
                </q-td>

                <q-td key="expiration_date" style="font-size: 11px" align="left">
                  {{ props.row.expiration_date }}
                </q-td>
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
        name: 'quantity',
        required: true,
        label: 'Quantity',
        align: 'left',
        field: "quantity",
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

      ]
    }
  },
  data(){

    return{
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
    await this.itemStore.getItems()
      this.rows = this.itemStore.items
    }
  },

  mounted(){
    this.fetchAllStocks()
  }


}
</script>
