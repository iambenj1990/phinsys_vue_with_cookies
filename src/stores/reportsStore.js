import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useReportsStore = defineStore('reports', {
  state: () => ({
    // Define your initial state here
    reports: [],
    monthly_dispense:[]
  }),
  getters: {
    // Define your getters here
    totalReports: (state) => state.reports.length,
  },
  actions: {
    // Define your actions here
    async MonthlyDispenseReports() {
      try {
        const response = await api.get('/api/reports/dispense/monthly');
        this.monthly_dispense = response.data.dispense;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
