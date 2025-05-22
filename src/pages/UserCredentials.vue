<template>
  <q-page class="q-pa-md">
    <q-card >
      <q-card-section>
        <div class="text-h6 text-green">User Credentials</div>

        <div class="text-subtitle2 text-weight-light">Manage your credentials</div>
        <div class="q-mt-md" style="width: 900px">
          <q-list  class="q-ma-xs">
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-green">Dashboard</q-item-label>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Dashboard.Dashboard" label="Dashboard" color="green" />
                  </div>
                </div>
                <div class="q-ml-md q-mt-xs flex justify-start row text-grey">
                  <div class="col-12">
                    <q-checkbox v-model="Dashboard.Expiry" label="Expiry" color="green" />
                  </div>
                  <div class="col-12">
                    <q-checkbox v-model="Dashboard.Stocks" label="No Stocks" color="green" />
                  </div>
                  <div class="col-12">
                    <q-checkbox v-model="Dashboard.Dispensed" label="Dispensed" color="green" />
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-green">Client Management</q-item-label>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Releasing.Releasing" label="Releasing" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Releasing.Add" label="Add" color="green" />
                    <q-checkbox v-model="Releasing.Edit" label="Edit" color="green" />
                    <q-checkbox v-model="Releasing.Delete" label="Delete" color="green" />
                    <q-checkbox v-model="Releasing.Export" label="Export" color="green" />
                  </div>
                </div>

                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="CustomerHistory.CustomerHistory" label="Customer History" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="CustomerHistory.Add" label="Add" color="green" />
                    <q-checkbox v-model="CustomerHistory.Edit" label="Edit" color="green" />
                    <q-checkbox v-model="CustomerHistory.Delete" label="Delete" color="green" />
                    <q-checkbox v-model="CustomerHistory.Export" label="Export" color="green" />
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-green">Stock Management</q-item-label>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Purchasing.Purchasing" label="Purchasing" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Purchasing.Add" label="Add" color="green" />
                    <q-checkbox v-model="Purchasing.Edit" label="Edit" color="green" />
                    <q-checkbox v-model="Purchasing.Delete" label="Delete" color="green" />
                    <q-checkbox v-model="Purchasing.Export" label="Export" color="green" />
                  </div>
                </div>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Adjustments.Adjustments" label="Adjustments" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Adjustments.Add" label="Add" color="green" />
                    <q-checkbox v-model="Adjustments.Edit" label="Edit" color="green" />
                    <q-checkbox v-model="Adjustments.Delete" label="Delete" color="green" />
                    <q-checkbox v-model="Adjustments.Export" label="Export" color="green" />
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-green">Reports</q-item-label>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Stocks.Stocks" label="Stocks" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Stocks.Expiry" label="Expiry" color="green" />
                    <q-checkbox v-model="Stocks.LowStocks" label="No Stocks" color="green" />
                    <q-checkbox v-model="Stocks.Inventory" label="Inventory" color="green" />
                    <q-checkbox v-model="Stocks.Dispensed" label="Dispensed" color="green" />
                  </div>
                </div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-green">Settings</q-item-label>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="UserManagement.UserManagement" label="User Management" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="UserManagement.Add" label="Add" color="green" />
                    <q-checkbox v-model="UserManagement.Edit" label="Edit" color="green" />
                    <q-checkbox v-model="UserManagement.Deactivate" label="Deactivate" color="green" />
                  </div>
                </div>

                <div class="q-ml-md q-mt-xs flex justify-between text-grey">
                  <div class="flex justify-start">
                    <q-checkbox v-model="UserCredentials.UserCredentials" label="User Credentials" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="UserCredentials.Add" label="Add" color="green" />
                    <q-checkbox v-model="UserCredentials.Edit" label="Edit" color="green" />
                  </div>
                </div>

                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Libraries.Libraries" label="Libraries" color="green" />
                  </div>
                </div>
                <div class="q-ml-md q-mt-xs flex justify-between text-grey">
                  <div class="flex justify-start">
                    <q-checkbox v-model="Units.Units" label="Units" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Units.Add" label="Add" color="green" />
                    <q-checkbox v-model="Units.Edit" label="Edit" color="green" />
                  </div>
                </div>
                <div class="q-ml-md q-mt-xs flex justify-between text-grey">
                  <div class="flex justify-start">
                    <q-checkbox v-model="DosageType.DosageType" label="Dosage Type" color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="DosageType.Add" label="Add" color="green" />
                    <q-checkbox v-model="DosageType.Edit" label="Edit" color="green" />
                  </div>
                </div>
                <div class="q-ma-xs flex justify-between text-grey">
                  <div class="q-mt-xs flex justify-start">
                    <q-checkbox v-model="Configurations.Configurations" label="Configurations " color="green" />
                  </div>
                  <div class="q-mt-xs justify-end">
                    <q-checkbox v-model="Configurations.Update" label="Edit" color="green" />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions>
        <div class="q-gutter-md " align="right">
          <q-btn label="Save" color="green" class="q-mt-md" />
          <q-btn label="Cancel" color="grey" class="q-mt-md" />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'UserCredentials',
  data() {
    return {
      // Add your data properties here
      Dashboard: {

        Dashboard: false,
        Expiry: false,
        Stocks: false,
        Dispensed: false,
      },
      Releasing: {
        ModuleTitle: 'Releasing',
        Releasing: false,
        Add: false,
        Edit: false,
        Delete: false,
        Export: false,
      },
      CustomerHistory: {
        ModuleTitle: 'Customer History',
        CustomerHistory: false,
        Add: false,
        Edit: false,
        Delete: false,
        Export: false,
      },
      Purchasing: {
        ModuleTitle: 'Purchasing',
        Purchasing: false,
        Add: false,
        Edit: false,
        Delete: false,
        Export: false,
      },
      Adjustments: {
        ModuleTitle: 'Adjustments',
        Adjustments: false,
        Add: false,
        Edit: false,
        Delete: false,
        Export: false,
      },
      Stocks: {
        ModuleTitle: 'Stocks',
        Stocks: false,
        Expiry: false,
        LowStocks: false,
        Inventory: false,
        Dispensed: false,
      },
      UserManagement: {
        ModuleTitle: 'User Management',
        UserManagement: false,
        Add: false,
        Edit: false,
        Deactivate: false,
      },

      UserCredentials: {
        ModuleTitle: 'User Credentials',
        UserCredentials: false,
        Add: false,
        Edit: false,
      },
      Libraries: {
        ModuleTitle: 'Libraries',
        Libraries: false,
        Add: false,
        Edit: false,
        Delete: false,
      },
      Configurations: {
        ModuleTitle: 'Configurations',
        Configurations: false,
        Update: false,
      },
    }
  },
  methods: {
    // Add your methods here
  },
  mounted() {
    // Lifecycle hook
  },
}
</script>

<style scoped>
/* Add your styles here */
</style>
