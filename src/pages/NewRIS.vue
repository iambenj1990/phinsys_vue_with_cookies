<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg">
      <div class="text-green text-h6 q-mb-sm">Requisition and Issuance Slip</div>
      <q-separator />
      <q-card-section>
        <q-form @submit.prevent="lookforOpen()" class="q-gutter-md">
          <div>
            <!-- <q-input filled label="RIS NO." v-model="ris_no" readonly class="q-mb-md" /> -->
            <q-input
              filled
              label="Purpose"
              v-model="form.purpose"
              type="textarea"
              required
              class="q-mb-md"
              ref="purpose"
            />
          </div>
          <div class="row justify-end">
            <q-btn type="submit" color="green" label="Proceed" v-if="moduleAccess('RIS','add')"/>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-table row-key="id" :rows="rows" :columns="cols" :rows-per-page-options="[0]">
          <template #top-left>
            <div class="text-green text-weight-bold text-subtitle1">CONTROL NO: {{ ris_no }}</div>
          </template>
          <template #top-right>
            <q-btn
            v-if="moduleAccess('RIS','add')"
              flat
              type="button"
              label="Items"
              class="text-subtitle2 text-green"
              icon="shopping_cart"
              @click="getAvailableMedList()"
              :disable="!hasRIS_ID"
            />
          </template>
          <template #body="props">
            <q-tr :v-bind="props">
              <q-td key="item_no" style="font-size: 11px" align="left">
                {{ props.pageIndex + 1 }}
              </q-td>
              <q-td
                key="unit"
                style="
                  font-size: 11px;
                  white-space: normal;
                  word-break: break-word;
                  max-width: 200px;
                "
                align="left"
                class="text-wrap"
              >
                {{ props.row.dosage_form }}
              </q-td>
              <q-td key="description" style="font-size: 11px" align="left">
                {{ props.row.generic_name }}
              </q-td>

              <q-td key="quantity" style="font-size: 11px" align="left">
                {{ props.row.quantity }} pcs
              </q-td>

              <q-td key="actions" style="font-size: 11px" align="left">
                <q-btn
                v-if="moduleAccess('RIS','delete')"
                  flat
                  color="negative"
                  @click="getSelectedDataToDelete(props.row.table_id_transactions)"
                  icon="delete"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <q-card-actions align="right">
          <q-btn
            v-if="moduleAccess('RIS','add')"
            color="green"
            type="button"
            label="Save"
            class="text-subtitle2 text-white q-pa-md q-mt-md"
            icon="save"
            style="width: 110px"
            @click="clearData()"
            :disable="isButtonDisabled"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>

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
                  v-if="moduleAccess('RIS','add')"
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
                  <!-- <q-btn flat color="negative" @click="getSelectedDataToDelete(props.row)" icon="delete" /> -->
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
          <q-btn flat label="Add" color="primary" @click="add_Order(this.transactionDetails)" v-if="moduleAccess('RIS','add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showRemoveItem" persistent style="max-width: 500px; width: 50%">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-green">Proceed to remove this from the order list?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="q-px-md"
            label="Yes"
            color="blue"
            style="width: 150px"
            @click="remove_order(selected_to_delete)"
            v-if="moduleAccess('RIS','delete')"
          ></q-btn>
          <q-btn
            label="cancel"
            color="red"
            style="width: 150px"
            @click="showRemoveItem = false"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'
import { useRequisitionIssuanceSlip } from 'src/stores/RequisitionIssuanceSlip'
import { useUserStore } from 'src/stores/userStore'

export default {
  setup() {
    const risStore = useRequisitionIssuanceSlip()
    const itemStore = useItemStore()
    const TransactionStore = useTransactionStore()
    const userStore = useUserStore()
    return {
      risStore,
      itemStore,
      TransactionStore,
      userStore,
      cols: [
        {
          name: 'item_no',
          required: true,
          label: 'Item No',
          align: 'left',
        },

        {
          name: 'unit',
          required: true,
          label: 'Units',
          align: 'left',
          field: 'unit',
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
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
      Credentials: [],
      user: {},
      showRemoveItem: false,
      hasOpentransaction: false,
      selected_to_delete: 0,
      ris_no: '',
      ris_id: 0,
      purpose: '',
      rows: [],
      availableMedsRow: [],
      showQuantity: false,
      cartPrompt: false,
      searchTerm: '',
      filter: '',
      filteredList: [],
      transaction_id: '',
      form: {
        purpose: '',
      },

      transactionDetails: {
        transaction_id: '',
        customer_id: 0,
        transaction_date: 0,
        item_id: 0,
        quantity: 0,
        user_id: 0,
      },
    }
  },
  methods: {
    async lookforOpen() {
      try {
        await this.itemStore.openLookup()
        this.hasOpentransaction = this.itemStore.hasOpening

        if (this.hasOpentransaction == false) {
          // this.$router.push({ path: '/customers/orders/new' })

          await this.risStore.newRIS(this.form)
          this.ris_no = this.risStore.return_ris_id
          this.ris_id = this.risStore.return_id
          console.log('ris_no => ', this.ris_no, '    ris_id => ', this.ris_id)
        } else {
          this.$q.notify({
            type: 'negative',
            message:
              'Unable to proceed, Please Coordinate with personnel incharge to Open Inventory!',
            position: 'center',
            timeout: 2500,
          })
          return
        }
      } catch (error) {
        console.log(error)
      }
    },

    clearData() {
      this.ris_id = ''
      this.ris_no = 0
      this.rows = []
      this.form.purpose = ''

      this.$q.notify({
        type: 'positive',
        message: `Order submitted`,
        position: 'center',
        timeout: 1200,
      })

      this.$router.back()
    },

    async remove_order(id) {
      await this.TransactionStore.remove_order(id)
      this.getOrders(this.ris_no)
      this.showRemoveItem = false

      this.$q.notify({ type: 'positive', message: 'order removed successful!' })
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

    async getAvailableMedList() {
      this.cartPrompt = true
      // await this.itemStore.getJoinedTable_DailyInventor_Items_filtered()
      await this.itemStore.getJoinedTable_DailyInventor_Items()

      this.availableMedsRow = this.itemStore.items
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

      await this.TransactionStore.newTransaction(payload)
      this.getAvailableMedList()

      this.getOrders(payload.transaction_id)
      this.transactionDetails.quantity = ''
      this.filter = ''
      this.$refs.searchInput?.focus()

      //  this.$q.notify({ type: 'positive', message: 'order added successful!' })
    },

    showData(payload) {
      if (!payload.Openning_quantity && !payload.Closing_quantity) {
        this.$q.notify({ type: 'negative', message: 'Cannot add item Stocks still closed!' })
        return
      }

      this.selectedMedicineQty = payload.Closing_quantity ? payload.Closing_quantity : 0

      console.log('show quantity => ', this.selectedMedicineQty)
      console.log('ris_no => ', this.ris_no, '    ris_id => ', this.ris_id)

      this.transactionDetails.transaction_id = this.ris_no
      this.transactionDetails.customer_id = parseInt(this.ris_id)
      this.transactionDetails.transaction_date = new Date().toLocaleDateString('en-CA')
      this.transactionDetails.item_id = payload.item_id
      this.transactionDetails.unit = payload.dosage_form
      this.transactionDetails.user_id = this.user.id
      // console.log(payload)
      // console.log(this.transactionDetails)
      this.showQuantity = true
    },

    async getOrders(transaction_id) {
      await this.TransactionStore.getTransactionOrders(transaction_id)
      this.rows = this.TransactionStore.customerTransactions
    },

    async GetAuthenticatedUser() {
      await this.userStore.authenticatedUserCheck()
      this.user = this.userStore.user
      this.Credentials = this.userStore.credentials
    },
    moduleAccess(label, type) {
      const access = this.Credentials.find((module) => module.module === label)
      console.log(access)
      if (type === 'view') return access ? access.view : false
      if (type === 'add') return access ? access.add : false
      if (type === 'edit') return access ? access.edit : false
      if (type === 'delete') return access ? access.delete : false
      if (type === 'export') return access ? access.export : false
    },

    getSelectedDataToDelete(id) {
      console.log(id)
      this.selected_to_delete = id
      this.showRemoveItem = true
    },
  },
  mounted() {
    this.GetAuthenticatedUser()
  },

  computed: {
    hasRIS_ID() {
      return this.ris_no !== '' && this.ris_no !== null
    },
    isButtonDisabled() {
      return this.rows.length === 0
    },
  },
}
</script>
