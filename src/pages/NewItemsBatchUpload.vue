<template>
  <q-page>
    <q-card class="my-card q-ma-md">
      <q-card-section class="text-h6">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          flat
          class="q-my-md"
          table-header-class="text-h6 text-green"
          table-body-class="text-subtitle1 text-green"
          :rows-per-page-options="[0]"
          style="height: 600px"
        >
          <template v-slot:top>
            <div class="q-my-sm" align="right">
              <q-file
                dense
                v-model="excelPathModel"
                label="Load excel file"
                @update:model-value="loadExcelFile"
              />
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="text-subtitle1 text-weight-regular text-grey-9">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ props.row[col.field] }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-card-actions>
           <q-btn
              class="text-white text-subtitle2 text-weight-regular"
                icon="save"
                color="green"
                label="Save"
                @click="batchNewItems({ medicines: rows })"
                :disable="rows.length === 0"
                style="width: 120px;"
              />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useUserStore } from 'src/stores/userStore';
import * as XLSX from 'xlsx'

export default {
  watch: {},

  created() {
    this.GetAuthenticatedUser()
  },

  computed: {
    itemStore() {
      return useItemStore()
    },

  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
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
        user_id: 0,
      },
      columns: [
        {
          name: 'po_no',
          required: false,
          label: 'PO No',
          align: 'left',
          field: 'po_no',
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
          name: 'generic_name',
          required: true,
          label: 'Generic Name',
          align: 'left',
          field: 'generic_name',
          classes: 'text-wrap',
          style: 'white-space: normal',
          sortable: true,
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Dosage Form',
          align: 'left',
          field: 'dosage_form',
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
          name: 'category',
          required: false,
          label: 'Category',
          align: 'left',
          field: 'category',
          sortable: true,
        },
        {
          name: 'unit',
          required: false,
          label: 'Unit',
          align: 'left',
          field: 'unit',
          sortable: true,
        },
        {
          name: 'price',
          required: false,
          label: 'Price',
          align: 'left',
          field: 'price',
          sortable: true,
        },
        {
          name: 'price_per_pcs',
          required: false,
          label: 'Price per Piece',
          align: 'left',
          field: 'price_per_pcs',
          sortable: true,
        },
        {
          name: 'quantity',
          required: false,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
          sortable: true,
        },
        {
          name: 'box_quantity',
          required: false,
          label: 'Box Quantity',
          align: 'left',
          field: 'box_quantity',
          sortable: true,
        },
        {
          name: 'quantity_per_box',
          required: false,
          label: 'Qty per Box',
          align: 'left',
          field: 'quantity_per_box',
          sortable: true,
        },
        {
          name: 'expiration_date',
          required: false,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },
      ],
    }
  },
  data() {
    return {
      user:{},
      rows: [],
      excelPathModel: null,

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
    }
  },

  methods: {
    openUploadDialog() {
      this.upload = true
    },

    loadExcelFile(file) {
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        const dataRows = rawData.slice(1)

        this.rows = dataRows
          .filter(
            (row) =>
              Array.isArray(row) &&
              row.length > 0 &&
              row.some((cell) => String(cell || '').trim() !== ''),
          )
          .map((row) => ({
            po_no: row[0] ?? '',
            brand_name: row[1] ?? 'GENERIC',
            generic_name: row[2] ?? 'N/A',
            dosage: row[3] ?? 'N/A',
            dosage_form: row[4] ?? 'N/A',
            category: row[5] ?? 'N/A',
            unit: row[6] ?? 'N/A',
            price: parseFloat(row[7]) || 0,
            price_per_pcs: parseFloat(row[8]) || 0,
            quantity: parseInt(row[9]) || 0,
            box_quantity: parseInt(row[10]) || 0,
            quantity_per_box: parseInt(row[11]) || 0,
            expiration_date: isNaN(row[12]) ? '' : this.ExeldataToJSDate(Number(row[12])),
            user_id: this.GetUserID,
          }))
      }
      reader.readAsArrayBuffer(file)
    },

    ExeldataToJSDate(ExcelDate) {
      const utc_days = Math.floor(ExcelDate - 25569)
      const utc_value = utc_days * 86400
      const date = new Date(utc_value * 1000)

      // Format to YYYY-MM-DD
      const year = date.getUTCFullYear()
      const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Month is 0-based
      const day = String(date.getUTCDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    },


     async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
    },

    async batchNewItems(payload) {
      try {
        payload.medicines.forEach((item) => {
          item.category = 'N/A'
          item.user_id = this.user.id
        })

          console.log('Batch insert payload:', payload)
         await this.itemStore.batchInsert(payload)
        this.$q.notify({
          type: 'positive',
          message: 'Items successfully added to the catalog.',
        })
        this.rows = [] // Clear the rows after successful upload
        this.excelPathModel = null // Reset the file input
      } catch (error) {
        console.error('Error adding items:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Failed to add items. Please try again.',
        })
      }
    },
  },
}
</script>

<style scoped>
.scrollable-body {
  display: block;
  max-height: 400px;
  overflow-y: auto;
}

.scrollable-body tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

thead tr {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
}
</style>
