import { defineStore } from 'pinia'
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

export const useRequisitionIssuanceSlip = defineStore('ris', {
  state: () => ({
    return_id:0,
    return_ris_id:''
  }),

  actions:{


    async newRIS (payload){

      try {
        const response = await api.post('/daily/ris/new',payload)
        this.return_ris_id = response.data.ris_id
        this.return_id = response.data.id

         Notify.create({
          type: 'positive',
          message: response.data.message,
          position: 'center',
          timeout: 1500,
        })
      } catch (error) {
        console.log(error)
         Notify.create({
          type: 'negative',
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          position: 'center',
          timeout: 5000,
        })
      }
    }

  }

})
