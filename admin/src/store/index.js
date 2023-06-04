import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },
    state: {
        Sidebar_drawer: '',
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: ''
      },
    mutations: {
        SET_SIDEBAR_DRAWER (state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER (state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR (state, payload) {
            state.SidebarColor = payload
        }, 
    },
    actions: {

    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
