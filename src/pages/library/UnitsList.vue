<template>
  <div class="units-list">
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-green">Unit of Measurement</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="addUnit" ref="formRef">
            <q-input v-model="newUnit.description" label="Unit Name" outlined dense required />
            <q-input
              v-model="newUnit.symbol"
              label="Unit Symbol"
              outlined
              dense
              required
              class="q-mt-md"

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
                @click="unitUpdate(this.selected_id, this.newUnit)"
              />
              <q-btn v-else label="Add" color="primary" type="submit" class="q-mt-md" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-separator spaced />

      <q-card>
      
        <q-card-section>
          <q-table :rows="units" :columns="columns" row-key="id" flat bordered>
            <template #body="props">
              <q-tr :v-bind="props">
                <!-- <q-td key="id" style="font-size: 11px" align="left">
                {{ props.row.id }}
              </q-td> -->
                <q-td key="name" style="font-size: 11px" align="left">
                  {{ props.row.description }}
                </q-td>
                <q-td key="symbol" style="font-size: 11px" align="left">
                  {{ props.row.symbol }}
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="left">
                  <q-btn
                    flat
                    icon="delete"
                    color="negative"
                    @click="open_deleteDialog(props.row.id)"
                  />
                  <q-btn flat icon="edit" color="amber" @click="getUnit(props.row.id)" />
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
              <pre>Are you sure you want to delete this unit?</pre>
            </div>
            <div class="flex justify-end">
              <q-btn flat label="No" color="grey" class="q-mt-md q-mr-md" @click="dialog = false" />
              <q-btn
                flat
                label="Yes"
                color="primary"
                class="q-mt-md"
                @click="this.deleteUnit(this.selected_id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import { useUnitStore } from 'src/stores/libUnitStore'
export default {
  name: 'UnitsList',
  setup() {
    const unitStore = useUnitStore()
    return {
      unitStore,

      columns: [
        { name: 'description', label: 'Unit Name', align: 'left', field: 'description' },
        { name: 'symbol', label: 'Symbol', align: 'left', field: 'symbol' },
        { name: 'actions', label: 'Actions', align: 'center' },
      ],
    }
  },
  data() {
    return {
      selected_id: null,
      dialog: false,
      toUpdate: false,
      newUnit: {
        description: '',
        symbol: '',
      },
      units: [],
    }
  },
  methods: {
    clear(){
      this.newUnit.description = ''
      this.newUnit.symbol = ''
      this.toUpdate = false
    },

    async getUnits() {
      await this.unitStore.getUnits()
      this.units = this.unitStore.units

    },

    async getUnit(id) {
      try {
        // console.log('Fetching unit with ID:', id)
        this.selected_id = id
        await this.unitStore.getUnit(id)
        this.newUnit = this.unitStore.unit
        this.toUpdate = true
      } catch (error) {
        console.error('Error fetching unit:', error)
        this.$q.notify({ type: 'negative', message: 'Error fetching unit.' })
      }
    },

    async unitUpdate(id, payload) {
      try {
        await this.unitStore.updateUnit(id, payload)
        this.getUnits()
        this.toUpdate = false
      } catch (error) {
        console.error('Error updating unit:', error)
        this.$q.notify({ type: 'negative', message: 'Error updating unit.' })
      }
    },
    async addUnit() {
      const valid = this.$refs.formRef.validate()
      if (!valid) {
        this.$q.notify({ type: 'negative', message: 'Please complete all required fields.' })
        return
      }

      const newUnit = {
        description: this.newUnit.description,
        symbol: this.newUnit.symbol,
      }

      await this.unitStore.newUnit(newUnit)
      this.getUnits()
      this.newUnit.description = ''
      this.newUnit.symbol = ''
    },

    open_deleteDialog(id) {
      this.dialog = true
      this.selected_id = id
    },

    async deleteUnit(id) {
      try {
        await this.unitStore.removeUnit(id)
        this.getUnits()
        this.newUnit.description = ''
        this.newUnit.symbol = ''
        this.dialog = false
      } catch (error) {
        console.error('Error deleting unit:', error)
      }
    },
  },
  mounted() {
    this.getUnits()
  },
}
</script>

<style scoped>
.units-list {
  max-width: 800px;
  margin: auto;
}
</style>
