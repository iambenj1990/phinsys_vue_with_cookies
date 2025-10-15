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
          :columns="columns"
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
export default {
  name: 'AuditTrail',
  data() {
    return {
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'action', label: 'Action', field: 'action', align: 'left' },
        { name: 'user', label: 'User', field: 'user', align: 'left' },
        { name: 'date', label: 'Date', field: 'date', align: 'left' }
      ],
      rows: [
        // Example data
        { id: 1, action: 'Login', user: 'John Doe', date: '2024-06-01' },
        { id: 2, action: 'Update Profile', user: 'Jane Smith', date: '2024-06-02' }
      ],
      pagination: {
        rowsPerPage: 5
      }
    }
  }
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
