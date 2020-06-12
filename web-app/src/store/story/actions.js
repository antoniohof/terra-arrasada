// import Vue from 'vue'
import api from '@/api'

const actions = {
  fetchStories: ({ commit }) => {
    return api.story
      .fetch().then((response) => {
        console.log(response)
        commit('storeStories', response.detail.stories)
        return response.detail
      }).catch((e) => {
        return e
      })
  },
  fetchStoryTracks: ({ commit }, id) => {
    return api.soundcloud
      .fetch().then((response) => {
        console.log(response)
        commit('storeTracks', { id: id, tracks: response.collection })
        return response.collection
      }).catch((e) => {
        return e
      })
  }
}

export default actions
