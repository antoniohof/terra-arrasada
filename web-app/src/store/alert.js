import store from './index' // eslint-disable-line no-unused-vars

const state = {
  alert: {
    isOpen: false,
    args: Object
  }
}

const actions = {
  openAlert ({commit}, args) {
    commit('set_alert_open', args)
  },
  closeAlert ({commit}) {
    commit('set_alert_closed')
  }
}

const mutations = {
  set_alert_open (state, args) {
    state.alert.isOpen = true
    state.alert.args = args
    if (state.alert.timeout) clearTimeout(state.alert.timeout)
    if (args.duration !== null && args.duration !== undefined) {
      state.alert.timeout = setTimeout(function () {
        store.dispatch('closeAlert')
      }, args.duration)
    }
  },
  set_alert_closed (state) {
    state.alert.isOpen = false
  }
}

const getters = {
  isAlertOpen (state) {
    return state.alert.isOpen
  },
  getAlertArgs (state) {
    return state.alert.args
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
