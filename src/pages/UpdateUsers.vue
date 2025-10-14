<template>
  <q-page class="flex flex-center">
    <q-card
      class="q-pa-lg shadow-2"
      style="min-width: 350px; max-width: 800px; width: 100%; border-radius: 16px"
    >
      <!-- Header -->
      <q-card-section class="q-pb-sm">
        <div class="text-h6 text-primary">User Profile</div>
        <div class="text-caption text-grey-7">Update your personal and office details below</div>
        <q-separator class="q-my-sm" />
      </q-card-section>

      <!-- Form -->
      <q-card-section>
        <q-form ref="registrationForm" @submit.prevent="onSubmit">
          <!-- Name Fields -->
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                filled
                dense
                v-model="form.first_name"
                label="First Name"
                :rules="[(val) => !!val || 'First name is required']"
                class="text-uppercase"
                :prepend-inner-icon="'badge'"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                filled
                dense
                v-model="form.last_name"
                label="Last Name"
                :rules="[(val) => !!val || 'Last name is required']"
                class="text-uppercase"
                :prepend-inner-icon="'badge'"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                filled
                dense
                v-model="form.middle_name"
                label="Middle Name"
                class="text-uppercase"
                :prepend-inner-icon="'badge'"
              />
            </div>
          </div>

          <!-- Position & Office -->
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-12 col-md-6">
              <q-input
                filled
                dense
                v-model="form.position"
                label="Position"
                :rules="[(val) => !!val || 'Position is required']"
                class="text-uppercase"
                :prepend-inner-icon="'work_outline'"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                filled
                dense
                v-model="form.office"
                label="Office"
                :rules="[(val) => !!val || 'Office is required']"
                class="text-uppercase"
                :prepend-inner-icon="'business'"
              />
            </div>
          </div>

          <!-- Change Password Button -->
          <div class="text-right q-mt-md">
            <q-btn
              flat
              dense
              icon="lock_reset"
              label="Change Password"
              color="primary"
              @click="showChangepassword = true"
            />
          </div>

          <!-- Action Buttons -->
          <div class="row justify-end q-gutter-sm q-mt-lg">
            <q-btn flat label="Cancel" color="grey-7" @click="oncancel" />
            <q-btn unelevated label="Update" color="primary" icon="save" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showChangepassword" persistent>
      <q-card class="q-pa-md" style="min-width: 380px; border-radius: 16px">
        <q-card-section class="text-center">
          <q-icon name="lock" size="48px" color="primary" />
          <div class="text-h6 q-mt-sm">Change Password</div>
          <div class="text-caption text-grey-7">Please enter your new password below</div>
        </q-card-section>

        <q-separator spaced />

        <q-card-section>
          <q-input
            filled
            dense
            clearable
            v-model="password"
            label="New Password"
            type="password"
            :rules="[
              (val) => !!val || 'Password is required',
              (val) => val.length >= 8 || 'At least 8 characters',
              (val) => val.length <= 16 || 'No more than 16 characters',
            ]"
            class="q-mb-md"
            hint="8–16 characters required"
            :prepend-inner-icon="'vpn_key'"
          />

          <q-input
            filled
            dense
            clearable
            v-model="confirm_password"
            label="Confirm Password"
            type="password"
            :rules="[
              (val) => !!val || 'Confirm password is required',
              (val) => val === password || 'Passwords do not match',
            ]"
            :prepend-inner-icon="'check_circle_outline'"
          />
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn unelevated label="Change" color="primary" @click="showAllowChange = true" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAllowChange" persistent>
      <q-card class="q-pa-md" style="min-width: 380px; border-radius: 16px">
        <q-card-section class="text-center">
          <q-icon name="lock" size="48px" color="primary" />
          <div class="text-h6 q-mt-sm">Confirm Change of Password</div>
          <div class="text-caption text-grey-7">Please enter your old password below</div>
        </q-card-section>

        <q-separator spaced />

        <q-card-section>
          <q-input
            filled
            dense
            clearable
            v-model="oldpassword"
            label="Password"
            type="password"
            :rules="[
              (val) => !!val || 'Password is required',
              (val) => val.length >= 8 || 'At least 8 characters',
              (val) => val.length <= 16 || 'No more than 16 characters',
            ]"
            class="q-mb-md"
            hint="8–16 characters required"
            :prepend-inner-icon="'vpn_key'"
          />
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn
            :loading="loading"
            unelevated
            label="Confirm"
            color="primary"
            @click="savePassword()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useUserStore } from 'src/stores/userStore'
export default {
  name: 'UserRegistrationForm',

  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    }
  },
  data() {
    return {
      loading: false,
      confirm_password: '',
      password: '',
      oldpassword: '',

      showAllowChange: false,
      showChangepassword: false,
      user: {},

      form: {
        first_name: '',
        last_name: '',
        middle_name: '',
        position: '',
        office: '',
      },
    }
  },
  methods: {
    oncancel() {
      this.resetForm()
      this.$router.go(-1)
    },
    async onSubmit() {
      const success = await this.$refs.registrationForm.validate()
      if (success) {
        // this.insertNewUser(this.form)
        // Handle successful registration here
        // console.log('Upda successful:', this.form)

        // this.$q.notify({
        //   type: 'positive',
        //   message: 'User registered successfully!',
        // })
        // Optionally clear form
        // console.log(this.form)
        this.userStore.updateUser(this.user.id, this.form)

        this.resetForm()
        this.GetAuthenticatedUser()

      } else {
        // Validation errors are shown automatically
        this.$q.notify({
          type: 'negative',
          message: 'Please fill in all required fields.',
        })
      }
    },
    resetForm() {
      this.form = {
        first_name: '',
        last_name: '',
        middle_name: '',
        position: '',
        office: '',
      }

      this.$refs.registrationForm.resetValidation()
    },

    async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
      this.form = this.user
    },

    async savePassword() {
      try {
        this.loading = true
        await this.userStore.changePassword({old_password: this.oldpassword, password: this.password, confirm_password: this.confirm_password})
        this.loading = false
        this.showAllowChange =false
        this.showChangepassword = false
      } catch (error) {
        // console.log(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 1200,
        })


      }
    },
  },
  mounted() {
    this.GetAuthenticatedUser()
    // Fetch data or perform any setup when the component is mounted
    // console.log('Selected ID:', this.userStore.selected_id)
    // if (this.userStore.isAuthenticated) {
    //   this.getUser(this.user.id)
    // }
  },
}
</script>
