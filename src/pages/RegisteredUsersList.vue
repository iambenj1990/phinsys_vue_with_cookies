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
        <q-table :rows="rows" :columns="columns" row-key="id" flat bordered>
          <template #body="props">
            <q-tr :v-bind="props">
              <!-- <q-td key="id" style="font-size: 11px" align="left">
                {{ props.row.id }}
              </q-td> -->
              <q-td key="name" style="font-size: 11px" align="left">
                {{
                  props.row.last_name + ', ' + props.row.first_name + ' ' + props.row.middle_name
                }}
              </q-td>
              <q-td key="username" style="font-size: 11px" align="left">
                {{ props.row.username }}
              </q-td>
              <q-td key="position" style="font-size: 11px" align="left">
                {{ props.row.position }}
              </q-td>
              <q-td key="office" style="font-size: 11px" align="left">
                {{ props.row.office }}
              </q-td>
              <q-td key="status" style="font-size: 11px" align="left">
                <q-chip
                  class="q-mr-sm"
                  color="green"
                  text-color="white"
                  size="sm">
                       {{ props.row.office }}
                </q-chip>

              </q-td>
              <q-td key="actions" style="font-size: 11px" align="left">
                <q-btn
                  dense
                  flat
                  icon="person_off"
                  class="q-mr-sm"
                  color="amber"
                  @click="$router.push('/users/view/' + props.row.id)"
                >
                  <q-tooltip> Deactivate </q-tooltip>
                </q-btn>

                <q-btn
                  dense
                  flat
                  icon="edit"
                  class="q-mr-sm"
                  color="primary"
                  @click="getUser(props.row.id)"
                  to="/users/user/"
                 >
                  <q-tooltip> Edit </q-tooltip>
                </q-btn>


              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useUserStore } from 'src/stores/userStore'
export default {
  name: 'RegisteredUsersList',
  setup() {
    const userStore = useUserStore()
    // You can use the Composition API here if needed
    return {
      userStore,
      // Define any reactive properties or methods
      columns: [
        // { name: 'id', label: 'ID', align: 'left', field: 'id' },
        { name: 'name', label: 'Full Name', align: 'left', field: 'name' },
        { name: 'username', label: 'Username', align: 'left', field: 'username' },
        { name: 'position', label: 'Position', align: 'left', field: 'position' },
        { name: 'office', label: 'Office', align: 'left', field: 'office' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'actions', label: 'Actions', align: 'left' },

        // { name: 'created_at', label: 'Created At', align: 'left', field: (row) => row.created_at.split('T')[0] }
      ],
    }
  },
  mounted() {
    // Fetch data or perform any setup when the component is mounted
    this.getUsers()
  },
  methods: {
    // Define any methods you need for your component
    getUser(id) {
      this.userStore.selected_id = id
      console.log(id)
      console.log( this.userStore.selected_id)
    },
    async getUsers() {
      try {
        await this.userStore.getUsers()
        this.rows = this.userStore.users
      } catch (error) {
        console.error('Error fetching users:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Unable to fetch users list',
          position: 'center',
          timeout: 1000,
        })
      }
    },
  },
  data() {
    return {
      search: '',
      rows: [],
    }
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
