import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useAuditStore = defineStore('audit', {
  state: () => ({
    logs: [],
    log_details: {},
    selected_id: null,
    selected_log_id: null,
  }),

  actions: {
    async AllLogs() {
      try {
        const response = await api.get('/api/logs')
            console.log('Fetched logs:', response.data);
        this.logs = response.data.logs
        console.log('Fetched logs:', this.logs)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error fetching logs: ' + error.message,
        })
      }
    },


  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuditStore, import.meta.hot))
}
