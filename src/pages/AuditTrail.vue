<template>
  <q-page class="q-pa-md">
    <q-card class="q-mx-auto" style="max-width: 100vw">
      <q-card-section>
        <div class="text-h5 text-center">Audit Trail</div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <q-table
          :filter="filter"
          :loading="loading"
          loading-label='loading Data, Please wait a moment'
          :rows="rows"
          :columns="cols"
          row-key="id"
          flat
          dense
          :pagination="pagination"
          class="responsive-table"
        >
        <template v-slot:top-left>
            <q-input filled v-model="filter" label="Search " class="text-h11" debounce="200">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
          <template #body="props">
            <q-tr :v-bind="props">
              <q-td key="username" style="font-size: 11px" align="left" class="text-uppercase">
                {{ props.row.username }}
              </q-td>
              <q-td key="action" style="font-size: 11px" align="left" class="text-uppercase">
                {{ props.row.action }}
              </q-td>
              <q-td key="changes" style="font-size: 11px" align="left" class="text-uppercase">
                {{ props.row.changes }}
              </q-td>
              <q-td key="created_at" style="font-size: 11px" align="left" class="text-uppercase">
                {{ formatDate(props.row.created_at) }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import { useAuditStore } from 'src/stores/AuditTrail'
export default {
  name: 'AuditTrail',

  setup() {
    const auditStore = useAuditStore()
    const cols = [
      { name: 'user', label: 'User', field: 'username', align: 'left' },
      { name: 'action', label: 'Action', field: 'action', align: 'center' },
      { name: 'changes', label: 'changes', field: 'changes', align: 'center' },
      { name: 'date', label: 'Date', field: 'created_at', align: 'center' },
    ]
    return {
      cols,
      auditStore,
    }
  },

  data() {
    return {
      filter:'',
      loading: false,
      rows: [],
      pagination: {
        rowsPerPage: 20,
      },
    }
  },
  mounted() {
    this.fetchAuditLogs()
  },

  methods: {
    async fetchAuditLogs() {
      try {
        this.loading = true
        await this.auditStore.AllLogs()
        console.log(this.auditStore.logs)
        this.rows = this.auditStore.logs
        this.loading = false
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Failed to fetch audit logs.' + error.message,
        })
        this.loading = false
      }
    },

     formatDate(value) {
      if (!value) return ''

      const date = new Date(value)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      let hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      hours = String(hours).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}${ampm}`
    }
  },
}
</script>

<style>
.responsive-table {
  overflow-x: auto;
}
@media (max-width: 600px) {
  .q-card {
    max-width: 100% !important;
  }
  .text-h5 {
    font-size: 1.2rem;
  }
}
</style>
