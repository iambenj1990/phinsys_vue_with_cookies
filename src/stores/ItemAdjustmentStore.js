import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useItemAdjustmentStore = defineStore('itemAdjustment', {
  state: () => ({
    selectedItemDescription:'',
    currentItemQuantity:0,
    adjustmentTypeList:[],
    
  }),

  getters: {
    
  },

  actions: {
    async getSelectedItemDescription(payload) {
        try{
        const response = await api.get(`api/items/adjustment/${payload}`);
        this.selectedItemDescription = response.data.item_description;
        this.currentItemQuantity = response.data.current_stock_quantity[0].Closing_quantity;

        console.log('Current Item Quantity:', this.currentItemQuantity);

        }catch(error){
            this.$q.notify({
                type: 'negative',
                message: 'Failed to fetch item details. ' + error.message, 
                timeout: 3000,
              });  
        }
    },

    async getAdjustmentType(){
      try {
        const response = await api.get(`api/system/list/types`)
        this.adjustmentTypeList = response.data.adjustmentType
        
      } catch (error) {
         this.$q.notify({
                type: 'negative',
                message: 'Failed to fetch item details. ' + error.message, 
                timeout: 3000,
              });  
      }
    }
  
  },

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemAdjustmentStore, import.meta.hot))
}
