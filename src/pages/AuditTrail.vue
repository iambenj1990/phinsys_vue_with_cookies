<template>
  <q-page class="q-pa-md">
    <q-card class="q-mx-auto" style="max-width: 100vw;">
      <q-card-section>
        <div class="text-h5 text-center">Audit Trail</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-table
          :rows="rows"
          :columns="cols"
          row-key="id"
          flat
          dense
          :pagination="pagination"
          class="responsive-table"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
 import { Notify } from 'quasar';
import { useAuditStore } from 'src/stores/AuditTrail';
export default {
  name: 'AuditTrail',

  setup(){
    const auditStore = useAuditStore();
    const cols =[
        { name: 'user', label: 'User', field: 'user', align: 'left'  },
        { name: 'action', label: 'Action', field: 'action', align: 'center' },
         { name: 'changes', label: 'changes', field: 'changes', align: 'center' },
        { name: 'date', label: 'Date', field: 'date', align: 'center' }
    ]
    return{
      cols,
      auditStore
    }
  },
  
  data() {
    return {
      rows:[],
      pagination: {
        rowsPerPage: 5
      }
    }
  },
  mounted() {
    this.fetchAuditLogs();
  },

  methods: {
    async fetchAuditLogs() {
      try {
        await this.auditStore.AllLogs();
        console.log(this.auditStore.logs);
        this.rows = this.auditStore.logs;
      } catch (error) {
       Notify.create({
          type: 'negative',
          message: 'Failed to fetch audit logs.' + error.message
        });
      }
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
