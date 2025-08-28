<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div>
          <q-input
            ref="searchInput"
            v-model="searchTerm"
            label="Search by Name or Lastname"
            outlined
            @input="filterList"
            style="width: 100%"
          >
            <q-btn
              class="q-my-sm"
              style="
                background-color: lightskyblue;
                font-size: x-small;
                font-weight: bold;
                width: 130px;
              "
              label="Add Client"
              icon="add"
              @click="$router.push({ path: '/customer/releasing' })"
            />
          </q-input>

          <q-list class="q-pa-sm flex" style="width: 400px">
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
        <div>
          <q-btn
            class="q-my-sm"
            style="
              background-color: lightskyblue;
              font-size: x-small;
              font-weight: bold;
              width: 130px;
            "
            label="New Maifp Client"
            icon="add"
            @click="
              () => {
                show_maifp = true
                get_MaifpCustomers()
              }
            "
          />
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
                    class="full-width text-caption text-uppercase"
                    :readonly="isEditable"
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.firstname"
                    label="First name"
                    class="full-width text-caption text-uppercase"
                    :readonly="isEditable"
                  />
                </div>
                <div class="col-12 col-md-3 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.middlename"
                    label="Middle name"
                    class="full-width text-caption text-uppercase"
                    :readonly="isEditable"
                  />
                </div>
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.ext"
                    label="Ext"
                    class="full-width text-caption text-uppercase"
                    :readonly="isEditable"
                  />
                </div>
              </div>
              <div class="row q-gutter-sm">
                <div class="col-12 col-md-1 q-pa-sm">
                  <q-input
                    dense
                    v-model="costumer.gender"
                    label="Gender"
                    class="full-width text-caption text-uppercase"
                    :readonly="isEditable"
                  />
                </div>
                <div class="col-12 col-md-2 q-pa-sm text-caption">
                  <q-input
                    type="date"
                    dense
                    v-model="costumer.birthdate"
                    label="Birthdate"
                    class="full-width text-caption"
                    @change="calculateAge(costumer.birthdate)"
                    lazy-rules
                    :rules="[(val) => !!val || 'Birthdate is required']"
                    :readonly="isEditable"
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
                    class="full-width text-caption text-uppercase"
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
              <div class="text-caption text-weight-regular" style="color: grey">
                Transcation ID: {{ this.transaction_id }}
              </div>
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
                  <q-btn
                    :disable="this.transaction_id === 0"
                    color="primary"
                    label="Add Order"
                    icon="add"
                    flat
                    @click="getAvailableMedList()"
                  />
                </template>
                <template #body="props">
                  <q-tr :v-bind="props">
                    <q-td key="brand_name" style="font-size: 11px" align="left">
                      {{ props.row.brand_name }}
                    </q-td>
                    <q-td key="generic_name" style="font-size: 11px" align="left">
                      {{ props.row.generic_name }}
                    </q-td>
                    <q-td key="dosage" style="font-size: 11px" align="left">
                      {{ props.row.dosage }}
                    </q-td>
                    <q-td key="quantity" style="font-size: 11px" align="left">
                      {{ props.row.quantity }}
                    </q-td>
                    <q-td key="unit" style="font-size: 11px" align="left">
                      <!-- {{ props.row.unit }} -->
                      pcs
                    </q-td>
                    <q-td key="actions" style="font-size: 11px" align="center">
                      <q-btn
                        flat
                        color="red"
                        @click="()=>{
                          remove_maifp_order(props.row)
                          // remove_order(props.row.table_id_transactions)
                          }"
                        icon="remove_shopping_cart"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
              <div class="q-py-sm" align="right">
                <q-btn
                  color="primary"
                  label="Release Order"
                  icon="check"
                  @click="clearData()"
                  :disabled="rows.length == 0"
                />
              </div>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- SHOW AVAILABLE MEDICINES -->
    <q-dialog v-model="cartPrompt" persistent style="max-width: 1280px; width: 100%">
      <q-card style="max-width: 1280px; width: 100%">
        <div class="row q-gutter-md q-mb-md q-pa-md flex flex-center">
          <q-table
            :rows-per-page-options="[0]"
            :rows="availableMedsRow"
            :columns="cartCols"
            row-key="id"
            :visible-columns="[
              'generic_name',
              'brand_name',
              'dosage',
              'dosage_form',
              'unit',
              'quantity',
              'expiration_date',
            ]"
            :filter="filter"
            flat
            bordered
            style="
              max-width: 1180px;
              width: 100%;
              min-height: 300px;
              max-height: 500px;
              height: 100%;
            "
          >
            <template v-slot:top>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
                class="full-width q-px-md"
                style="background-color: lightgrey"
                ref="searchInput"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template #body="props">
              <q-tr :v-bind="props">
                <!-- <q-td key="po_no" style="font-size: 11px" align="center">
                {{ props.row.po_no }}
              </q-td> -->
                <q-td
                  key="generic_name"
                  style="
                    font-size: 11px;
                    white-space: normal;
                    word-break: break-word;
                    max-width: 300px;
                  "
                  align="left"
                  class="text-wrap"
                >
                  {{ props.row.generic_name }}
                </q-td>
                <q-td key="brand_name" style="font-size: 11px" align="left">
                  {{ props.row.brand_name }}
                </q-td>
                <q-td key="dosage" style="font-size: 11px" align="left">
                  {{ props.row.dosage }}
                </q-td>
                <q-td key="dosage_form" style="font-size: 11px" align="left">
                  {{ props.row.dosage_form }}
                </q-td>
                <!-- <q-td key="quantity" style="font-size: 11px" align="center">
                {{ props.row.quantity }}
              </q-td> -->
                <q-td key="Closing_quantity" style="font-size: 11px" align="left">
                  {{ props.row.Closing_quantity ? props.row.Closing_quantity : 0 }}
                </q-td>
                <q-td key="unit" style="font-size: 11px" align="left">
                  <!-- {{ props.row.dosage_form }} -->
                  pcs
                </q-td>

                <q-td key="expiration_date" style="font-size: 11px" align="left">
                  {{ props.row.expiration_date }}
                </q-td>

                <q-td key="status" style="font-size: 11px" align="left">
                  <q-badge
                    :style="{
                      backgroundColor:
                        props.row.Closing_quantity === 0
                          ? '#F44336'
                          : new Date(props.row.expiration_date) <= new Date()
                            ? '#F44336'
                            : '#9CCC65',
                    }"
                  >
                    <!-- {{  props.row.Closing_quantity ?'In Stock': 'Out of Stock'  }} -->
                    {{ getStockStatus(props.row) }}
                  </q-badge>
                </q-td>

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    rounded
                    color="primary"
                    style="background-color: orange"
                    @click="
                      () => {
                        showData(props.row)
                      }
                    "
                    icon="add_shopping_cart"
                    :disable="
                      !props.row.Closing_quantity
                        ? true
                        : new Date(props.row.expiration_date) <= new Date()
                          ? true
                          : false
                    "
                  />
                  <!-- <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" /> -->
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="cartPrompt = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- SHOW QUANTITY -->
    <q-dialog v-model="showQuantity" persistent style="max-width: 500px; width: 50%">
      <q-card style="max-width: 300px; width: 70%">
        <q-card-section>
          <pre style="color: darkslategray; font-weight: 900">Enter Quantity:</pre>
          <q-input
            v-model.trim="transactionDetails.quantity"
            label="Quantity"
            type="text"
            mask="#####"
            autofocus
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="grey"
            @click="
              () => {
                showQuantity = false
                filter = ''
                this.$refs.searchInput?.focus()
                this.transactionDetails.quantity = ''
              }
            "
          />
          <q-btn flat label="Add" color="primary" @click="add_Order(this.transactionDetails)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- SHOW ADD NEW CUSTOMER -->
    <q-dialog v-model="customerStore.closeNewCustomer" persistent>
      <q-card style="max-width: 900px; width: 100%; overflow: hidden; max-height: 660px">
        <newClients />
      </q-card>
    </q-dialog>

    <!-- SHOW ADD NEW MAIFP CUSTOMER -->
    <q-dialog v-model="show_maifp" style="height: 600px" persistent>
      <q-card style="max-width: 900px; width: 100%; overflow: hidden">
        <q-card-section>
          <div class="text-h6 text-green">New MAIFP Customer</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-table
            :rows="maifpDataRows"
            :columns="maifpCols"
            row-key="id"
            class="q-ma-xs"
            style="height: 500px"
            :visible-columns="[
              'lastname',
              'firstname',
              'middlename',
              'ext',
              'birthdate',
              'contact_number',
              'age',
              'gender',
              'barangay',
              'actions',
            ]"
          >
            <template #bottom>
              <q-tr>
                <q-td colspan="100%">
                  <q-btn
                    @click="add_maifp_customer(maifpDataRows)"
                    label="Get All MAIFP Customers"
                    color="primary"
                  />
                </q-td>
              </q-tr>
            </template>
            <template #body="props">
              <q-tr :v-bind="props">
                <!-- <q-td key="po_no" style="font-size: 11px" align="center">
                {{ props.row.po_no }}
              </q-td> -->
                <q-td
                  key="lastname"
                  style="
                    font-size: 11px;
                    white-space: normal;
                    word-break: break-word;
                    max-width: 300px;
                  "
                  align="left"
                  class="text-wrap"
                >
                  {{ props.row.lastname }}
                </q-td>
                <q-td key="firstname" style="font-size: 11px" align="left">
                  {{ props.row.firstname }}
                </q-td>
                <q-td key="middlename" style="font-size: 11px" align="left">
                  {{ props.row.middlename }}
                </q-td>
                <q-td key="ext" style="font-size: 11px" align="left">
                  {{ props.row.ext }}
                </q-td>
                <q-td key="birthdate" style="font-size: 11px" align="left">
                  {{ props.row.birthdate }}
                </q-td>
                <q-td key="contact_number" style="font-size: 11px" align="left">
                  {{ props.row.contact_number }}
                </q-td>
                <q-td key="age" style="font-size: 11px" align="left">
                  {{ props.row.age }}
                </q-td>
                <q-td key="gender" style="font-size: 11px" align="left">
                  {{ props.row.gender }}
                </q-td>
                <!-- <q-td key="is_not_tagum" style="font-size: 11px" align="left">
                  {{ props.row.is_not_tagum }}
                </q-td>
                <q-td key="street" style="font-size: 11px" align="left">
                  {{ props.row.street }}
                </q-td>
                <q-td key="purok" style="font-size: 11px" align="left">
                  {{ props.row.purok }}
                </q-td> -->
                <q-td key="barangay" style="font-size: 11px" align="left">
                  {{ props.row.barangay }}
                </q-td>
                <!-- <q-td key="city" style="font-size: 11px" align="left">
                  {{ props.row.city }}
                </q-td>
                <q-td key="province" style="font-size: 11px" align="left">
                  {{ props.row.province }}
                </q-td>
                <q-td key="category" style="font-size: 11px" align="left">
                  {{ props.row.category }}
                </q-td>
                <q-td key="is_pwd" style="font-size: 11px" align="left">
                  {{ props.row.is_pwd }}
                </q-td>
                <q-td key="is_solo" style="font-size: 11px" align="left">
                  {{ props.row.is_solo }}
                </q-td> -->

                <q-td key="actions" style="font-size: 11px" align="center">
                  <q-btn
                    flat
                    rounded
                    color="primary"
                    icon="save"
                    @click="
                      () => {
                        console.log(props.row)
                        this.add_maifp_individual(props.row)
                      }
                    "
                  >
                    <q-tooltip> Save </q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    rounded
                    color="green"
                    icon="done"
                    @click="
                      () => {
                        console.log(props.row)
                        console.log(props.row.transaction[0].id.toString())
                        this.status_done_maif(
                          props.row.transaction[0].transaction_number.toString(),
                        )
                      }
                    "
                  >
                    <q-tooltip> Done </q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="q-mx-md" @click="show_maifp = false" label="Close" color="negative" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useCustomerStore } from 'src/stores/customersStore'
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
import newClients from 'src/pages/NewClientsReleasing.vue'
export default {
  components: {
    newClients,
  },
  setup() {
    const customerStore = useCustomerStore()
    return {
      customerStore,
      maifpCols: [
        {
          name: 'lastname',
          label: 'Last Name',
          field: 'lastname',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'firstname',
          label: 'First Name',
          field: 'firstname',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'middlename',
          label: 'Middle Name',
          field: 'middlename',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'ext',
          label: 'Extension',
          field: 'ext',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'birthdate',
          label: 'Birthdate',
          field: 'birthdate',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'contact_number',
          label: 'Contact Number',
          field: 'contact_number',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'age',
          label: 'Age',
          field: 'age',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'gender',
          label: 'Gender',
          field: 'gender',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        // {
        //   name: 'is_not_tagum',
        //   label: 'From Tagum',
        //   field: 'is_not_tagum',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'street',
        //   label: 'Street',
        //   field: 'street',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'purok',
        //   label: 'Purok',
        //   field: 'purok',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        {
          name: 'barangay',
          label: 'Barangay',
          field: 'barangay',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        // {
        //   name: 'city',
        //   label: 'City',
        //   field: 'city',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'province',
        //   label: 'Province',
        //   field: 'province',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'category',
        //   label: 'Category',
        //   field: 'category',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'is_pwd',
        //   label: 'PWD',
        //   field: 'is_pwd',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        // {
        //   name: 'is_solo',
        //   label: 'Solo Parent',
        //   field: 'is_solo',
        //   sortable: true,
        //   align: 'left',
        //   headerClasses: 'bg-grey-7 text-white',
        //   headerStyle: 'font-size: 1.2 em',
        // },
        {
          name: 'actions',
          label: 'Actions',
          sortable: true,
          align: 'center',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
      ],
      cols: [
        {
          name: 'brand_name',
          label: 'Brandname',
          field: 'brand_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'generic_name',
          label: 'Generic Name',
          field: 'generic_name',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'dosage',
          label: 'Dosage',
          field: 'dosage',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },
        {
          name: 'quantity',
          label: 'Quantity',
          field: 'quantity',
          sortable: true,
          align: 'left',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2 em',
        },

        {
          name: 'unit',
          label: 'Unit',
          field: 'unit',
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
        },
      ],

      cartCols: [
        {
          name: 'generic_name',
          required: true,
          label: 'Generic Name',
          align: 'left',
          field: 'generic_name',
          sortable: true,
        },
        {
          name: 'brand_name',
          required: true,
          label: 'Brand Name',
          align: 'left',
          field: 'brand_name',
          sortable: true,
        },
        {
          name: 'dosage',
          required: true,
          label: 'Dosage',
          align: 'left',
          field: 'dosage',
          sortable: true,
        },
        {
          name: 'dosage_form',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'dosage_form',
          sortable: true,
        },

        {
          name: 'Closing_quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'remaining_quantity',
          format: (val) => (val ? val : 0), // If empty, set to 0
          sortable: true,
        },

        {
          name: 'unit',
          required: true,
          label: 'Unit',
          align: 'left',
          field: 'unit',
          sortable: true,
        },

        {
          name: 'expiration_date',
          required: true,
          label: 'Expiration Date',
          align: 'left',
          field: 'expiration_date',
          sortable: true,
        },

        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: true,
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
          field: 'actions',
          sortable: true,
        },
      ],
    }
  },
  data() {
    return {
      itemPrice: 0,
      show_maifp: false,
      maifpDataRows: [],
      maif_latest_transaction: '',
      unit_per_piece: ['pcs', 'bottle', 'sachet', 'vial', 'ampule'],
      selectedMedicine: {},
      selectedMedicineQty: 0,
      isEditable: true,
      selectedClient_id: 0,
      transaction_id: '',
      filter: '',
      cartPrompt: false,
      showQuantity: false,
      availableMedsRow: [],
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

      transactionDetails: {
        transaction_id: '',
        customer_id: 0,
        transaction_date: 0,
        item_id: 0,
        quantity: 0,
        user_id: 0,
      },

      itemsData: {
        item_name: '',
        item_amount: 0,
      },
    }
  },
  mounted() {
    this.get_clients()

  },
  methods: {

    async status_done_maif(transaction_id) {
      try {
        console.log('setting maif transaction status to done for id:', transaction_id)
        const payload = {
          transaction_id: transaction_id,
          status: 'Done'
        }
        console.log('setting maif transaction status to done for payload:', payload)
        await this.transactionStore.maif_medication_status(payload)
        await this.get_MaifpCustomers()
      } catch (error) {
        console.log(error)
      }

    },

    async show_stock_name_amount(payload) {
      try {
        console.log('getting stock name and amount for id:', payload)
        await this.itemStore.get_Name_Amount(payload)
        this.itemsData.item_name = this.itemStore.item_name
        this.itemsData.item_amount = parseFloat(Number(this.itemStore.item_amount).toFixed(2))

        console.log('stock name and amount retrieved:', this.itemsData)
      } catch (error) {
        console.log(error)
      }
    },

    clearData() {


      if (this.costumer.origin === 'MAIFP') {
        this.status_done_maif(this.transaction_id)
      }

      this.costumer = {}
      this.transaction_id = 0
      this.rows = []

      this.$q.notify({
        type: 'positive',
        message: `Order submitted`,
        position: 'center',
        timeout: 1200,
      })

      this.$refs.searchInput.focus()
    },
    getStockStatus(row) {
      if (!row.Closing_quantity) {
        return 'Out of Stock'
      }
      const expirationDate = new Date(row.expiration_date)
      const today = new Date()
      // Optional: reset time to 00:00:00 for date-only comparison
      expirationDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      return expirationDate <= today ? 'Expired' : 'In Stock'
    },

    async remove_order(id) {
      await this.transactionStore.remove_order(id)
      this.getOrders(this.transaction_id)
      this.$q.notify({ type: 'positive', message: 'order removed successful!' })
    },

    async remove_maifp_order(payload){
      try {
        console.log('removing maifp order for payload:', payload)
      //  await this.transactionStore.remove_maifp_order(payload)
        //await this.get_MaifpCustomers()
      } catch (error) {
        console.log(error)
      }
    },

    showData(payload) {
      if (!payload.Openning_quantity && !payload.Closing_quantity) {
        this.$q.notify({ type: 'negative', message: 'Cannot add item Stocks still closed!' })
        return
      }

      this.selectedMedicineQty = payload.Closing_quantity ? payload.Closing_quantity : 0
      this.transactionDetails.transaction_id = this.transaction_id
      this.transactionDetails.customer_id = this.selectedClient_id
      this.transactionDetails.transaction_date = new Date().toLocaleDateString('en-CA')
      this.transactionDetails.item_id = payload.item_id
      this.transactionDetails.unit = payload.dosage_form
      this.transactionDetails.user_id = this.GetUserID()
      this.showQuantity = true
    },

    async getOrders(transaction_id) {
      await this.transactionStore.getTransactionOrders(transaction_id)
      this.rows = this.transactionStore.customerTransactions
    },

    async add_Order(payload) {

      payload.quantity = Number(payload.quantity)
      this.showQuantity = false

      if (payload.quantity > this.selectedMedicineQty) {
        this.$q.notify({
          type: 'negative',
          message: `Quantity cannot be greater than ${this.selectedMedicineQty}`,
          position: 'center',
        })
        this.transactionDetails.quantity = ''
        this.filter = ''
        this.$refs.searchInput?.focus()
        return
      }

      await this.transactionStore.newTransaction(payload)

      if (this.costumer.origin === 'MAIFP') {
          console.log('selected item id: ',payload.item_id)
        console.log('selected medicine: => ',this.selectedMedicine)
        await this.show_stock_name_amount({id:payload.item_id})

        const medication_details = {
          item_description: this.itemsData.item_name,
          patient_id: this.costumer.maifp_id,
          quantity: payload.quantity,
          unit: 'pcs',
          transaction_date: payload.transaction_date,
          amount: this.itemsData.item_amount,
          transaction_id: this.transaction_id,
        }
        console.log('medication details to be sent to maifp db => ', medication_details)
       await this.transactionStore.throw_maif_medication_to_db(medication_details)
      }
      this.getAvailableMedList()
      this.getOrders(payload.transaction_id)
      this.transactionDetails.quantity = ''
      this.filter = ''
      this.$refs.searchInput?.focus()

      //  this.$q.notify({ type: 'positive', message: 'order added successful!' })
    },

    async getNewTransactionID(id) {
      await this.transactionStore.newTransactionID(id)
      this.transaction_id = this.transactionStore.newCustomerTransactionID
    },

    async getAvailableMedList() {
      this.cartPrompt = true
      await this.itemStore.getJoinedTable_DailyInventor_Items_filtered()

      this.availableMedsRow = this.itemStore.items
    },
    async get_client(id) {
      this.selectedClient_id = id
      //console.log(id)
      await this.customerStore.getCustomer(id)
      this.costumer = this.customerStore.customer
      this.searchTerm = ''

      if (this.costumer.origin === 'MAIFP') {

       await this.get_maif_latest_transaction({ patient_id: this.costumer.maifp_id })
         console.log('get client transaction id => ',this.maif_latest_transaction)
        this.transaction_id = this.maif_latest_transaction
        console.log(this.transaction_id)
      } else {
        this.getNewTransactionID(id)
      }
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

    async add_maifp_individual(payload){
      try {
           const new_customer = { ...payload, origin: 'MAIFP', maifp_id: payload.id.toString() }
          delete new_customer.id
          await this.customerStore.newCustomer(new_customer)

      } catch (error) {
       console.error('Error adding MAIFP customers:', error)
        this.$q.notify({
          type: 'negative',
          message: `Error adding MAIFP Customers.`,
          position: 'center',
          timeout: 1200,
        })
      }

    },
    async add_maifp_customer(payload) {
      try {
        for (const customer of payload) {
          const new_customer = { ...customer, origin: 'MAIFP', maifp_id: customer.id.toString() }
          delete new_customer.id
          await this.customerStore.newCustomer(new_customer)
        }
        this.show_maifp = false
        this.customerStore.customer_id = 0
        this.get_clients()
      } catch (error) {
        console.error('Error adding MAIFP customers:', error)
        this.$q.notify({
          type: 'negative',
          message: `Error adding MAIFP Customers.`,
          position: 'center',
          timeout: 1200,
        })
      }
    },

    async get_maif_latest_transaction(payload) {
      try {
        await this.customerStore.latest_Maifp_trx(payload)

        this.maif_latest_transaction = this.customerStore.customer_maifp_latest_trx
        console.log('get maifp latest transaction => ',this.maif_latest_transaction)
      } catch (error) {
        console.error('Error fetching MAIFP latest transaction:', error)
      }
    },

    async get_MaifpCustomers() {
      try {
        await this.customerStore.ShowMaifpCustomers()
        this.maifpDataRows = this.customerStore.customer_maifp
        console.log(this.maifpDataRows)
      } catch (error) {
        console.error('Error fetching MAIFP customers:', error)
      }
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

    GetUserID() {
      const unsanitized_object = localStorage.getItem('user')
      const sanitized_object = unsanitized_object.replace('__q_objt|', '')
      const user = JSON.parse(sanitized_object)
      return user.id
    },
  },

  watch: {
    'customerStore.customer_id'(value) {
      this.get_client(value)
    },

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

    'costumer.birthdate'(newBirthdate) {
      this.costumer.age = this.calculateAge(newBirthdate)
    },

    'costumer.age'(age) {
      if (age < 18) {
        this.costumer.category = 'Children'
        this.children = true
        this.adult = false
        this.senior = false
      } else if (age >= 18 && age < 60) {
        this.costumer.category = 'Adult'
        this.adult = true
        this.children = false
        this.senior = false
      } else if (age >= 60) {
        this.costumer.category = 'Senior'
        this.senior = true
        this.children = false
        this.adult = false
      }
    },
  },
  computed: {
    itemStore() {
      return useItemStore()
    },
    transactionStore() {
      return useTransactionStore()
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
.bg-gray {
  background-color: lightgray;
}
</style>
