<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Registered Users List</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="search"
          label="Search"
          class="q-mb-md"
          debounce="300"
          :clearable="true"


        />
        <div class="text-right">
          <q-btn
            dense
            flat
            icon="add_moderator"
            label="Add User"
            color="green"
            class="q-mb-md text-caption"
            @click="$router.push('/users/new')"
          />
        </div>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          flat
          bordered
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'RegisteredUsersList',
  setup() {
    // You can use the Composition API here if needed
    return {
      // Define any reactive properties or methods
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id' },
        { name: 'name', label: 'Full Name', align: 'left', field: 'first_name' },
        { name: 'username', label: 'Username', align: 'left', field: 'username' },
        { name: 'position', label: 'Position', align: 'left', field: 'position' },
        { name: 'office', label: 'Office', align: 'left', field: 'office' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'office' },

        // { name: 'created_at', label: 'Created At', align: 'left', field: (row) => row.created_at.split('T')[0] }
      ]
    };
  },
  mounted() {
    // Fetch data or perform any setup when the component is mounted

  },
  methods: {
    // Define any methods you need for your component

  },
  data() {
    return {
      search: '',
      rows: [
        // Example data

      ],

    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
