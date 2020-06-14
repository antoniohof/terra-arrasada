// import Vue from 'vue'
import api from '@/api'
import { db } from "@/main.js" // <--- or wherever the config file is

const actions = {
  async fetchStories ({ commit }) {
    console.log('fetch stories')
    await db
    return db.collection("stories").get().then((snapshot) => {
      console.warn('stories!', snapshot)
      commit('storeStories', snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  },
  async save ({ dispatch }, story) {
    console.log('save stories')
    let save = story
    if (!save) {
      console.log('story null!')
      save = {
        title: 'Story 1',
        description: 'Lorem ipsum dolor sit amet.',
        date: 1545096864,
        thumbnail: '',
        author: 'Samantha',
        lat: -22.913731,
        lng: -43.182279,
        geometry: {
          coordinates: [
            { lng: 102.11806158995955, lat: 69.08880731687233 },
            { lng: 100.02547091545694, lat: 66.13248462554594 },
            { lng: 109.89054123810831, lat: 67.14001090921067 },
            { lng: 102.11806158995955, lat: 69.08880731687233 }
          ]
        },
        photos: [
          {
            url: ''
          },
          {
            url: ''
          },
          {
            url: ''
          }
        ]
      }
    }
    console.log('saving', save)
    await db
    return db.collection("stories").add(save).then(() => dispatch('fetchStories'))
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
  },
  storeCreatingStory: ({ commit }, story) => {
    commit('store_creating_story', story)
  }
}

export default actions
