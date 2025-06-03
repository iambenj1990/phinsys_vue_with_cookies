import { defineStore, acceptHMRUpdate } from 'pinia'
// import { api } from 'src/boot/axios'

export const useConfigurationsStore = defineStore('configurations', {
  state: () => ({
    // Add your state properties here
    set_items_low_notification : 0,
    set_day_expire_notification: 0,
    

  }),
  getters: {
    // Add your getters here
  },
  actions: {
    // Add your actions here
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigurationsStore, import.meta.hot))
};
