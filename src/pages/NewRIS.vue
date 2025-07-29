<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg">
      <div class="text-green text-h6 q-mb-sm">Requisition and Issuance Slip</div>
      <q-separator />
      <q-card-section>
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <div>
            <q-input filled label="RIS NO." v-model="ris_no" readonly class="q-mb-md" />
            <q-input filled label="Purpose" v-model="purpose" type="textarea" class="q-mb-md" />
          </div>
          <div class="row justify-end">
            <q-btn type="submit" color="green" label="Proceed" />
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-table row-key="id" :rows="rows" :columns="cols" :rows-per-page-options="[0]">
          <template #top-right>
            <q-btn
              flat
              type="button"
              label="Items"
              class="text-subtitle2 text-green"
              icon="shopping_cart"
            />
          </template>
          <template #body="props">
            <q-tr :v-bind="props">
              <q-td key="po_no" style="font-size: 11px" align="left">
                {{ props.row.po_no }}
              </q-td>
              <q-td
                key="generic_name"
                style="
                  font-size: 11px;
                  white-space: normal;
                  word-break: break-word;
                  max-width: 200px;
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
               <q-td key="dosage" style="font-size: 11px" align="left">
                {{ props.row.dosage }}
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <q-card-actions align="right">
          <q-btn
            color="green"
            type="button"
            label="Save"
            class="text-subtitle2 text-white q-pa-md q-mt-md"
            icon="save"
            style="width: 110px"
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
               style="background-color: lightgrey;"
                ref="searchInput"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template #body="props">
              <q-tr :v-bind="props" >
                <!-- <q-td key="po_no" style="font-size: 11px" align="center">
                {{ props.row.po_no }}
              </q-td> -->
                <q-td key="generic_name" style="font-size: 11px;white-space: normal; word-break: break-word; max-width: 300px;" align="left" class="text-wrap" >
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
                  {{props.row.expiration_date }}
                </q-td>

                <q-td key="status" style="font-size: 11px" align="left">
                  <q-badge  :style="{ backgroundColor: props.row.Closing_quantity === 0 ? '#F44336' : new Date(props.row.expiration_date) <= new Date() ? '#F44336' : '#9CCC65' }">
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
                    @click="()=>{
                      showData(props.row)

                    }"
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
          <q-btn flat label="Cancel" color="grey" @click="()=>{showQuantity = false
              filter = ''
              this.$refs.searchInput?.focus()
              this.transactionDetails.quantity = ''
          }" />
          <q-btn flat label="Add" color="primary" @click="add_Order(this.transactionDetails)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useTransactionStore } from 'src/stores/transactionStore'

export default {

  setup() {
    const itemStore = useItemStore()
    const TransactionStore = useTransactionStore()
    return {
      itemStore,
      TransactionStore,
      cols: [
        {
          name: 'item_no',
          required: true,
          label: 'Item No',
          align: 'left',
        },

        {
          name: 'units',
          required: true,
          label: 'Units',
          align: 'left',
          field: 'units',
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
        },
      ],
    }
  },
  data() {
    return {
      ris_no: '',
      purpose: '',
      rows: [],
      showQuantity: false,
      cartPrompt: false,

    }
  },
  methods: {
    submitForm() {},
  },
  mounted() {
    this.ris_no = '20250729-00001'
  },
}
</script>
