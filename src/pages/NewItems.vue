<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <q-card-section>
          <div align="left" class="text-h6 text-primary">Medicine Information</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-form @submit.prevent="handleSubmit" ref="formRef">
          <q-card-section>
            <div>
              <q-checkbox
                v-model="useTemp"
                size="xs"
                label="Use Temporary ID"
                @update:model-value="get_temp_id"
                style="color: grey"
              />
              <div class="col-12 col-md-2 q-pa-sm">
                <q-input
                  dense
                  v-model="New_Po"
                  label="Purchase Order Number"
                  class="full-width text-uppercase"
                  lazy-rules
                  :rules="[(val) => !!val || 'Purchase Order Number is required']"
                >
                </q-input>
              </div>
            </div>
            <q-separator />
            <div class="row q-gutter-md">
              <div class="col-12 col-md-2 q-pa-sm relative-position">
                <q-input
                  @input="filterList()"
                  @blur="hideListWithDelay"
                  dense
                  v-model="MedicineInfo.brand_name"
                  label="Brand Name"
                  class="full-width text-uppercase"
                  lazy-rules
                  :rules="[(val) => !!val || 'Brand Name is required']"
                />

                <q-list class="q-pa-sm flex floating-list text-uppercase" v-if="this.filteredList.length > 0">
                  <q-item
                    v-for="item in this.filteredList"
                    :key="item.id"
                    clickable
                    @click="
                      () => {
                        MedicineInfo.brand_name = item.brand_name
                        MedicineInfo.generic_name = item.generic_name
                        MedicineInfo.dosage = item.dosage
                        MedicineInfo.dosage_form = item.dosage_form

                        filteredList = []
                        this.$refs.Units.focus()
                      }
                    "
                  >
                    <q-item-section>
                      <q-item-label> {{ item.brand_name }} {{ item.generic_name }} </q-item-label>
                      <q-item-label caption>
                        Dosage: {{ item.dosage }} | Dosage Form: {{ item.dosage_form }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <div class="col-12 col-md-2 q-pa-sm">
                <q-input
                  dense
                  v-model="MedicineInfo.generic_name"
                  label="Generic Name"
                  class="full-width text-uppercase"
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
              <div class="col-12 col-md-2 q-pa-sm">
                <q-select
                  dense
                  v-model="MedicineInfo.dosage_form"
                  :options="MedType"
                  label="Dosage form"
                  class="full-width text-uppercase"
                  lazy-rules
                  :rules="[(val) => !!val || 'Dosage form is required']"
                />
              </div>

              <div class="col-12 col-md-2 q-pa-sm">
                <q-select
                  dense
                  ref="Units"
                  v-model="MedicineInfo.unit"
                  :options="sUnit"
                  label="Unit"
                  class="full-width text-uppercase"
                  style="width: 120px"
                  lazy-rules
                  :rules="[(val) => !!val || 'Unit quantity is required']"
                  @update:model-value="handleUnitChange"
                />
                <div v-if="MedicineInfo.unit == 'BOX'">
                  <div class="row">
                    <q-input
                      dense
                      label="Box Quantity"
                      style="width: 120px"
                      class="full-width"
                      lazy-rules
                      :rules="[(val) => !!val || 'Box Quantity is required']"
                      v-model="MedicineInfo.box_quantity"
                      @update:model-value="computeTotalQuantity"
                    />
                    <q-input
                      dense
                      style="width: 100px"
                      label="Quantity per Box"
                      class="q-mx-md full-width"
                      lazy-rules
                      :rules="[(val) => !!val || 'Quantity per Box is required']"
                      v-model="MedicineInfo.quantity_per_box"
                      @update:model-value="computeTotalQuantity"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-1 q-pa-sm">
                <q-input
                  :readonly="MedicineInfo.unit == 'BOX'"
                  dense
                  v-model="MedicineInfo.quantity"
                  label="Quantity"
                  type="number"
                  inputmode="numeric"
                  lazy-rules
                  :rules="[(val) => !!val || 'Quantity is required']"
                />
              </div>
              <div class="col-12 col-md-2 q-pa-sm">
                <q-input
                  dense
                  v-model="MedicineInfo.expiration_date"
                  type="date"
                  label="Expiration Date"
                  class="full-width"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Expiration date is required',
                    (val) => {
                      if (!val) return true // Skip if empty (handled by previous rule)
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const inputDate = new Date(val)
                      inputDate.setHours(0, 0, 0, 0)
                      return inputDate >= today || 'Date must be today or later'
                    },
                  ]"
                />
              </div>
              <div class="col-12 col-md-1 q-pa-sm">
                <q-input
                  dense
                  v-model="MedicineInfo.price"
                  prefix="₱"
                  label="Total Price"
                  class="full-width"
                  type="number"
                  inputmode="numeric"
                  lazy-rules
                  :rules="[(val) => !!val || 'Price is required']"
                  @update:model-value="computePrice"
                />
              </div>
              <div class="col-12 col-md-1 q-pa-sm">
                <q-input
                  dense
                  v-model="MedicineInfo.price_per_pcs"
                  prefix="₱"
                  label="Price / pcs"
                  class="full-width"
                  type="number"
                  inputmode="numeric"
                  lazy-rules
                  :rules="[(val) => !!val || 'Price is required']"
                  readonly
                />
              </div>
            </div>
            <div align="right" v-if="toUpdate">
              <q-btn
                label="cancel"
                class="q-mx-sm"
                color="red"
                style="width: 100px"
                @click="viewReset()"
              />
              <q-btn type="submit" label="Update" color="primary" style="width: 100px" />
            </div>
            <div align="right" v-else-if="!toUpdate">
              <q-btn type="submit" label="Add" color="primary" style="width: 100px" />
            </div>
          </q-card-section>
        </q-form>
        <q-separator />
        <q-card-section>
          <div>
            <q-table :rows="rows" :columns="columns" row-key="id">
              <template #body="props">
                <q-tr :v-bind="props">
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
                  <q-td key="price" style="font-size: 11px" align="left">
                    {{ props.row.price }}
                  </q-td>
                  <q-td key="expiration_date" style="font-size: 11px" align="left">
                    {{ props.row.expiration_date }}
                  </q-td>

                  <q-td key="actions" style="font-size: 11px" align="left">
                    <q-btn flat color="primary" @click="fetchItem(props.row.id)" icon="edit" />
                    <q-btn flat color="negative" icon="delete" @click="removeItem(props.row.id)" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>

        <q-card-actions align="right">


          <q-btn
            color="red"
            class="q-px-md"
            label="Back"
            to="/items/list"
            style="width: 100px"
            size="md"
          />
        </q-card-actions>
      </q-card>
    </div>
    <!-- <pre>{PO Number : {{ this.New_Po }}}</pre>
    <pre>{Status : {{ this.toUpdate }}}</pre>
    <pre>{Price: {{ MedicineInfo.price }}}</pre>
    <pre>{Price: {{ MedicineInfo.box_quantity }}}</pre>
    <pre>{Price: {{ MedicineInfo.quantity_per_box }}}</pre> -->
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useLoginStore } from 'src/stores/loginSessionStore'



export default {
  watch: {
    New_Po(newvalue) {
      if (newvalue && newvalue.trim() !== '') {
        this.fetchItemsbyPO(newvalue)
        console.log(newvalue)
      }
    },

    'MedicineInfo.brand_name'(newValue) {
      if (newValue) {
        this.filteredList = this.medMiniInfo.filter((item) => {
          const itemName = `${item.brand_name} ${item.generic_name}`.toLowerCase()
          return itemName.includes(newValue.toLowerCase())
        })
      } else {
        this.filteredList = []
      }
    },
  },

  created() {
    // this.itemStore.injectToken() //should be always on top to inject token before any api call
    this.fetch_Medicine_info()
    this.ShowDosageForm()


  },

  computed: {
    itemStore() {
      return useItemStore()
    },
    sessionStore() {
      return useLoginStore()
    },
  },
  setup() {

    return {

      defaultValues: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        box_quantity: 0,
        quantity_per_box: 0,
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
          field: 'generic_name',
          sortable: true,
        },
        {
          name: 'brand_name',
          required: true,
          label: 'Brand Name',
          align: 'left',
          field: 'brand_name',
          sortable: true,
        },
        {
          name: 'dosage',
          required: true,
          label: 'Dosage',
          align: 'left',
          field: 'dosage',
          sortable: true,
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'dosage_form',
          sortable: true,
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
          sortable: true,
        },
        {
          name: 'unit',
          required: true,
          label: 'Unit',
          align: 'left',
          field: 'unit',
          sortable: true,
        },
        {
          name: 'price',
          required: true,
          label: 'Price',
          align: 'left',
          field: 'price',
          sortable: true,
        },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'left',
          field: 'actions',
          sortable: true,
        },
      ],
      sType: ['Medicine', 'Medical Gadget'],

      sUnit: ['PCS', 'BOX'],
    }
  },
  data() {
    return {
      filteredList: [],
      medMiniInfo: [],
      useTemp: false,
      toUpdate: false,
      rows: [],
      New_Po: '',
      selected_id: 0,
      MedicineInfo: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        box_quantity: 0,
        quantity_per_box: 0,
        price: 0,
        price_per_pcs: 0,
        expiration_date: '',
        user_id: 0,
      },
      searchTerm: '',
      MedType: [],

    }
  },

  methods: {

    GetUserID(){
      const unsanitized_object = localStorage.getItem('user')
      const sanitized_object = unsanitized_object.replace('__q_objt|', '')
      const user = JSON.parse(sanitized_object)
      return user.id
    },


    async ShowDosageForm(){
      try {
        await this.itemStore.getDosageForm()
        this.MedType = this.itemStore.dosageForm.map(item => item.type)
        console.log('med type =>',this.MedType)
      } catch (error) {
        console.error('Error fetching dosage forms:', error)
      }
    },

    filterList() {
      if (!this.MedicineInfo.brand_name) {
        this.filteredList = this.medMiniInfo
      } else {
        this.filteredList = this.medMiniInfo.filter((medicine) => {
          const stockname = `${medicine.brand_name} ${medicine.generic_name}`.toLowerCase()
          return stockname.includes(this.MedicineInfo.brand_name.toLowerCase())
        })
      }
    },

    async handleSubmit() {
      const valid = await this.$refs.formRef.validate()
      if (!valid) {
        this.$q.notify({ type: 'negative', message: 'Please complete all required fields.' })
        return
      }

      if (this.toUpdate) {
        this.updateItem(this.selected_id, this.MedicineInfo)
      } else {
        this.insertNewItem(this.MedicineInfo)
      }
    },

    computePrice() {
      this.MedicineInfo.price_per_pcs = this.MedicineInfo.price / this.MedicineInfo.quantity
      this.MedicineInfo.price_per_pcs = Math.round(this.MedicineInfo.price_per_pcs * 100) / 100
    },
    handleUnitChange() {
      //Reset values when unit change
      if (this.MedicineInfo.unit !== 'BOX') {
        this.MedicineInfo.quantity_per_box = 0
        this.MedicineInfo.box_quantity = 0
        this.MedicineInfo.quantity = 0
      }
    },
    computeTotalQuantity() {
      if (this.MedicineInfo.unit == 'BOX') {
        this.MedicineInfo.quantity =
          this.MedicineInfo.box_quantity * this.MedicineInfo.quantity_per_box
      }
    },

    viewReset() {
      this.$refs.formRef.resetValidation()
      this.toUpdate = false
      this.inputReset()
    },

    inputReset() {
      this.MedicineInfo = { ...this.defaultValues }
    },

    async fetchItemsbyPO(po_no) {
      await this.itemStore.getItemsByPO(po_no)
      this.rows = this.itemStore.po_items
    },

    async insertNewItem(payload) {
      //console.log('payload =>', this.GetUserID())
      payload.po_no = this.New_Po
      payload.user_id = this.GetUserID()

      await this.itemStore.postItem(payload)
      this.fetchItemsbyPO(this.New_Po)
      this.inputReset()
      this.$q.notify({
        type: 'positive',
        message: 'Adding records successful!',
        position: 'center',
        timeout: 1000,
      })
    },

    async fetch_Medicine_info() {
      await this.itemStore.getStockMiniInfo()
      this.medMiniInfo = this.itemStore.stockMiniInfo
      console.log(this.medMiniInfo)
    },

    async fetchItem(id) {
      console.log(id)
      await this.itemStore.getItem(id)
      this.MedicineInfo = this.itemStore.item
      this.toUpdate = true
      this.selected_id = id
    },

    async updateItem(id, payload) {
      await this.itemStore.updateItem(id, payload)
      this.fetchItemsbyPO(this.New_Po)
      this.inputReset()
      this.$q.notify({
        type: 'positive',
        message: 'Updating records successful!',
        position: 'center',
        timeout: 1000,
      })
    },

    async removeItem(id) {
      await this.itemStore.deleteItem(id)
      this.fetchItemsbyPO(this.New_Po)
      this.$q.notify({
        type: 'positive',
        message: 'removing records successful!',
        position: 'center',
        timeout: 1000,
      })
    },

    async get_temp_id() {
      try {
        if (this.useTemp == true) {
          await this.itemStore.getTempID()
          this.New_Po = this.itemStore.temp_id
        } else {
          this.New_Po = ''
        }
      } catch (error) {
        console.log(error)
      }
    },

    hideListWithDelay() {
      // Add a slight delay to allow click to register before hiding
      setTimeout(() => {
        this.filteredList = []
      }, 200)
    },
  },


}
</script>

<style>
.floating-list {
  position: absolute;
  background: white;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 4px;
}

.relative-position {
  position: relative;
}
</style>
