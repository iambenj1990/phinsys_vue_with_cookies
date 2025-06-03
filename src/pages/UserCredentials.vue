<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-green">User Credentials</div>
        <div class="text-subtitle2 text-weight-light">Manage your credentials</div>

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
        <q-btn label="Cancel" color="grey" class="q-mt-md" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { useUserCredentialtore } from 'src/stores/userCredentialStore';

export default {
  name: 'UserCredentials',

  setup() {
    const userCredentialStore = useUserCredentialtore();
    return { userCredentialStore };
  },

  data() {
    return {
      credentials: {},
      modulePermissions: [
        { key: 'Releasing', title: 'Releasing', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
        { key: 'CustomerHistory', title: 'Customer History', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
        { key: 'Purchasing', title: 'Purchasing', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
        { key: 'Adjustments', title: 'Adjustments', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
        {
          key: 'Stocks',
          title: 'Stocks',
          submodules: [
            { key: 'StocksView', title: 'Stocks', permissions:['View', 'Add', 'Edit', 'Delete', 'Export'] },
            { key: 'Expiry', title: 'Expiry', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
            { key: 'LowStocks', title: 'Low Stocks', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export'] },
            { key: 'Inventory', title: 'Inventory', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export']},
            { key: 'Dispensed', title: 'Dispensed', permissions: ['View', 'Add', 'Edit', 'Delete', 'Export']}
          ]
        },
        { key: 'UserManagement', title: 'User Management', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] },
        { key: 'UserCredentials', title: 'User Credentials', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] },
        { key: 'Libraries', title: 'Libraries', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] },
        { key: 'Units', title: 'Units', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] },
        { key: 'DosageType', title: 'Dosage Type', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] },
        { key: 'Configurations', title: 'Configurations', permissions: ['View', 'Add', 'Edit', 'Delete','Export'] }
      ]
    };
  },

  created() {
    this.initCredentials();
    const userId = this.userCredentialStore.selected_id;
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
          this.credentials[module.key] = { user_id: 0, ModuleTitle: module.title };
          module.permissions.forEach(permission => {
            this.credentials[module.key][permission] = false;
          });
        }
        if (module.submodules) {
          module.submodules.forEach(sub => {
            this.credentials[sub.key] = { user_id: 0, ModuleTitle: sub.title };
            sub.permissions.forEach(permission => {
              this.credentials[sub.key][permission] = false;
            });
          });
        }
      });
    },

    async saveCredentials() {
      const user_id = this.userCredentialStore.selected_id;
      const payload = Object.values(this.credentials).map(cred => ({
        ...cred,
        user_id
      }));

      try {

        console.log (payload)
        await this.$api.post('/user-credentials', payload);
        this.$q.notify({ type: 'positive', message: 'Credentials saved successfully!' });
      } catch (error) {
        this.$q.notify({ type: 'negative', message: 'Failed to save credentials. ' + error });
      }
    },

    async loadCredentials(userId) {
      try {
        const response = await this.$api.get(`/user-credentials/${userId}`);
        const loadedData = response.data;

        this.initCredentials();

        loadedData.forEach(item => {
          const allKeys = [...this.modulePermissions.flatMap(m => [m, ...(m.submodules || [])])];
          const match = allKeys.find(mod => mod.title === item.ModuleTitle);
          const key = match?.key;

          if (key) {
            this.credentials[key] = {
              user_id: item.user_id,
              ModuleTitle: item.ModuleTitle
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
