import state from './state'
import getters from './getters'
import actions from './actions'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state,
  getters,
  actions,
})
