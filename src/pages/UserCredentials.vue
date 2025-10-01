<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-green">User Credentials</div>
        <div class="text-subtitle2 text-weight-light">Manage your credentials</div>
        <q-separator></q-separator>

        <div class="q-mt-md" style="width: 900px">
          <q-list class="q-ma-xs">
            <q-item v-for="module in modulePermissions" :key="module.key">
              <q-item-section>
                <q-item-label class="text-h6 text-green">{{ module.title }}</q-item-label>

                <!-- Module permissions -->
                <div v-if="module.permissions" class="q-ma-xs flex text-grey row">
                  <div v-for="permission in module.permissions" :key="permission" class="q-mt-xs q-mr-md">
                    <q-checkbox
                      v-model="credentials[module.key][permission]"
                      :label="permission"
                      color="green"
                    />
                  </div>
                </div>

                <!-- Submodules -->
                <div v-if="module.submodules" class="q-ml-md">
                  <div v-for="sub in module.submodules" :key="sub.key" class="q-mt-sm">
                    <q-item-label class="text-subtitle2 text-weight-medium">{{ sub.title }}</q-item-label>
                    <div class="q-ma-xs flex text-grey row">
                      <div v-for="permission in sub.permissions" :key="permission" class="q-mt-xs q-mr-md">
                        <q-checkbox
                          v-model="credentials[sub.key][permission]"
                          :label="permission"
                          color="green"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn label="Save" color="green" class="q-mt-md" @click="saveCredentials" />
        <q-btn label="Cancel" color="grey" class="q-mt-md" @click="$router.back()" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { useUserCredentialstore } from 'src/stores/userCredentialStore';
import { useUserStore } from 'src/stores/userStore';

export default {
  name: 'UserCredentials',

  setup() {
    const userCredentialStore = useUserCredentialstore();
    const  userStore = useUserStore()
    return {
      userCredentialStore,
      userStore

     };
  },

  data() {
    return {
      credentials: {},
      modulePermissions: [
        { key: 'Releasing', title: 'Releasing', permissions:  ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'CustomerHistory', title: 'Customer History', permissions:  ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'Purchasing', title: 'Purchasing', permissions:  ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'Adjustments', title: 'Adjustments', permissions:  ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'RIS', title: 'RIS', permissions:  ['view', 'add', 'edit', 'delete', 'export'] },
        {
          key: 'Stocks',
          title: 'Stocks Report',
          submodules: [
            { key: 'StocksView', title: 'Stocks', permissions: ['view','export'] },
            { key: 'Expiry', title: 'Expiry', permissions:  ['view', 'export'] },
            { key: 'LowStocks', title: 'Low Stocks', permissions:  ['view', 'export'] },
            { key: 'Inventory', title: 'Inventory', permissions:  ['view', 'export']},
            { key: 'Dispensed', title: 'Dispensed', permissions:  ['view', 'export']},
            { key: 'temporary', title: 'Temporary PO#', permissions:  ['view', 'export']},
              { key: 'Customer', title: 'Customer Dispensed', permissions:  ['view', 'export']}
          ]
        },
        { key: 'UserManagement', title: 'User Management', permissions: ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'UserCredentials', title: 'User Credentials', permissions: ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'Libraries', title: 'Libraries', permissions: ['view', 'add', 'edit', 'delete', 'export'] },
        // { key: 'Units', title: 'Units', permissions: ['view', 'add', 'edit', 'delete', 'export'] },
        // { key: 'DosageType', title: 'Dosage Type', permissions: ['view', 'add', 'edit', 'delete', 'export'] },
        { key: 'Configurations', title: 'Configurations', permissions: ['view', 'add', 'edit', 'delete', 'export'] }
      ]
    };
  },

  created() {
    this.initCredentials();
    const userId = this.userStore.selected_id;
    if (userId) this.loadCredentials(userId);
  },

  watch: {
    'userCredentialStore.selected_id'(newId) {
      if (newId) this.loadCredentials(newId);
    }
  },

  methods: {

    initCredentials() {
      this.credentials = {};
      this.modulePermissions.forEach(module => {
        if (module.permissions) {
          this.credentials[module.key] = { userid: 0, module: module.title };
          module.permissions.forEach(permission => {
            this.credentials[module.key][permission] = false;
          });
        }
        if (module.submodules) {
          module.submodules.forEach(sub => {
            this.credentials[sub.key] = { userid: 0, module: sub.title };
            sub.permissions.forEach(permission => {
              this.credentials[sub.key][permission] = false;
            });
          });
        }
      });
    },

    async saveCredentials() {
      const userid = this.userStore.selected_id;
      const payload = Object.values(this.credentials).map(cred => ({
        ...cred,
        userid
      }));

      try {

        console.log (payload)
        // await this.$api.post('/user-credentials', payload);
        await this.userCredentialStore.newUserCredential(payload)
        this.$q.notify({ type: 'positive', message: 'Credentials saved successfully!' });
      } catch (error) {
        this.$q.notify({ type: 'negative', message: 'Failed to save credentials. ' + error });
      }
    },

    async loadCredentials(userId) {
      try {
       await this.userCredentialStore.getUserCredential(userId)
        const loadedData = this.userCredentialStore.credentials
        console.log('loaded data :', loadedData)

        this.initCredentials();

        loadedData.forEach(item => {
          const allKeys = [...this.modulePermissions.flatMap(m => [m, ...(m.submodules || [])])];
          const match = allKeys.find(mod => mod.title === item.module);
          const key = match?.key;

          if (key) {
            this.credentials[key] = {
              userid: item.userid,
              module: item.module
            };

            (match.permissions || []).forEach(permission => {
              this.credentials[key][permission] = !!item[permission];
            });
          }
        });
      } catch (error) {
        console.error('Failed to load credentials:', error);
        this.$q.notify({ type: 'negative', message: 'Unable to load user credentials.' });
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
