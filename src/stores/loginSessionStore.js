import { defineStore, acceptHMRUpdate } from 'pinia'
// import { api } from 'src/boot/axios'


export const useLoginStore = defineStore('login', {
  state: () => ({
    
    counter: 0,
    user_id: 0,
  }),

  actions:{}

})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}


