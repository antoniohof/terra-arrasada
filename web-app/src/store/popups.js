const state = {
  popup: {
    isOpen: false,
    args: Object
  }
}

const actions = {
  openPopup ({commit}, args) {
    commit('set_popup_open', args)
  },
  closePopup ({commit}) {
    commit('set_popup_closed')
  }
}

const mutations = {
  set_popup_open (state, args) {
    state.popup.isOpen = true
    state.popup.args = args
  },
  set_popup_closed (state) {
    state.popup.isOpen = false
    state.popup.args = null
    state.popup.oldArgs = null
  }
}

const getters = {
  isPopupOpen (state) {
    return state.popup.isOpen
  },
  getPopupType (state) {
    return state.popup.args ? state.popup.args.type : ''
  },
  getPopupArgs (state) {
    return state.popup.args
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
