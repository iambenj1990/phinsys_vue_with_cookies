<template>
  <q-page class="q-pa-md">
    <div class="q-mx-auto">
      <q-card class="q-pa-lg q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-sm text-green">Medicine Catalog</div>
        </q-card-section>
        <q-card-section>
          <div class="q-my-sm" align="right">
            <q-btn flat color="primary" label="Upload New Item" @click="upload = true" />
          </div>

          <q-table :rows="items" :columns="cols" />
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="upload" persistent class="q-mx-auto">
      <div style="max-width: 800px; width: 100%; height: 700px">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6 text-green">New Catalog</div>
          </q-card-section>

          <q-card-section>
            <!-- Form for adding new item -->
            <q-card-actions align="right" class="q-px-md">
              <q-file
                dense
                v-model="excelPathModel"
                label="Load file"
                use-chips
                style="max-width: 300px"
                @update:model-value="loadExcelFile"
              />
            </q-card-actions>

            <q-table
              :rows="medicines"
              :columns="upload_cols"
              virtual-scroll
              :pagination="{
                rowsPerPage: 20,
                page: 1,
              }"
            />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md">
            <q-btn
              flat
              color="red"
              label="Cancel"
              @click="
                () => {
                  upload = false
                  excelPathModel = null
                  medicines = []
                }
              "
            />
            <q-btn flat color="primary" label="Save" @click="newCatalog({ medicines })" />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { useCatalogStore } from 'src/stores/libItems'
import * as XLSX from 'xlsx'





export default {
  name: 'LibItemsList',
  data() {
    return {
      excelPathModel: null,
      upload: false,
      items: [],
      cols: [
        { name: 'generic_name', label: 'Generic Name', field: 'generic_name', align: 'left',  style: 'max-width: 200px; white-space: normal;' },
        { name: 'brand_name', label: 'Brand Name', field: 'brand_name', align: 'left',  style: 'max-width: 200px; white-space: normal;' },
        { name: 'dosage', label: 'Dosage', field: 'dosage', align: 'left' },
        { name: 'dosage_form', label: 'Dosage Form', field: 'dosage_form', align: 'left' },
      ],

      medicines: [],
      upload_cols: [
        { name: 'generic_name', label: 'Generic Name', field: 'generic_name', align: 'left' },
        { name: 'brand_name', label: 'Brand Name', field: 'brand_name', align: 'left' },
        { name: 'dosage', label: 'Dosage', field: 'dosage', align: 'left' },
        { name: 'dosage_form', label: 'Dosage Form', field: 'dosage_form', align: 'left' },
      ],
      // Your component data here
    }
  },
  methods: {


    loadExcelFile(file) {
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        const dataRows = rawData.slice(1)

        this.medicines = dataRows
          .filter(
            (row) =>
              Array.isArray(row) &&
              row.length > 0 &&
              row.some((cell) => String(cell || '').trim() !== ''),
          )
          .map((row) => ({
            generic_name: row[2] ?? '',
            brand_name: row[1] ?? '',
            dosage: row[3] ?? '',
            dosage_form: row[4] ?? '',
          }))
      }
      reader.readAsArrayBuffer(file)
    },

    // Your methods here
    openUploadDialog() {
      this.upload = true
    },
    async getCatalogItems() {
      try {
        this.catalogStore.getCatalog()
        this.items = this.catalogStore.catalog_list
      } catch (error) {
        console.error('Error fetching catalog items:', error)
      }
    },

    async newCatalog(payload) {
      try {
      const unsanitized_object = localStorage.getItem('user')
      const sanitized_object = unsanitized_object.replace('__q_objt|', '')
      const user = JSON.parse(sanitized_object)
      payload.medicines.forEach((item) => {
        item.category = 'medicine'
        item.user_id = user.id
      })



      this.catalogStore.newCatalog(payload)
      this.getCatalogItems()
      this.upload_items=[]
      this.upload = false
      } catch (error) {
        console.error('Error saving new catalog item:', error)
      }
    },


  },
  mounted() {
    // Lifecycle hook
    this.items = []
    this.medicines = []
    this.getCatalogItems()
  },

  computed: {
    // Computed properties if needed

    catalogStore() {
      return useCatalogStore()
    },
  },
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
