<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <q-card-section>
          <div align="left" class="text-h6 text-primary">Medicine Information</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <div>
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="New_Po"
                label="Purchase Order Number"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Purchase Order Number is required']"
              />
            </div>
          </div>
          <q-separator></q-separator>
          <div class="row q-gutter-md">
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.brand_name"
                label="Brand Name"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Brand Name is required']"
              />
            </div>
            <div class="col-12 col-md-2 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.generic_name"
                label="Generic Name"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Generic Name is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.dosage"
                label="Dosage"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Dosage is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-select
                dense
                v-model="MedicineInfo.dosage_form"
                :options="MedType"
                label="Dosage form"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Dosage form is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.quantity"
                label="Quantity"
                type="number"
                class="full-width"
                inputmode="numeric"
                lazy-rules
                :rules="[(val) => !!val || 'Quantity is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-select
                dense
                v-model="MedicineInfo.unit"
                :options="sUnit"
                label="Unit"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Unit quantity is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.expiration_date"
                type="date"
                label="Expiration Date"
                class="full-width"
                lazy-rules
                :rules="[(val) => !!val || 'Expiration date is required']"
              />
            </div>
            <div class="col-12 col-md-1 q-pa-sm">
              <q-input
                dense
                v-model="MedicineInfo.price"
                label="Price"
                type="number"
                class="full-width"
                inputmode="numeric"
                lazy-rules
                :rules="[(val) => !!val || 'Price is required']"
              />

            </div>
          </div>
          <div align="right">
            <q-btn type="submit" label="Add" class="" color="primary" style="width: 100px;" @click="insertNewItem(this.MedicineInfo)" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
            >
            <template #body="props">
              <q-tr :v-bind="props">
                <q-td key="generic_name" style="font-size: 11px" align="center">
                  {{ props.row.generic_name }}
                </q-td>
                <q-td key="brand_name" style="font-size: 11px" align="center">
                  {{ props.row.brand_name }}
                </q-td>
                <q-td key="dosage" style="font-size: 11px" align="center">
                  {{ props.row.dosage }}
                </q-td>
                <q-td key="dosage_form" style="font-size: 11px" align="center">
                  {{ props.row.dosage_form }}
                </q-td>
                <q-td key="quantity" style="font-size: 11px" align="center">
                  {{ props.row.quantity }}
                </q-td>
                <q-td key="unit" style="font-size: 11px" align="center">
                  {{ props.row.unit }}
                </q-td>
                <q-td key="price" style="font-size: 11px" align="center">
                  {{ props.row.price }}
                </q-td>
                <q-td key="expiration_date" style="font-size: 11px" align="center">
                  {{ props.row.expiration_date }}
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn flat color="primary" @click="editItem(props.row)" icon="edit" />
                  <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" />
                </q-td>
              </q-tr>

            </template>
          </q-table>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="red" class="q-px-md" label="Back" to="/items/list" style="color:seagreen;width: 100px;" size="md"/>
        </q-card-actions>
      </q-card>
    </div>
    <pre>{PO Number : {{ this.New_Po }}}</pre>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useLoginStore } from 'src/stores/loginSessionStore'

export default {

  watch:{
    'New_Po'(newvalue){
      if(newvalue && newvalue.trim()!==''){
        this.fetchItemsbyPO(newvalue)
        console.log(newvalue)
      }

    }
  },

  created(){

  },

  computed:{

    itemStore(){
      return useItemStore()
    },
    sessionStore(){
      return useLoginStore()
    }
  },
  setup() {
    return {
      defaultValues:{
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        price: 0,
        expiration_date: '',
        user_id: 1,
      },
      columns: [
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
        name: 'price',
        required: true,
        label: 'Price',
        align: 'left',
        field: "price",
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
        align: 'left',
        field: "actions",
        sortable: true
      },
      ],
      sType: ['Medicine', 'Medical Gadget'],
      MedType: ['Tablet', 'Capsule', 'Syrup', 'Powder'],
      sUnit: ['PCS', 'BOX'],
    }
  },
  data() {
    return {
      rows: [],
      New_Po:'',
      MedicineInfo: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        price: 0,
        expiration_date: '',
        user_id: 1,
      },
    }
  },
  methods:{

    inputReset(){
      this.MedicineInfo = {...this.defaultValues}
    },

   async fetchItemsbyPO(po_no){
     await this.itemStore.getItemsByPO(po_no)
      this.rows = this.itemStore.po_items
    },

    async insertNewItem(payload){
      console.log(payload)
      payload.po_no = this.New_Po
      payload.user_id = 1
      console.log('complete payload ',payload)

      await this.itemStore.postItem(payload)
      this.fetchItemsbyPO(this.New_Po)
     this.inputReset()
    },

    async fetchItem(id){
      await this.itemStore.getItem(id)
      this.MedicineInfo =this.itemStore.item
    },

    async updateItem(id,payload){
      await this.itemStore.updateItem(id,payload)
      this.fetchItemsbyPO(this.New_Po)
    }


  }

}
</script>

<style></style>
