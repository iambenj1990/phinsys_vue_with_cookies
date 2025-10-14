<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card class="q-pa-sm" style="max-width: 1820px; width: 100%">
        <div class="row q-gutter-md">
          <div class="col-12 q-pt-md q-px-md">
            <div align="left" class="text-h6 text-primary text-weight-regular">
              Items Information Adjustment
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex flex-center">
          <q-circular-progress indeterminate size="90px" color="primary" />
        </div>
        <div v-else class="row q-gutter-md">
          <div class="col-12 col-md-12 q-pa-sm">
            <q-table
              :rows="rows"
              :columns="cols"
              row-key="id"
              :filter="filter"
              flat
              bordered
              class="q-mr-md"
              style="min-height: 500px; max-height: 1000px; height: 100%"
              v-model:pagination="pagination"
            >
              <template v-slot:top-left>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  class="full-width"
                  style="width: 300px"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <!-- <template v-slot:top-right>
                <q-btn flat label="Close Stocks" color="grey" @click="closeStock()" />
                <q-btn
                  flat
                  label="Open Stocks"
                  class="q-mx-sm"
                  color="green"
                  @click="openStock()"
                />
              </template> -->

              <template #body="props">
                <q-tr :v-bind="props">
                  <q-td key="id" style="font-size: 11px" align="left">
                    {{ (pagination.page - 1) * pagination.rowsPerPage + props.pageIndex + 1 }}
                  </q-td>
                  <q-td key="po_no" style="font-size: 11px" align="center" class="text-weight-bold">
                    {{ props.row.po_no }}
                  </q-td>
                  <q-td
                    key="item_count"
                    style="font-size: 11px"
                    align="center"
                    class="text-weight-bold"
                  >
                    {{ props.row.items_count }}
                  </q-td>

                  <q-td key="actions" style="font-size: 11px" align="center">
                    <q-btn
                      flat
                      color="primary"
                      icon="list"
                      @click="
                        () => {
                          console.log('Adjust items under PO No:', props.row.po_no)
                          itemStore.selected_po = props.row.po_no
                          showListing = true
                        }
                      "
                    >
                      <q-tooltip> Adjustment </q-tooltip>
                    </q-btn>
                    <!-- <q-btn flat color="negative" @click="show_deletePrompt(props.row)" icon="delete" /> -->
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
      <q-dialog persistent v-model="showListing">
        <q-card style="max-width: 1200px; width: 100%">
          <updateItems />
          <q-card-actions align="right">
            <q-btn
              color="red"
              class="q-px-md"
              label="Back"
              @click="
                () => {
                  showListing = false
                  this.get_items_under_po()
                }
              "
              style="width: 100px"
              size="md"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import updateItems from 'src/pages/UpdateItems.vue'

export default {
  components: {
    updateItems,
  },
  computed: {},
  setup() {
    const itemStore = useItemStore()
    return {
      itemStore,

      cols: [
        {
          name: 'id',
          required: true,
          label: '#',
          align: 'left',
        },
        {
          name: 'po_no',
          required: true,
          label: 'PO No',
          align: 'center',
          field: 'po_no',
        },

        {
          name: 'item_count',
          required: true,
          label: 'No. of Items',
          align: 'center',
          field: 'item_count',
        },
        {
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'center',
          field: 'actions',
        },
      ],
    }
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      showListing: false,
      loading: false,
      filter: '',
      rows: [],
    }
  },

  methods: {
    async get_items_under_po() {
      this.loading = true
      await this.itemStore.get_PO_items()
      this.rows = this.itemStore.po_list
      this.loading = false
    },
  },
  mounted() {
    this.get_items_under_po()
  },
  watch: {},
}
</script>
