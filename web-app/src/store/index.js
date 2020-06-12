import Vuex from 'vuex'
import Vue from 'vue'
import modal from './modal'
import alert from './alert'
import globals from './globals'
import map from './map'
import story from './story'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    alert,
    globals,
    map,
    story
  }
})
