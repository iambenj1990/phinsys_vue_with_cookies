<template>
  <q-page class="q-pa-sm q-ma-sm">
    <q-card class="q-pa-sm" style="width: 100%; display: inline-block">
      <div class="row q-gutter-md q-pb-sm">
        <div class="col-12">
          <div class="text-subtitle2 text-primary">Customer Information</div>
        </div>
      </div>
      <q-separator />
      <q-form @submit.prevent="submitCustomerForm" ref="customerForm">
        <div class="row q-gutter-md q-pt-lg text-uppercase">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.lastname"
              label="Lastname"
              class="full-width text-caption"
              lazy-rules
              :rules="[(val) => !!val || 'Surname is required']"
              @input="(val) => CustomerInfo.lastname = val ? val.toUpperCase() : ''"

            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.firstname"
              label="Firstname"
              class="full-width text-caption"
              lazy-rules
              :rules="[(val) => !!val || 'Firstname is required']"
              @input="(val) => CustomerInfo.firstname = val ? val.toUpperCase() : ''"
            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.middlename"
              label="Middlename"
              class="full-width text-caption"
              @input="(val) => CustomerInfo.middlename = val ? val.toUpperCase() : ''"
            />
          </div>
          <div class="col-12 col-md-1 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.ext"
              label="Ext."
              class="full-width text-caption"
              @input="(val) => CustomerInfo.ext = val ? val.toUpperCase() : ''"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-pa-sm">
          <div class="col-12 col-md-2 q-pa-sm">
            <q-select
              dense
              v-model="CustomerInfo.gender"
              :options="GenSelection"
              label="Gender"
              class="full-width text-caption text-uppercase"
              lazy-rules
              :rules="[(val) => !!val || 'Gender is required']"
            />
          </div>
          <div class="col-12 col-md-2 q-pa-sm text-caption">
            <q-input
              type="date"
              dense
              v-model="CustomerInfo.birthdate"
              label="Birthdate"
              class="full-width text-caption"
              @change="calculateAge(CustomerInfo.birthdate)"
              lazy-rules
              :rules="[(val) => !!val || 'Birthdate is required']"
            />
          </div>
          <div class="col-12 col-md-1 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.age"
              label="Age"
              class="full-width text-caption"
              readonly
            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.contact_number"
              label="Contact Number"
              class="full-width text-caption"
              inputmode="numeric"
            />
            <!-- lazy-rules
              :rules="[(val) => !!val || 'contact number is required']"
               -->
          </div>
        </div>

        <div class="row q-gutter-md">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-checkbox
              v-model="isChecked"
              label="Not From This City"
              @change="toggledCheckbox"
              class="text-caption text-uppercase"
              :style="{ fontSize: '11px' }"
              @update:model-value="clearLocation"
            />
          </div>
        </div>

        <div class="row q-gutter-md" v-if="!isChecked">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-select
              dense
              v-model="CustomerInfo.barangay"
              :options="TagumBarangay.barangay"
              label="Barangay"
              class="full-width text-caption text-uppercase"
              lazy-rules
              :rules="[(val) => !!val || 'Barangay is required']"
            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.purok"
              label="Purok"
              class="full-width text-caption text-uppercase"
            />
            <!-- lazy-rules
              :rules="[(val) => !!val || 'Purok is required']" -->
          </div>
          <div class="col-12 col-md-4 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.street"
              label="Street"
              class="full-width text-caption text-uppercase"
            />
            <!-- lazy-rules
              :rules="[(val) => !!val || 'street is required']" -->
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.city"
              label="City"
              class="full-width text-caption text-uppercase"
            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.province"
              label="Province"
              class="full-width text-caption text-uppercase"
            />
          </div>
        </div>

        <div class="row q-gutter-md" v-else-if="isChecked">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.barangay"
              label="Barangay"
              class="full-width text-caption"
              lazy-rules
              :rules="[(val) => !!val || 'barangay is required']"
            />
          </div>
          <div class="col-12 col-md-2 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.purok"
              label="Purok"
              class="full-width text-caption"
            />

            <!-- lazy-rules
              :rules="[(val) => !!val || 'purok is required']" -->
          </div>
          <div class="col-12 col-md-4 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.street"
              label="Street"
              class="full-width text-caption"
            />
            <!--
                 lazy-rules
              :rules="[(val) => !!val || 'street is required']" -->
          </div>
          <div class="col-12 col-md-2 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.city"
              label="City"
              class="full-width text-caption"
              lazy-rules
              :rules="[(val) => !!val || 'City is required']"
            />
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-input
              dense
              v-model="CustomerInfo.province"
              label="Province"
              class="full-width text-caption"
              lazy-rules
              :rules="[(val) => !!val || 'province is required']"
            />
          </div>
        </div>

        <!-- <div class="row q-gutter-md">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.contact_number" label="Contact Number" class="full-width"
            inputmode="numeric" />
        </div>
      </div> -->

        <div class="row q-gutter-md q-pt-lg">
          <div class="col-12 col-md-1 q-pa-sm">
            <q-checkbox
              v-model="children"
              :val="'Children'"
              label="Children"
              class="text-caption"
              :style="{ fontSize: '11px' }"
              disable
            />
          </div>
          <div class="col-12 col-md-1 q-pa-sm">
            <q-checkbox
              v-model="adult"
              :val="'Adult'"
              label="Adult"
              class="text-caption"
              :style="{ fontSize: '11px' }"
              disable
            />
          </div>
          <div class="col-12 col-md-1 q-pa-sm">
            <q-checkbox
              v-model="senior"
              :val="'Senior'"
              label="Senior"
              class="text-caption"
              :style="{ fontSize: '11px' }"
              disable
            />
          </div>
        </div>

        <div class="row q-gutter-sm">
          <div class="col-12 col-md-1 q-pa-sm">
            <q-checkbox
              v-model="pwd"
              :val="'PWD'"
              label="PWD"
              class="text-caption"
              :style="{ fontSize: '11px' }"
              @change="toggled_pwd"
            />
          </div>
          <div class="col-12 col-md-1 q-pa-sm">
            <q-checkbox
              v-model="solo"
              :val="'Solo'"
              label="Solo"
              class="text-caption"
              :style="{ fontSize: '11px' }"
              @change="toggled_solo"
            />
          </div>
        </div>
        <!-- <pre>{{ CustomerInfo.category }}</pre> -->
      </q-form>

      <div class="row q-gutter-md q-pt-md" style="display: flex; justify-content: space-between">
        <!-- <div class="col-12 flex justify-start q-pa-md-lg"> -->
        <q-btn
          type="submit"
          label="Cancel"
          class="q-mr-md q-ml-md text-caption"
          color="red"
          @click="clearInputs()"
        />
        <!-- </div> -->
        <!-- <div class="col-12 flex justify-end q-pa-md-lg" v-if="Customer.isSave"> -->
        <q-btn
          :loading="loading"
          type="submit"
          label="Save"
          class="q-mr-sm q-ml-md text-caption"
          color="primary"
          @click="submitCustomerForm()"
          v-if="Customer.isSave"
          style="width: 100px"
        />
        <!-- </div> -->
        <!-- <div class="col-12 flex justify-end q-pa-md-lg"  v-else-if="Customer.isEdit" > -->
        <q-btn
          :loading="loading"
          type="submit"
          label="Update"
          class="q-mr-sm q-ml-md text-caption"
          color="primary"
          @click="submitCustomerForm()"
          v-else-if="Customer.isEdit"
        />
        <!-- </div> -->
      </div>
    </q-card>

    <q-dialog v-model="showError" persistent>
      <q-card class="q-pa-sm" style="max-width: 900px; width: 100%">
        <q-card-section>
          <pre>{{ this.errorMsg[0] }}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <!-- Button to close dialog -->
          <q-btn flat label="Close" color="primary" @click="showError = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { useTagumStore } from '../stores/TagumStore'
import { useCustomerStore } from '../stores/customersStore'

import { useUserStore } from '../stores/userStore'

export default {
  setup() {
    const TagumBarangay = useTagumStore()
    const Customer = useCustomerStore()
    const userStore = useUserStore()

    return {
      userStore,
      Customer,
      TagumBarangay,
      GenSelection: ['Male', 'Female', 'LGBTQ'],

      CustomerInfoDefault: {
        firstname: '',
        lastname: '',
        middlename: '',
        ext: '',
        birthdate: '',
        contact_number: '',
        age: 0,
        gender: '',
        is_not_tagum: false,
        street: '',
        purok: '',
        barangay: '',
        city: 'Tagum City',
        province: 'Davao del Norte',
        category: '',
        is_pwd: false,
        is_solo: false,
        user_id: 0,
      },
    }
  },
  data() {
    return {
      loading: false,
      user: {},
      user_id: 0,
      showError: false,
      errorMsg: [],
      isChecked: false,
      children: false,
      adult: false,
      senior: false,
      pwd: false,
      solo: false,
      customer_id: 0,

      CustomerInfo: {
        firstname: '',
        lastname: '',
        middlename: '',
        ext: '',
        birthdate: '',
        contact_number: '',
        age: 0,
        gender: '',
        is_not_tagum: false,
        street: '',
        purok: '',
        barangay: '',
        city: 'Tagum City',
        province: 'Davao del Norte',
        category: '',
        is_pwd: false,
        is_solo: false,
        user_id: 0,
      },
    }
  },
  methods: {
    async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
    },

    async submitCustomerForm() {
      this.loading = true
      const isValid = await this.$refs.customerForm.validate()

      if (!isValid) {
        this.$q.notify({ type: 'negative', message: 'Please complete all required fields' })
        this.loading = false
        return
      }

      if (this.Customer.isSave) {
        // console.log(this.CustomerInfo)
           if(this.CustomerInfo.purok=='') this.CustomerInfo.purok='N/A'
        if (this.CustomerInfo.street=='') this.CustomerInfo.street='N/A'
        this.Insert_Customer(this.CustomerInfo)
      } else if (this.Customer.isEdit) {
        this.updateCustomer(this.Customer.customer_id, this.CustomerInfo)
      }
      this.loading = false
    },

    clearInputs() {
      this.$refs.customerForm.resetValidation()
      this.Customer.customer_id = 0
      // this.CustomerInfo =JSON.parse(JSON.stringify(this.CustomerInfoDefault))
      this.CustomerInfo = JSON.parse(JSON.stringify(this.CustomerInfoDefault))
      this.Customer.closeNewCustomer = false
      this.$router.back()
    },

    // calculateAge(birthdate) {
    //   if (!birthdate) return 0

    //   const today = new Date()
    //   const birthDate = new Date(birthdate)

    //   let age = today.getFullYear() - birthDate.getFullYear()
    //   const monthDifference = today.getMonth() - birthDate.getMonth()

    //   // Adjust for cases where the birthday hasn't occurred yet this year
    //   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    //     age--
    //   }
    //   return age
    // },

    calculateAge(birthdate) {
      if (!birthdate) return 0

      const today = new Date()
      const birthDate = new Date(birthdate)

      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()

      // Adjust if the birthday hasn't happened yet this year
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      // Prevent negative ages
      if (age < 0) age = 0

      return age
    },

    clearLocation() {
      if (this.isChecked) {
        this.CustomerInfo.city = ''
        this.CustomerInfo.province = ''
      } else {
        this.CustomerInfo.city = 'Tagum City'
        this.CustomerInfo.province = 'Davao del Norte'
      }
    },
    toggledCheckbox() {
      this.isChecked = !this.isChecked
      this.CustomerInfo.is_not_tagum = this.isChecked
    },
    toggled_pwd() {
      this.pwd = !this.pwd
      this.CustomerInfo.is_pwd = this.pwd
    },
    toggled_solo() {
      this.solo = !this.solo
      this.CustomerInfo.is_solo = this.solo
    },

    async Insert_Customer(payload) {
      payload.user_id = this.user.id
      try {
        // console.log(payload)
        this.errorMsg = []
        await this.Customer.newCustomer(payload)

        this.CustomerInfo = []
        this.Customer.closeNewCustomer = false

        this.$router.back()
      } catch (error) {
        if (error.response) {
          const { data } = error.response
          if (data.errors) {
            this.errorMsg.push(data.errors)
          } else {
            this.errorMsg.push(data.message)
          }
        } else {
          this.errorMsg.push(error.message)
        }
        this.showError = true
        console.error(this.errorMsg[0])
      }
    },

    async Select_Customer(id) {
      try {
        await this.Customer.getCustomer(id)
        this.CustomerInfo = { ...this.Customer.customer }
      } catch (error) {
        if (error.response) {
          const { data } = error.response
          if (data.errors) {
            this.errorMsg.push(data.errors)
          } else {
            this.errorMsg.push(data.message)
          }
        } else {
          this.errorMsg.push(error.message)
        }
        this.showError = true
        // console.log(error)
        //    this.$q.notify({
        //   type: 'negative',
        //   message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        //   position: 'center',
        //   timeout: 1200,
        // })
      }
    },

    async updateCustomer(id, payload) {
      console.table(payload)
      try {
        await this.Customer.updateCustomer(id, payload)
        this.$q.notify({
          type: 'positive',
          message: 'Updating records successful!',
          position: 'center',
          timeout: 1200,
        })
      } catch (error) {
        if (error.response) {
          const { data } = error.response
          if (data.errors) {
            this.errorMsg.push(data.errors)
          } else {
            this.errorMsg.push(data.message)
          }
        } else {
          this.errorMsg.push(error.message)
        }
        this.showError = true
        // console.log(error)
      }
    },
  },

  mounted() {
    this.GetAuthenticatedUser()
    this.CustomerInfo.city = 'TAGUM CITY'
    this.CustomerInfo.province = 'DAVAO DEL NORTE'
    this.user_id = this.user.id
  },
  unmounted() {
    this.Customer.isEdit = false
    this.Customer.isSave = true
  },

  watch: {
    'CustomerInfo.birthdate'(newBirthdate) {
      this.CustomerInfo.age = this.calculateAge(newBirthdate)
    },

    'CustomerInfo.age'(age) {
      if (age < 18) {
        this.CustomerInfo.category = 'Child'
        this.children = true
        this.adult = false
        this.senior = false
      } else if (age >= 18 && age < 60) {
        this.CustomerInfo.category = 'Adult'
        this.adult = true
        this.children = false
        this.senior = false
      } else if (age >= 60) {
        this.CustomerInfo.category = 'Senior'
        this.senior = true
        this.children = false
        this.adult = false
      }
    },
  },
}
</script>
