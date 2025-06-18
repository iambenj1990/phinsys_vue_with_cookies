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
      <div style="max-width: 800px; width: 100%">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6 text-green">New Catalog</div>
          </q-card-section>

          <q-card-section>
            <!-- Form for adding new item -->
            <q-table :rows="upload_items" :columns="upload_cols" />
          </q-card-section>

          <q-card-actions align="right" class="q-px-md">
            <q-btn flat color="red" label="Cancel" @click="upload = false" />
            <q-btn flat color="primary" label="Save" @click="saveNewItem" />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'LibItemsList',
  data() {
    return {
      upload: false,
      items: [],
      cols: [
        { name: 'generic_name', label: 'Generic Name', field: 'generic_name', align: 'left' },
        { name: 'brand_name', label: 'Brand Name', field: ' brand_name', align: 'left' },
        { name: 'dosage', label: 'Dosage', field: 'dosage', align: 'left' },
        { name: 'dosage_form', label: 'Dosage Form', field: 'dosage_form', align: 'left' },
      ],

      upload_items: [],
      upload_cols: [
        { name: 'generic_name', label: 'Generic Name', field: 'generic_name', align: 'left' },
        { name: 'brand_name', label: 'Brand Name', field: ' brand_name', align: 'left' },
        { name: 'dosage', label: 'Dosage', field: 'dosage', align: 'left' },
        { name: 'dosage_form', label: 'Dosage Form', field: 'dosage_form', align: 'left' },
      ],
      // Your component data here
    }
  },
  methods: {
    // Your methods here
    openUploadDialog() {
      this.upload = true
    },
    async getCatalogItems() {
      try {
        const response = await fetch('/api/catalog-items')
        this.items = await response.json()
      } catch (error) {
        console.error('Error fetching catalog items:', error)
      }
    },

    async saveNewCatalog(){
      try{
        const response = await fetch('/api/catalog-items')
        this.upload_items = await response.json()
      }
      catch (error) {
        console.error('Error saving new catalog item:', error)
      }
    }
  },
  mounted() {
    // Lifecycle hook
  },
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
