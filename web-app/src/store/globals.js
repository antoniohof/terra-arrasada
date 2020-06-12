import store from '.' // eslint-disable-line no-unused-vars

const state = {
  globals: {
    screen: {
      isDesktop: false,
      limitDesktop: 780,
      innerHeight: 0,
      windowWidth: 0
    },
    audio: {
      enabling: false,
      enabled: false,
      supported: false
    }
  }
}

const actions = {
  setScreenLayout ({commit}) {
    let windowWidth = document.documentElement.clientWidth
    if (windowWidth > state.globals.screen.limitDesktop) {
      commit('set_desktop_layout')
    } else {
      commit('set_mobile_layout')
    }
    commit('set_window_width', windowWidth)
  },
  setInnerHeight ({commit}) {
    commit('set_inner_height')
  },
  checkAudioSupported ({commit}) {
    var isLocalOk = (window.location.origin.includes('https') || window.location.origin.includes('localhost') || window.location.origin.includes('file://'))
    var supportsAudioCapture = isLocalOk && window.DetectRTC.isWebRTCSupported && ((window.DetectRTC.isWebSocketsSupported && window.DetectRTC.isGetUserMediaSupported) || (window.cordova !== undefined))
    supportsAudioCapture ? commit('set_audio_supported') : commit('set_audio_unsupported')
  },
  setAudioEnabled ({commit}) {
    commit('set_audio_enabled')
  },
  setAudioDisabled ({commit}) {
    commit('set_audio_disabled')
  },
  setAudioEnabling ({commit}) {
    commit('set_audio_enabling')
  },
  setAudioNotEnabling ({commit}) {
    commit('set_audio_not_enabling')
  }
}

const mutations = {
  set_desktop_layout () {
    state.globals.screen.isDesktop = true
  },
  set_mobile_layout (state) {
    state.globals.screen.isDesktop = false
  },
  set_inner_height (state) {
    state.globals.screen.innerHeight = window.innerHeight
  },
  set_window_width (state, width) {
    state.globals.screen.windowWidth = width
  },
  set_audio_supported (state) {
    state.globals.audio.supported = true
  },
  set_audio_unsupported (state) {
    state.globals.audio.supported = false
  },
  set_audio_enabled (state) {
    state.globals.audio.enabled = true
  },
  set_audio_disabled (state) {
    state.globals.audio.enabled = false
  },
  set_audio_enabling (state) {
    state.globals.audio.enabling = true
  },
  set_audio_not_enabling (state) {
    state.globals.audio.enabling = false
  },
  set_is_mobile (state, value) {
    state.globals.isMobile = value
  }
}

const getters = {
  isDesktopLayout (state) {
    return state.globals.screen.isDesktop
  },
  getInnerHeight (state) {
    return state.globals.screen.innerHeight
  },
  getWindowWidth (state) {
    return state.globals.screen.windowWidth
  },
  getEnablingAudio (state) {
    return state.globals.audio.enabling
  },
  getAudioSupported (state) {
    return state.globals.audio.supported
  },
  getAudioEnabled (state) {
    return state.globals.audio.enabled
  },
  getIsMobile (state) {
    return state.globals.isMobile
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
