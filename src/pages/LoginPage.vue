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
    <q-card
      class="row no-wrap shadow-3 login-card"
      style="max-width: 900px; width: 95%; border-radius: 24px"
    >
      <!-- Left Side (Logos and Department Info) -->
      <div class="col-7 flex flex-center column bg-white left-panel">
        <q-avatar size="120px" class="q-mb-md bg-white logo-avatar">
          <img src="../assets/cho_logo.png" alt="City Logo" class="avatar-img" />
        </q-avatar>

        <div class="text-h5 text-weight-bold text-green q-mb-sm text-center">
          Pharmacy Inventory System
        </div>
        <q-separator class="text-black" style="width: 60%" />

        <div class="text-subtitle1 text-center text-black text-weight-bold q-mt-md">
          Office of the City Health Officer
        </div>
        <div class="text-subtitle2 text-center text-black text-weight-light q-mb-lg">
          Mabini Street, Tagum City, Davao del Norte
        </div>

        <div class="flex flex-center q-gutter-lg logo-row">
          <q-avatar size="80px" class="q-mb-sm">
            <img src="../assets/tagumlogo.png" alt="LGU Logo" />
          </q-avatar>
          <div class="q-pa-sm bg-white flex flex-center bagong-logo">
            <img
              src="../assets/bagongpilipinas.png"
              alt="Bagong Pilipinas Logo"
              style="width: 100%; height: auto; object-fit: contain"
            />
          </div>
        </div>
      </div>

      <!-- Right Side (Login Form) -->
      <div class="col-5 q-pa-xl flex flex-center column rightside">
        <div class="text-subtitle1 text-weight-bolder text-grey-8 q-mb-lg text-center">
          Login to your account
        </div>

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
            class="q-mb-md"
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
            <div class="text-bold">Powered by CICTMO - SPM Section</div>

            <div class="row justify-center items-center q-gutter-xs q-mt-xs">
              <q-icon name="info" size="16px" />
              <span>NR {{ version }}</span>
            </div>
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
import packageJson from '../../package.json'
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
      version: packageJson.version,
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
  color: #ca0606;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
}

.left-panel {
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding: 2rem;
  text-align: center;
}

.bagong-logo {
  border-radius: 12px;
  width: 100px;
}

.logo-row {
  justify-content: center;
}

@media (max-width: 1024px) {
  .login-card {
    flex-direction: column !important;
    width: 95%;
  }

  .left-panel,
  .rightside {
    width: 100% !important;
    border-radius: 0 !important;
  }

  .left-panel {
    border-radius: 24px 24px 0 0 !important;
  }

  .rightside {
    border-radius: 0 0 24px 24px !important;
  }

  .logo-avatar {
    size: 100px !important;
  }

  .text-h5 {
    font-size: 1.2rem;
  }

  .text-subtitle1,
  .text-subtitle2 {
    font-size: 0.9rem;
  }

  .q-pa-xl {
    padding: 1.5rem !important;
  }

  .bagong-logo {
    width: 80px !important;
  }

  .logo-row {
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* ✅ keeps aspect ratio */
    object-position: center;
  }
  .text-h5 {
    font-size: 1rem;
  }

  .text-subtitle1,
  .text-subtitle2 {
    font-size: 0.8rem;
  }

  .q-card {
    width: 100% !important;
  }

  .q-avatar img {
    max-width: 80px;
  }

  .q-pa-xl {
    padding: 1rem !important;
  }
}
</style>
