<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <!-- LEFT PANEL -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="rounded-borders">
          <q-card-section>
            <div class="text-h6 text-green text-weight-bold">User Medicine Assignment</div>
            <div class="text-caption text-grey">
              Assign medicines that a selected user can exclusively release.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <!-- USER DROPDOWN -->
            <q-select
              v-model="selectedUser"
              :options="userlist"
              :option-label="
                (opt) => [opt.first_name, opt.middle_name, opt.last_name].filter(Boolean).join(' ')
              "
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              label="Select User"
              class="q-mb-md text-capitalize"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-select>
            <pre>{{ selectedUser }}</pre>

            <!-- SEARCH -->
            <q-input
              v-model="searchMedicine"
              outlined
              dense
              debounce="300"
              label="Search Medicine"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <!-- MEDICINE LIST -->
            <q-list bordered separator class="rounded-borders medicine-list">
              <q-item v-for="medicine in filteredMedicines" :key="medicine.id" clickable v-ripple>
                <q-item-section>
                  <q-item-label class="text-weight-medium">
                    {{ medicine.generic_name }}
                  </q-item-label>

                  <q-item-label caption>
                    Stock: {{ medicine.Closing_quantity }} | PO# {{ medicine.po_no }}</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <q-btn color="primary" icon="add" round dense @click="assignMedicine(medicine)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- RIGHT PANEL -->
      <div class="col-12 col-md-7">
        <q-card flat bordered class="rounded-borders">
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-h6 text-green text-weight-bold">Assigned Medicines</div>

              <div class="text-caption text-grey">
                Medicines exclusively assigned to selected user
              </div>
            </div>

            <q-badge color="primary" rounded class="text-subtitle2">
              {{ assignedMedicines.length }}
            </q-badge>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-table
              flat
              bordered
              :rows="assignedMedicines"
              :columns="columns"
              row-key="id"
              :pagination="{ rowsPerPage: 8 }"
            >
              <!-- MEDICINE COLUMN -->
              <template v-slot:body-cell-name="props">
                <q-td :props="props">
                  <div class="text-weight-medium">
                    {{ props.row.name }}
                  </div>
                </q-td>
              </template>

              <!-- ACTION COLUMN -->
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    color="negative"
                    icon="delete"
                    dense
                    flat
                    round
                    @click="removeMedicine(props.row.item_id)"
                  />
                </q-td>
              </template>

              <!-- EMPTY STATE -->
              <template v-slot:no-data>
                <div class="full-width row flex-center text-grey q-gutter-sm q-pa-lg">
                  <q-icon size="2em" name="medication" />
                  <span>No medicines assigned yet.</span>
                </div>
              </template>
            </q-table>
          </q-card-section>

          <q-separator />

          <!-- ACTION BUTTONS -->
          <q-card-actions align="right">
            <q-btn flat label="Clear" color="grey-7" @click="assignedMedicines = []" />

            <q-btn color="primary" icon="save" label="Save Assignment" @click="saveAssignment" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useUserStore } from 'src/stores/userStore'

export default {
  name: 'MedicineUserAssignment',

  setup() {
    const itemStore = useItemStore()
    const userStore = useUserStore()

    return {
      itemStore,
      userStore,
      columns: [
        {
          name: 'po_no',
          label: 'PO #',
          align: 'center',
          field: 'po_no',
        },
        {
          name: 'generic_name',
          label: 'Medicine Name',
          align: 'left',
          field: 'generic_name',
        },
        {
          name: 'action',
          label: 'Action',
          align: 'center',
        },
      ],
    }
  },

  data() {
    return {
      selectedUser: null,
      searchMedicine: '',
      users: [],
      medicines: [],
      assignedMedicines: [],
    }
  },

  computed: {
    filteredMedicines() {
      return this.medicines.filter((medicine) => {
        return medicine.generic_name.toLowerCase().includes(this.searchMedicine.toLowerCase())
      })
    },

    userlist() {
      return this.userStore.users
    },
  },
  mounted() {
    this.getAvailableMedList()
    this.getUSers()

    console.log('users => ', this.userlist)
  },

  methods: {
    async getUSers() {
      await this.userStore.getUsers()
    },

    async getAvailableMedList() {
      //this.cartPrompt = true
      //filtered mag una ug gawas ang sayo ma expire
      //await this.itemStore.getJoinedTable_DailyInventor_Items_filtered()

      //not filtered, laras gawas tanan pilianan
      await this.itemStore.getJoinedTable_DailyInventor_Items()

      this.medicines = this.itemStore.items
      console.log('medicines => ', this.medicines)
      //   this.availableMedsRow = this.itemStore.items
    },

    assignMedicine(medicine) {
      const exists = this.assignedMedicines.find((item) => item.item_id === medicine.item_id)
      console.log(' this.assignedMedicines => ', this.assignedMedicines)
      if (exists) {
        this.$q.notify({
          type: 'warning',
          message: 'Medicine already assigned.',
        })

        return
      }

      this.assignedMedicines.push(medicine)

      this.$q.notify({
        type: 'positive',
        message: 'Medicine assigned successfully.',
        timeout: 1500,
      })
    },

    async showAssignedMedicines(id){

      try{
        await this.userStore.ShowAssignItemsToUser(id)
        this.assignedMedicines = this.userStore.assignedItems
      }catch(error){
        console.error('Error fetching assigned medicines:', error)
        this.$q.notify({
          type: 'negative',
          message: 'An error occurred while fetching assigned medicines.',
          timeout: 1500,
        })
      }

    },

    removeMedicine(id) {
      this.assignedMedicines = this.assignedMedicines.filter((item) => item.item_id !== id)
    },

    saveAssignment() {
      if (!this.selectedUser) {
        this.$q.notify({
          type: 'negative',
          message: 'Please select a user.',
          timeout: 1500,
        })

        return
      }
      try {
        this.assignedMedicines.forEach((medicine) => {
          console.log(`Attempting to Assign ${medicine.item_id} to user ID ${this.selectedUser}`)
          this.userStore.assignItemsToUser(this.selectedUser, medicine.item_id)
        })

        this.$q.notify({
          type: 'positive',
          message: 'Assignments saved successfully.',
          timeout: 1500,
        })
      } catch (error) {
        console.error('Error during assignment:', error)
        this.$q.notify({
          type: 'negative',
          message: 'An error occurred while saving assignments.',
          timeout: 1500,
        })
      } finally{
      this.assignedMedicines = []
      }

   

    },
  },
}
</script>

<style scoped>
.medicine-list {
  max-height: 500px;
  overflow-y: auto;
}

.rounded-borders {
  border-radius: 14px;
}
</style>
