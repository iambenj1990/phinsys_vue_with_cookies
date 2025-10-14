<template>
  <q-page class="q-pa-xl">
    <q-form ref="configForm" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-2 rounded-borders">
        <q-card-section>
          <div class="text-h6 q-mb-md text-green">Inventory Configurations</div>

          <q-input
            v-model.number="settings.low_count"
            type="number"
            label="Prompt Stock Quantity on Low"
            class="q-mb-md"
            filled
            :rules="[(val) => val > 0 || 'Must be greater than 0']"
          />

          <q-input
            v-model.number="settings.days_toExpire"
            type="number"
            label="Prompt Days to Expire"
            class="q-mb-md"
            filled
            :rules="[(val) => val > 0 || 'Must be greater than 0']"
          />

          <q-separator class="q-mt-lg" />

          <div class="text-subtitle2 text-green q-my-lg">Color Configuration:</div>

          <!-- Normal Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: settings.normal_color || '#f0f0f0' }">
            <q-input
              filled
              label="Normal State"
              v-model="settings.normal_color"
              class="my-input"
              :rules="[(val) => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="settings.normal_color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Low Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: settings.low_color || '#f0f0f0' }">
            <q-input
              filled
              label="Low State"
              v-model="settings.low_color"
              class="my-input"
              :rules="[(val) => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="settings.low_color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Empty Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: settings.empty_color || '#f0f0f0' }">
            <q-input
              filled
              label="No Stock State"
              v-model="settings.empty_color"
              class="my-input"
              :rules="[(val) => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="settings.empty_color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Buttons -->
          <div class="q-mt-lg" align="right">
            <q-btn label="Save Settings" color="primary" type="submit" />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useConfigurationsStore } from 'src/stores/configurations'
export default {
  name: 'LowCountColorPage',

  setup() {
    const configStore = useConfigurationsStore()
    return {
      configStore,
    }
  },
  data() {
    return {
      settings: {
        normal_color: '',
        low_color: '',
        empty_color: '',
        low_count: 0,
        days_toExpire: 0,
      },
      selected_ID: 1,
      show_update: true,
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    async updateConfig(payload) {
      try {
        await this.configStore.updateConfiguration(payload)
        this.settings = this.configStore.configuration
      } catch (error) {
        // console.log(error)
           this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 1200,
        })
      }
    },
    async newConfiguration(payload) {
      try {
        await this.configStore.newConfig(payload)
        this.settings = this.configStore.configuration
      } catch (error) {
        // console.log(error)
           this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 1200,
        })
      }
    },
    async getConfig() {
      try {
        await this.configStore.getConfiguration()
        this.settings = this.configStore.configuration
      } catch (error) {
        // console.log(error)
           this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 1200,
        })
      }
    },
    async onSubmit() {
      const isValid = await this.$refs.configForm.validate()

      if (!isValid) return

      try {
        if (this.settings == null) {
          await this.newConfiguration(this.settings)
        } else {
          await this.updateConfig(this.settings)
        }
        this.settings = this.configStore.configuration
      } catch (error) {
        // console.log(error)
           this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 1200,
        })
      }
    },
  },
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}
.my-input {
  border-radius: 8px;
}
</style>
