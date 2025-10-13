<!-- <template>
  <div class="flex flex-center bg-grey-2" style="min-height: 100vh">
    <q-card class="q-pa-lg shadow-3" style="width: 420px; border-radius: 24px">
      <q-card-section class="text-center">
        <q-avatar size="200px" class="q-mb-md">
          <img src="../assets/tagumlogo.png" alt="App Logo" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-primary">Pharmacy Inventory System</div>
        <div class="text-subtitle1 text-grey-7">Login to your account</div>
      </q-card-section>

      <q-form @submit.prevent="handleLogin" ref="loginForm">
        <q-card-section>
          <q-input
            outlined
            v-model="userLogin.username"
            label="Username"
            type="text"
            lazy-rules
            :rules="[(val) => !!val || 'Username is required']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="userLogin.password"
            label="Password"
            type="password"
            lazy-rules
            :rules="[(val) => !!val || 'Password is required']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Sign In"
            class="full-width"
            :loading="loading"
            rounded
            unelevated
          />
        </q-card-section>
      </q-form>

      <q-card-section class="text-center">
        <span class="text-caption" style="color: gray"
          >Powered by City information and Communications Technology Management Office - BPM
          Division</span
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useUserStore } from 'src/stores/userStore'


export default {
  setup() {
    const loginStore = useUserStore()


    return {
      loginStore,

    }
  },
  data() {
    return {
      userLogin: {
        username: '',
        password: '',
      },
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async handleLogin() {
      if (!this.userLogin.username || !this.userLogin.password) return

      this.loading = true

      try {
        //  await this.loginAuth.login(this.userLogin)
        const success = await this.loginStore.loginUser(this.userLogin)
        if (success){
          this.loading = false
          this.$q.notify({ type: 'positive', message: 'Login successful!' })
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.$q.notify({ type: 'negative', message: error.message })
      } finally {
        this.loading = false
      }
    },
  },
  computed: {},
}
</script>

<style scoped>
.q-card {
  max-width: 420px;
  border-radius: 24px;
}
</style> -->
<!--
<template>
  <div class="flex flex-center bg-grey-2" style="min-height: 100vh">
    <q-card class="q-pa-lg shadow-3" style="width: 420px; border-radius: 24px">
      <q-card-section class="text-center">
        <q-avatar size="200px" class="q-mb-md">
          <img src="../assets/tagumlogo.png" alt="App Logo" />
        </q-avatar>
        <div class="text-h5 text-weight-bold text-primary">Pharmacy Inventory System</div>
        <div class="text-subtitle1 text-grey-7">Login to your account</div>
      </q-card-section>

      <q-form @submit.prevent="handleLogin" ref="loginForm">
        <q-card-section>
          <q-input
            outlined
            v-model.trim="userLogin.username"
            label="Username"
            type="text"
            lazy-rules
            :rules="[(val) => !!val || 'Username is required']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="userLogin.password"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            lazy-rules
            :rules="[(val) => !!val || 'Password is required']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Sign In"
            class="full-width"
            :loading="loading"
            rounded
            unelevated
          />
        </q-card-section>
      </q-form>

      <q-card-section class="text-center">
        <span class="text-caption text-grey"
          >Powered by City Information and Communications Technology Management Office - BPM
          Division</span
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useUserStore } from 'src/stores/userStore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const loginStore = useUserStore()
    const $q = useQuasar()
    const router = useRouter()

    return {
      loginStore,
      $q,
      router,
    }
  },
  data() {
    return {
      userLogin: {
        username: '',
        password: '',
      },
      loading: false,
      isPasswordVisible: false,
    }
  },
  methods: {
    async handleLogin() {
      if (!this.userLogin.username || !this.userLogin.password) return

      this.loading = true

      try {
        const success = await this.loginStore.loginUser(this.userLogin)

        if (success) {
          this.$q.notify({ type: 'positive', message: 'Login successful!' })
          this.$router.push('/dashboard')
        } else {
          this.$q.notify({ type: 'negative', message: 'Invalid credentials. Please try again.' })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.message || error.message || 'Login failed.',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.q-card {
  max-width: 420px;
  border-radius: 24px;
}
</style> -->

<template>
  <div class="flex flex-center bg-grey-2" style="min-height: 100vh">
    <q-card class="row no-wrap shadow-3" style="max-width: 900px; width: 90%; border-radius: 24px">
      <!-- Left Side (Logos and Department Info) -->
      <div
        class="col-7 flex flex-center column bg-white text-white q-pa-xl"
        style="border-top-left-radius: 24px; border-bottom-left-radius: 24px"
      >
        <q-avatar size="160px" class="q-mb-md bg-white">
          <img src="../assets/cho_logo.png" alt="City Logo" />
        </q-avatar>

        <div class="text-h5 text-weight-bold text-green q-mb-sm">Pharmacy Inventory System</div>
        <q-separator class=" text-black"></q-separator>

        <div class="text-subtitle1 text-center text-black text-weight-bold text-primary">
          Office of the City Health Officer
        </div>
        <div class="text-subtitle2 text-weight-light  text-black text-center q-mb-lg">
          Mabini Street, Tagum City, Davao del Norte
        </div>

        <q-separator dark inset style="width: 60%" class="q-mb-lg" />
        <div class="flex flex-between q-gutter-lg">
          <q-avatar size="100px" class="q-mb-sm">
            <img src="../assets/tagumlogo.png" alt="LGU Logo" />
          </q-avatar>
          <div
            class="q-mt-md q-pa-sm bg-white flex flex-center"
            style="border-radius: 12px; width: 120px"
          >
            <img
              src="../assets/bagongpilipinas.png"
              alt="Bagong Pilipinas Logo"
              style="width: 100%; height: auto; object-fit: contain"
            />
          </div>
        </div>

        <!-- <div class="text-subtitle2 text-center">
         Office of the City Infomation and Communication Technology Management Office
        </div> -->
      </div>

      <!-- Right Side (Login Form) -->
      <div class="col-5 q-pa-xl  flex flex-center column rightside">
        <div class="text-subtitle1 text-weight-bolder text-grey-8 q-mb-lg">Login to your account</div>

        <q-form
          @submit.prevent="handleLogin"
          ref="loginForm"
          class="full-width"
          style="max-width: 350px"
        >
          <q-input
          dense
            outlined
            v-model.trim="userLogin.username"
            label="Username"
            type="text"
            lazy-rules
            :rules="[(val) => !!val || 'Username is required']"
            class="q-mb-md "
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            dense
            v-model="userLogin.password"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            lazy-rules
            :rules="[(val) => !!val || 'Password is required']"
            class="q-mb-lg"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            label="Sign In"
            class="full-width"
            :loading="loading"
            rounded
            unelevated
          />

          <div class="text-caption text-white text-center q-mt-md">
            Powered by CICTMO - BPM Division
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
import { useUserStore } from 'src/stores/userStore'
import { useQuasar } from 'quasar'


export default {
  setup() {
    const loginStore = useUserStore()
    const $q = useQuasar()


    return { loginStore, $q }
  },
  data() {
    return {
      userLogin: {
        username: '',
        password: '',
      },
      loading: false,
      isPasswordVisible: false,
    }
  },
  methods: {
    async handleLogin() {
      if (!this.userLogin.username || !this.userLogin.password) return

      this.loading = true
      try {
        const success = await this.loginStore.loginUser(this.userLogin)
        if (success) {
          this.$q.notify({ type: 'positive', message: 'Login successful!' })
          this.$router.push('/dashboard')
        } else {
          this.$q.notify({ type: 'negative', message: 'Invalid credentials' })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.message || 'Login failed.',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.rightside {
  background: linear-gradient(135deg, #abe39b 25%, #38c14aed 75%);
  color: #ffffff;
}

@media (max-width: 768px) {


  .q-card {
    flex-direction: column !important;
  }

  .q-card > .col-5 {
    border-radius: 24px 24px 0 0 !important;
  }

  .q-card > .col-7 {
    border-radius: 0 0 24px 24px !important;
  }
}
</style>
