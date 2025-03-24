<template>
  <q-page class="flex flex-center q-ma-sm">
    <q-card class="q-pa-sm" style="max-width: 900px; width: 100%">
      <div class="row q-gutter-md q-pb-sm">
        <div class="col-12">
          <div align="center" class="text-h6 text-primary">Client Information</div>
        </div>
      </div>
      <q-separator />
      <div class="row q-gutter-md q-pt-lg">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.lastname" label="Lastname" class="full-width" />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.firstname" label="Firstname" class="full-width" />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.middlename" label="Middlename" class="full-width" />
        </div>
        <div class="col-12 col-md-1 q-pa-sm">
          <q-input dense v-model="CustomerInfo.ext" label="Ext." class="full-width" />
        </div>
      </div>

      <div class="row q-gutter-md q-pa-sm">
        <div class="col-12 col-md-2 q-pa-sm">
          <q-select
            dense
            v-model="CustomerInfo.gender"
            :options="GenSelection"
            label="Gender"
            class="full-width"
          />
        </div>
        <div class="col-12 col-md-2 q-pa-sm">
          <q-input
            type="date"
            dense
            v-model="CustomerInfo.birthdate"
            label="Birthdate"
            class="full-width"
            @change="calculateAge(CustomerInfo.birthdate)"
          />
        </div>
        <div class="col-12 col-md-1 q-pa-sm">
          <q-input dense v-model="CustomerInfo.age" label="Age" class="full-width" readonly />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input
            dense
            v-model="CustomerInfo.contact_number"
            label="Contact Number"
            class="full-width"
            inputmode="numeric"
          />
        </div>
      </div>

      <div class="row q-gutter-md">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-checkbox
            v-model="isChecked"
            label="Not From This City"
            @change="toggledCheckbox"
            class=""
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
            class="full-width"
          />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.purok" label="Purok" class="full-width" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-input dense v-model="CustomerInfo.street" label="Street" class="full-width" />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.city" label="City" class="full-width" />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.province" label="Province" class="full-width" />
        </div>
      </div>

      <div class="row q-gutter-md" v-else-if="isChecked">
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.barangay" label="Barangay" class="full-width" />
        </div>
        <div class="col-12 col-md-2 q-pa-sm">
          <q-input dense v-model="CustomerInfo.purok" label="Purok" class="full-width" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-input dense v-model="CustomerInfo.street" label="Street" class="full-width" />
        </div>
        <div class="col-12 col-md-2 q-pa-sm">
          <q-input dense v-model="CustomerInfo.city" label="City" class="full-width" />
        </div>
        <div class="col-12 col-md-3 q-pa-sm">
          <q-input dense v-model="CustomerInfo.province" label="Province" class="full-width" />
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
            class=""
            :style="{ fontSize: '11px' }"
            disable
          />
        </div>
        <div class="col-12 col-md-1 q-pa-sm">
          <q-checkbox
            v-model="adult"
            :val="'Adult'"
            label="Adult"
            class=""
            :style="{ fontSize: '11px' }"
            disable
          />
        </div>
        <div class="col-12 col-md-1 q-pa-sm">
          <q-checkbox
            v-model="senior"
            :val="'Senior'"
            label="Senior"
            class=""
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
            class=""
            :style="{ fontSize: '11px' }"
            @change="toggled_pwd"
          />
        </div>
        <div class="col-12 col-md-1 q-pa-sm">
          <q-checkbox
            v-model="solo"
            :val="'Solo'"
            label="Solo"
            class=""
            :style="{ fontSize: '11px' }"
            @change="toggled_solo"
          />
        </div>
      </div>
      <!-- <pre>{{ CustomerInfo.category }}</pre> -->

      <div class="row q-gutter-md q-pt-md">
        <div class="col-12 flex justify-end q-pa-md-lg">
          <q-btn
            type="submit"
            label="Save"
            class="q-mr-md q-ml-md"
            color="primary"
            @click="Insert_Customer(CustomerInfo)"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { useTagumStore } from '../stores/TagumStore'
import { useCustomerStore } from '../stores/customersStore'
export default {
  setup() {
    const TagumBarangay = useTagumStore()
    const Customer = useCustomerStore()

    return {
      Customer,
      TagumBarangay,
      GenSelection: ['Male', 'Female', 'LGBTQ'],
    }
  },
  data() {
    return {
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
        user_id: 1,
      },
    }
  },
  methods: {
    calculateAge(birthdate) {
      if (!birthdate) return 0

      const today = new Date()
      const birthDate = new Date(birthdate)

      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()

      // Adjust for cases where the birthday hasn't occurred yet this year
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
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
      try {
        // console.log(payload)
        await this.Customer.newCustomer(payload)
        this.$q.notify({ type: 'positive', message: 'Adding Client successful!' })
      } catch (error) {
        console.log(error)
        this.$q.notify({ type: 'negative', message: 'Adding Client failed!' })
      }
    },

    async Select_Customer(id){
      try {
        await this.Customer.getCustomer(id)
        this.CustomerInfo = this.Customer.customer
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {},

  watch: {
    'CustomerInfo.birthdate'(newBirthdate) {
      this.CustomerInfo.age = this.calculateAge(newBirthdate)
      console.log(this.CustomerInfo.age)
    },

    'CustomerInfo.age'(age) {
      if (age < 18) {
        this.CustomerInfo.category = 'Children'
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
