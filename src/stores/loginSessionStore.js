import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLoginSessionStore = defineStore('loginsession', {
  state: () => ({
    userdata:{},
  }),

  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },

  actions: {
    // increment() {
    //   this.counter++
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginSessionStore, import.meta.hot))
}
