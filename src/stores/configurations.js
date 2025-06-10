import { defineStore, acceptHMRUpdate } from 'pinia'
// import { api } from 'src/boot/axios'

export const useConfigurationsStore = defineStore('configurations', {
  state: () => ({
    // Add your state properties here
    selected_ID:'',
    normal_color :0,
    low_color: 0,
    empty_color: '',
    low_count: '',
    days_toExpire: '',
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
