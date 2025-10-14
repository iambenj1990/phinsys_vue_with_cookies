<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div v-if="loading" class="flex flex-center justify-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
          <span class="q-ml-sm">Loading...</span>
        </div>
        <div v-else class="row q-gutter-md">
          <div class="col-12 col-md-12 q-pa-sm">
            <div class="text-h6 q-pa-md text-green">
              <q-icon name="assignment" size="md" /> Temporary P.O. List
            </div>
            <q-table
              :rows="rows"
              :columns="cols"
              row-key="id"
              :filter="filter"
              flat
              bordered
              class="q-mr-md my-sticky-header-table"
              :rows-per-page-options="[0]"
              table-header-class="text-white"
            >
              <template v-slot:top-left>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  class="full-width"
                  style="width: 300px"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template #body="props">
                <q-tr :v-bind="props">
                  <q-td key="po_no" align="left">
                    {{ props.row.po_no }}
                  </q-td>
                  <q-td key="created_at" align="left">
                    {{ props.row.created_at.slice(0, 10) }}
                  </q-td>
                  <q-td key="actions" align="center">
                    <q-btn
                      flat
                      color="green"
                      icon="edit"
                      @click="
                        () => {
                          editItem(props.row.po_no)
                          ShowUpdate = true
                        }
                      "
                    >
                      <q-tooltip>Edit P.O.</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      color="green"
                      icon="visibility"
                      @click="
                        () => {
                          getItemsByTempPO(props.row.po_no)
                          show_list = true
                        }
                      "
                    >
                      <q-tooltip>View</q-tooltip>
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="ShowUpdate" persistent>
      <q-card>
        <q-card-section class="text-h6">
          <div class="text-h6 q-pa-md text-green">
            <q-icon name="edit" size="md" /> Update Temporary P.O. #
          </div>

          <div>
            <q-input
              v-model="selected_tempPO"
              label="Selected P.O. #"
              outlined
              readonly
              class="q-mb-md"
            />
            <q-input v-model="po_no" label="Assign P.O. #" outlined required class="q-mb-md" />
            <q-btn
              color="green"
              label="Update P.O. #"
              class="full-width q-mb-md"
              @click="UpdateTempPO(this.selected_tempPO, this.po_no)"
            />
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="green" label="Close" @click="ShowUpdate = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="show_list" persistent>
      <q-card style="width: 400px">
        <q-card-section class="text-h6">
          <div class="text-h6 q-pa-md text-green">Item Details</div>
          <q-table
            :rows="med_rows"
            :columns="med_cols"
            row-key="id"
            flat
            dense
            class="q-mr-md"
            :style="{ height: '400px', width: '100%' }"
          >
            <template #body="props">
              <q-tr :v-bind="props" class="text-subtitle1">
                <q-td key="generic_name" align="left">
                  {{ props.row.generic_name }}
                </q-td>
                <q-td key="brand_name" align="left">
                  {{ props.row.brand_name }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="green" label="Close" @click="show_list = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
import { Notify } from 'quasar'
import ExcelJS from 'exceljs/dist/exceljs.min.js'
export default {
  computed: {
    itemStore() {
      return useItemStore()
    },
    transactionStore() {
      return useTransactionStore()
    },
  },
  setup() {
    return {
      med_cols: [
        {
          name: 'generic_name',
          required: true,
          label: 'Generic Name',
          align: 'left',
          field: 'generic_name',
        },
        {
          name: 'brand_name',
          required: true,
          label: 'Brand Name',
          align: 'left',
          field: 'brand_name',
        },
      ],
      cols: [
        {
          name: 'po_no',
          required: true,
          label: 'P.O. #',
          align: 'left',
          field: 'po_no',
        },

        {
          name: 'created_at',
          required: true,
          label: 'Date Created',
          align: 'left',
          field: (val) => val.created_at,
          sortable: true,
        },

        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
        },
      ],
    }
  },
  data() {
    return {
      show_list: false,
      ShowUpdate: false,
      color: '',
      rows: [],
      med_rows: [],
      filter: '',
      loading: false,
      selected_tempPO: null,
      po_no: '',
    }
  },

  methods: {
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Expired Medicines')

      // Define columns
      worksheet.columns = this.cols.map((col) => ({
        header: col.label,
        key: col.field,
        width: 20,
      }))

      // Add rows
      this.rows.forEach((row) => {
        const rowWithDays = {
          ...row,
          daysTillExpire: this.calculateDaysUntilExpiration(row.expiration_date),
        }
        worksheet.addRow(rowWithDays)
      })

      // Save the file
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Expired_Medicines_${new Date().toISOString()}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    },

    calculateDaysUntilExpiration(expirationDate) {
      if (!expirationDate) return '' // Handle null values

      const today = new Date()
      const expiry = new Date(expirationDate)

      // Calculate the time difference in milliseconds
      const differenceInTime = expiry.getTime() - today.getTime()

      // Calculate the time difference in days
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

      return differenceInDays
    },

    editItem(id) {
      this.po_no = ''
      this.selected_tempPO = id
      console.log(this.selected_tempPO)
    },
    async fetchAlltempPO() {
      try {
        this.loading = true
        await this.itemStore.getTempPO()
        this.rows = this.itemStore.po_temp
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response.data.message || 'An error occurred.',
          position: 'center',
          timeout: 5000,
        })
      } finally {
        this.loading = false
      }
    },

    async UpdateTempPO(temp, po_no) {
      try {
        if (!po_no) {
          Notify.create({
            type: 'negative',
            message: 'Please enter a new P.O. number.',
            position: 'center',
            timeout: 5000,
          })
          return
        }

        this.loading = true
        await this.itemStore.UpdateTempPO(temp, po_no)
        this.ShowUpdate = false
        this.fetchAlltempPO()
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response.data.message || 'An error occurred while updating.',
          position: 'center',
          timeout: 5000,
        })
      } finally {
        this.loading = false
      }
    },

    async getItemsByTempPO(po_no) {
      this.med_rows = []
      try {
        await this.itemStore.getItemsByPO(po_no)
        this.med_rows = this.itemStore.po_items
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response.data.message || 'An error occurred while fetching items.',
          position: 'center',
          timeout: 5000,
        })
      }
    },
  },

  mounted() {
    this.fetchAlltempPO()
  },
  watch() {},
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 610px


  thead tr th
    /* bg color is important for th; just specify one */
    background-color: #008000

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 100px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 50px
</style>
