<template>
  <div class="dosage-list">
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-green" >Dosage Type Library</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="addDosageType" ref="formRef">

            <q-input
              v-model="newdosage.type"
              label="Dosage Type"
              outlined
              dense
              required
              class="q-mt-md text-uppercase"

            />
            <div class="flex justify-end">
               <q-btn
                label="Cancel"
                color="red"
                class="q-mt-md q-mr-md"

                @click="clear()"
              />
              <q-btn
                label="Update"
                color="primary"
                class="q-mt-md q-mr-md"
                v-if="toUpdate"
                @click="updateDosageType(this.selected_id, this.newdosage)"
              />
              <q-btn v-else label="Add" color="primary" type="submit" class="q-mt-md" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-separator spaced />

      <q-card>

        <q-card-section>
          <q-table :rows="rows" :columns="columns" row-key="id" flat bordered>
            <template #body="props">
              <q-tr :v-bind="props">
                <!-- <q-td key="id" style="font-size: 11px" align="left">
                {{ props.row.id }}
              </q-td> -->
                <q-td key="type" style="font-size: 11px" align="left" class="text-uppercase">
                  {{ props.row.type }}
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    icon="delete"
                    color="negative"
                    @click="open_deleteDialog(props.row.id)"
                  >
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
                  <q-btn flat icon="edit" color="amber" @click="getDosageType(props.row.id)" >
                  <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <q-dialog
        v-model="dialog"
        persistent
        :style="{ width: '90%', height: '90%' }"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <q-card-section>
            <div>
              <pre>Are you sure you want to delete this dosage type?</pre>
            </div>
            <div class="flex justify-end">
              <q-btn flat label="No" color="grey" class="q-mt-md q-mr-md" @click="dialog = false" />
              <q-btn
                flat
                label="Yes"
                color="primary"
                class="q-mt-md"
                @click="this.deleteDosageType(this.selected_id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import { useDosageStore } from 'src/stores/libDosageTypeStore'
export default {
  name: 'DosageList',
  setup() {
    const dosageStore = useDosageStore()
    return {
      dosageStore,

      columns: [
        { name: 'type', label: 'Dosage Type', align: 'left', field: 'type' },
        { name: 'actions', label: 'Actions', align: 'center' },
      ],
    }
  },
  data() {
    return {
      selected_id: null,
      dialog: false,
      toUpdate: false,
      newdosage: {
        type: '',
      },
      rows: [],
    }
  },
  methods: {
    clear(){
      this.newdosage.type = ''
      this.toUpdate = false
    },

    async getDosageTypes() {
      try {
        await this.dosageStore.getDosagesTypes()
        this.rows = this.dosageStore.dosageTypes
      } catch (error) {
        console.error('Error fetching dosage types:', error)
        this.$q.notify({ type: 'negative', message: 'Error fetching dosage types.' })
      }
    },

    async getDosageType(id) {
      try {
        this.selected_id = id
        await this.dosageStore.getDosageType(id)
       this.newdosage.type = this.dosageStore.dosageInfo
        this.toUpdate = true
      } catch (error) {
        console.error('Error fetching dosage type:', error)
        this.$q.notify({ type: 'negative', message: 'Error fetching dosage type.' })
      }
    },

    async updateDosageType(id, payload) {
      try {
        await this.dosageStore.updateDosageType(id, payload)
        this.getDosageTypes()
        this.clear()
      } catch (error) {
        console.error('Error updating dosage type:', error)
        this.$q.notify({ type: 'negative', message: 'Error updating dosage type.' })
      }
    },
    async addDosageType() {
      const valid = this.$refs.formRef.validate()
      if (!valid) {
        this.$q.notify({ type: 'negative', message: 'Please complete all required fields.' })
        return
      }

      const new_dosage = {
        type: this.newdosage.type,
      }

      console.log('New dosage type:', new_dosage)

      await this.dosageStore.newDosageType(new_dosage)
      this.getDosageTypes()
      this.newdosage.type = ''

    },

    open_deleteDialog(id) {
      this.dialog = true
      this.selected_id = id
    },

    async deleteDosageType(id) {
      try {
        await this.dosageStore.removeDosageType(id)
        this.getDosageTypes()
        this.newdosage.type = ''

        this.dialog = false
      } catch (error) {
        console.error('Error deleting dosage type:', error)
      }
    },
  },
  mounted() {
    this.getDosageTypes()
  },
}
</script>

<style scoped>
.dosage-list {
  max-width: 800px;
  margin: auto;
}
</style>
