<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg" >
      <div class="q-pa-md">
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <div class="row">
            <div class=" q-ma-sm col col-md-3">
              <q-input
                filled
                label="Requested By"
                v-model="form.requestedBy"
                :error="!!errors.requestedBy"
                :error-message="errors.requestedBy"
                required
              />
            </div>
            <div class=" q-ma-sm  col col-md-3">
              <q-input
                filled
                label="Office"
                v-model="form.office"
                :error="!!errors.office"
                :error-message="errors.office"
                required
              />
            </div>
            <div class="q-ma-sm  col col-md-3">
              <q-input
                filled
                label="Purpose"
                v-model="form.purpose"
                :error="!!errors.purpose"
                :error-message="errors.purpose"
                required
              />
            </div>
          </div>
          <div class="row">
            
          </div>

          <q-input
            filled
            label="Recieved by"
            v-model="form.recievedBy"
            :error="!!errors.recievedBy"
            :error-message="errors.recievedBy"
            required
          />
          <div class="row justify-end">
            <q-btn type="submit" color="primary" label="Submit" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        requestedBy: '',
        purpose: '',
        office: '',
        recievedBy: '',
      },
      errors: {
        requestedBy: '',
        purpose: '',
        office: '',
        recievedBy: '',
      },
    }
  },
  methods: {
    validate() {
      this.errors.requestedBy = this.form.requestedBy ? '' : 'Requested By is required.'
      this.errors.purpose = this.form.purpose ? '' : 'Purpose is required.'
      this.errors.office = this.form.office ? '' : 'Office is required.'
      this.errors.recievedBy = this.form.recievedBy ? '' : 'Recieved by is required.'
      return (
        !this.errors.requestedBy &&
        !this.errors.purpose &&
        !this.errors.office &&
        !this.errors.recievedBy
      )
    },
    submitForm() {
      if (this.validate()) {
        this.$q.notify({ type: 'positive', message: 'Form submitted!' })
        // Handle form submission logic here
      }
    },
  },
}
</script>
