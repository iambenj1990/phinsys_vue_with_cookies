<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div v-if="loading" class="flex flex-center justify-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
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
              class="q-mr-md"

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
                  <q-td key="actions" align="left">
                    <q-btn
                      flat
                      color="primary"
                      icon="edit"
                      class="q-mr-sm"
                      @click="
                        () => {
                          ShowUpdate = true
                          editItem(props.row.po_no)
                        }
                      "
                    />
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
          <div class="text-h6 q-pa-md text-green"><q-icon name="edit" size="md" /> Update Temporary P.O. #</div>

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
          <q-btn flat color="green" label="Close" @click="ShowUpdate = false
          " />
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
          align: 'left',
        },
      ],
    }
  },
  data() {
    return {
      ShowUpdate: false,
      color: '',
      rows: [],
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
  },

  mounted() {
    this.fetchAlltempPO()
  },
  watch() {},
}
</script>
