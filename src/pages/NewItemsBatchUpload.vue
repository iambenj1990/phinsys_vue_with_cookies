<template>
  <q-page>

  </q-page>
</template>

<script>
import { useItemStore } from 'src/stores/itemsStore'
import { useLoginStore } from 'src/stores/loginSessionStore'



export default {
  watch: {

  },

  created() {


  },

  computed: {
    itemStore() {
      return useItemStore()
    },
    sessionStore() {
      return useLoginStore()
    },
  },
  setup() {

    return {

      defaultValues: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        box_quantity: 0,
        quantity_per_box: 0,
        price: 0,
        expiration_date: '',
        user_id: 0,
      },
      columns: [


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
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
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
          name: 'price',
          required: true,
          label: 'Price',
          align: 'left',
          field: 'price',
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
          name: 'actions',
          required: true,
          label: 'Actions',
          align: 'left',
          field: 'actions',
          sortable: true,
        },
      ],
    }
  },
  data() {
    return {

      MedicineInfo: {
        po_no: '',
        brand_name: '',
        generic_name: '',
        dosage: '',
        dosage_form: '',
        category: 'N/A',
        unit: '',
        quantity: '',
        box_quantity: 0,
        quantity_per_box: 0,
        price: 0,
        price_per_pcs: 0,
        expiration_date: '',
        user_id: 0,
      },


    }
  },

  methods: {

    GetUserID(){
      const unsanitized_object = localStorage.getItem('user')
      const sanitized_object = unsanitized_object.replace('__q_objt|', '')
      const user = JSON.parse(sanitized_object)
      return user.id
    },



  },


}
</script>

<style>

</style>
