<template>
  <q-page class="q-pa-xl">
    <q-form ref="configForm" @submit="onSubmit">
      <q-card class="q-pa-lg shadow-2 rounded-borders">
        <q-card-section>
          <div class="text-h6 q-mb-md text-green">Inventory Configurations</div>

          <q-input
            v-model.number="lowCount"
            type="number"
            label="Prompt Stock Quantity on Low"
            class="q-mb-md"
            filled
            :rules="[val => val > 0 || 'Must be greater than 0']"
          />

          <q-input
            v-model.number="daysToExpire"
            type="number"
            label="Prompt Days to Expire"
            class="q-mb-md"
            filled
            :rules="[val => val > 0 || 'Must be greater than 0']"
          />

          <q-separator class="q-mt-lg" />

          <div class="text-subtitle2 text-green q-my-lg">Color Configuration:</div>

          <!-- Normal Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: normalColor || '#f0f0f0' }">
            <q-input
              filled
              label="Normal State"
              v-model="normalColor"
              class="my-input"
              :rules="[val => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="normalColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Low Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: lowColor || '#f0f0f0' }">
            <q-input
              filled
              label="Low State"
              v-model="lowColor"
              class="my-input"
              :rules="[val => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="lowColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Empty Color -->
          <div class="q-mb-lg" :style="{ backgroundColor: emptyColor || '#f0f0f0' }">
            <q-input
              filled
              label="No Stock State"
              v-model="emptyColor"
              class="my-input"
              :rules="[val => !!val || 'Color required']"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="emptyColor" />
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
export default {
  name: 'LowCountColorPage',
  data () {
    return {
      lowCount: 10,
      daysToExpire: 30,
      normalColor: '',
      lowColor: '',
      emptyColor: ''
    }
  },
  methods: {
    async onSubmit () {
      const isValid = await this.$refs.configForm.validate()

      if (!isValid) return

      // Simulate save
      console.log('Saved settings:', {
        lowCount: this.lowCount,
        daysToExpire: this.daysToExpire,
        normalColor: this.normalColor,
        lowColor: this.lowColor,
        emptyColor: this.emptyColor
      })

      this.$q.notify({
        type: 'positive',
        message: 'Settings saved successfully!'
      })
    }
  }
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
