const mutations = {
  storeStories: (state, value) => {
    console.warn('stored', value)
    state.story.list = value
  },
  storeTracks: (state, value) => {
    console.log('story tracks:', value)
    state.story.list.find((story) => story.id === parseInt(value.id)).tracks = value.tracks
    console.log(state.story.list)
  }
}

export default mutations
