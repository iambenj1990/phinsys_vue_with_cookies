<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div>
          <q-input
            v-model="searchTerm"
            label="Search by Name or Lastname"
            outlined
            @input="filterList"
          />

          <q-list>
            <!-- <q-item v-for="item in filteredList" :key="item.id" clickable @click="show_id(item.id)"> -->
            <q-item
              v-for="item in filteredList"
              :key="item.id"
              clickable
              @click="get_client(item.id)"
            >
              <q-item-section>
                <q-item-label>
                  {{ item.firstname }} {{ item.lastname }} {{ item.ext }}
                </q-item-label>
                <q-item-label caption
                  >Date of Birth: {{ item.birthdate }} | Gender: {{ item.gender }} | Category:
                  {{ item.category }}</q-item-label
                >
                <q-item-label caption
                  >Location: {{ item.city }} | Province: {{ item.province }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-card-section>
          <div class="q-pa-sm flex">
            <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
              <div class="text-h6 text-blue text-weight-bolder">Customer Name</div>
              <q-separator></q-separator>
              <div class="row q-gutter-sm">
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.lastname"
                    label="Last name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.firstname"
                    label="First name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.middlename"
                    label="Middle name"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.ext"
                    label="Ext"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
              </div>
              <div class="row q-gutter-sm">
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.gender"
                    label="Gender"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.age"
                    label="Age"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.category"
                    label="Category"
                    class="full-width text-caption"
                    readonly
                  />
                </div>
              </div>
            </q-card>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-sm flex">
            <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
              <div class="text-h6 text-blue text-weight-bolder">Order Requests</div>
              <q-separator />
              <q-table
                bordered
                dense
                :rows="rows"
                :columns="cols"
                row-key="id"
                no-data-label="No data available"
              >
                <template v-slot:top-right>
                  <q-btn color="primary" label="Add Order" icon="add" flat />
                </template>
                <template #body="props">
                  <q-tr :v-bind="props">
                    <q-td key="lastname" style="font-size: 11px" align="left">
                      {{ props.row.lastname }}
                    </q-td>
                    <q-td key="firstname" style="font-size: 11px" align="left">
                      {{ props.row.firstname }}
                    </q-td>
                    <q-td key="middle_name" style="font-size: 11px" align="left">
                      {{ props.row.middlename }}
                    </q-td>
                    <q-td key="ext" style="font-size: 11px" align="left">
                      {{ props.row.ext }}
                    </q-td>
                    <q-td key="birthdate" style="font-size: 11px" align="left">
                      {{ props.row.birthdate }}
                    </q-td>
                    <q-td key="age" style="font-size: 11px" align="left">
                      {{ props.row.age }}
                    </q-td>
                    <q-td key="contact_number" style="font-size: 11px" align="left">
                      {{ props.row.contact_number }}
                    </q-td>
                    <q-td key="barangay" style="font-size: 11px" align="left">
                      {{ props.row.barangay }}
                    </q-td>

                    <q-td key="actions" style="font-size: 11px" align="center">
                      <q-btn
                        flat
                        color="primary"
                        @click="showClient(props.row.id)"
                        icon="description"
                        to="/customer"
                      />
                      <!-- <q-btn
                    flat
                    color="negative"
                    @click="showDeletepage(props.row.id)"
                    icon="delete"
                  /> -->
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useCustomerStore } from 'src/stores/customersStore'
export default {
  setup() {
    return {
      cols: [{
          name: 'lastname',
          label: 'Brandname',
          field: 'lastname',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'firstname',
          label: 'Generic Name',
          field: 'firstname',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'middlename',
          label: 'Dosage',
          field: 'middlename',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'ext',
          label: 'Quantity',
          field: 'ext',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'birthdate',
          label: 'Unit',
          field: 'birthdate',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'Actions',
          label: 'Actions',
          field: 'actions',
          align: 'center',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },],
    }
  },
  data() {
    return {
      rows: [],
      searchTerm: '',
      filteredList: [],
      customerList: [],
      costumer: {
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
  mounted() {
    // this.filteredList = this.peopleList
    this.get_clients()
  },
  methods: {
    async get_client(id) {
      await this.customerStore.getCustomer(id)
      this.costumer = this.customerStore.customer[0]
      console.table(this.customer)
      this.searchTerm = ''
    },
    async get_clients() {
      try {
        await this.customerStore.getCustomers()
        this.customerList = this.customerStore.customers //fetch all clients from array
        console.log(this.customerList)
      } catch (error) {
        console.log(error)
      }
    },
    show_id(id) {
      this.$q.notify({
        type: 'positive',
        message: `user id: ${id} is selected`,
        position: 'center',
        timeout: 1200,
      })
      console.log(id)
      this.searchTerm = ''
    },

    filterList() {
      if (!this.searchTerm) {
        this.filteredList = this.customerList
      } else {
        this.filteredList = this.customerList.filter((person) => {
          const fullName =
            `${person.firstname} ${person.middlename} ${person.lastname} ${person.ext}`.toLowerCase()
          return fullName.includes(this.searchTerm.toLowerCase())
        })
      }
    },
  },

  watch: {
    searchTerm(newValue) {
      if (newValue) {
        this.filteredList = this.customerList.filter((person) => {
          const fullName =
            `${person.firstname} ${person.middlename} ${person.lastname} ${person.ext}`.toLowerCase()
          return fullName.includes(newValue.toLowerCase())
        })
      } else {
        this.filteredList = []
      }
    },
  },
  computed: {
    customerStore() {
      return useCustomerStore()
    },
  },
}
</script>

<style scoped>
.q-item {
  transition: background-color 0.3s ease;
}

.q-item:hover {
  background-color: #f0f0f0; /* Example hover color */
  cursor: pointer;
}

.q-item.active {
  background-color: #ccc; /* Example active color */
}

.q-item.active:hover {
  background-color: #aaa; /* Example active hover color */
}
</style>
