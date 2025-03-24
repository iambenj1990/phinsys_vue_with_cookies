import { defineStore } from 'pinia'

export const useTagumStore = defineStore('tagum', {
  state: () => ({
    // Define your state properties here
    barangay: [
      'APOKON',
      'BINCUNGAN',
      'BUSAON',
      'CANOCOTAN',
      'CUAMBOGAN',
      'LA FILIPINA',
      'LIBOGANON',
      'MADAUM',
      'MAGDUM',
      'MAGUGPO EAST',
      'MAGUGPO NORTH',
      'MAGUGPO POBLACION',
      'MAGUGPO SOUTH',
      'MAGUGPO WEST',
      'MANKILAM',
      'NEW BALAMBAN',
      'NUEVA FUERZA',
      'PAGSABANGAN',
      'PANDAPAN',
      'SAN AGUSTIN',
      'SAN ISIDRO',
      'SAN MIGUEL (CAMP 4)',
      'VISAYAN VILLAGE',
    ],
  }),
})
