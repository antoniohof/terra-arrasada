<template>
  <v-col v-if="story" class='story fill-height fill-width' align="center" justify="center" align-content="center">
    <v-app-bar
      color="black accent-4"
      dense
      dark
    >
    <v-toolbar-title>{{ story.title }}</v-toolbar-title>

    </v-app-bar>
    <MapBox
      class="map"
      :stories="[story]"
      locked
    />
    <div class='story_body'>
      <p class='story_body_description'>
        {{ story.description }}
      </p>
    </div>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  MapBox
} from '@/components'
export default {
  name: 'newstorypick',
  components: {
    MapBox
  },
  computed: {
        ...mapGetters('story',
      [
        'getStories'
      ])
  },
  mounted () {
    this.setCurrentStory(null)
    this.fetchStories().then(() => {
      this.story = this.getStories.find((story) => {
        return story.id === this.$route.params.id
      })
    })
  },
  data: () => ({
    story: null
  }),

  methods: {
    ...mapActions('auth', [
      'login',
      'getUser'
    ]),
    ...mapActions('story', [
      'fetchStories',
      'getUser'
    ]),
    ...mapActions('explore', [
      'setCurrentStory'
    ]),
    submit () {
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang='sass' scoped>
.map
  margin-top: 5px
  width: 100% !important
  height: 30% !important

.story

  &_body
    margin-top: 20px
    &_description
      text-align: left
      color: black
</style>