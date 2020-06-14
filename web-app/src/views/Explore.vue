<template>
  <v-col class="explore">
    <v-app-bar
      color="black accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <!--<v-toolbar-title>Explore</v-toolbar-title>-->
      <v-btn
        tile
        dark
        color="white"
        outlined
        @click="addNew"
        class="ml-4"
      >
      Add new
      </v-btn>
      <v-spacer></v-spacer>
      <v-autocomplete
        align-self-center
        v-model="searchedStory"
        :items="getStories"
        height="30"
        color="white"
        hide-no-data
        hide-selected
        item-text="title"
        item-value="id"
        hide-details
        placeholder="Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-app-bar>
    <div class="explore_content">
      <div class="controls">
        <img
          src="@/assets/icons/arrow.png"
          class="controls_arrow_right"
          @click="nextStory"
        >
      </div>
      <MapBox
        :stories="getStories"
        class="map"
        @loaded="onLoaded"
      />
    </div>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  MapBox
} from '@/components'

export default {
  components: {
    MapBox
  },
  computed: {
    ...mapGetters('story',
      [
        'getStories'
      ]),
      ...mapGetters('explore',
      [
        'getCurrentStory',
        'getIsAnimating'
      ]),
      ...mapGetters('auth', [
        'isAuthenticated'
      ])
  },
  data () {
    return {
      searchedStory: null
    }
  },
  mounted () {
    this.fetchUserPosition()
  },
  destroyed () {
    this.stopAnimation()
  },
  methods: {
    async onLoaded () {
      await this.getStories.length > 0
      console.log('loaded, go start anim')
      // this.startAnimation()
    },
    addNew () {
      if (this.isAuthenticated) {
        this.$router.push('/new')
      } else {
        this.$router.push('/login')
      }
    },
    nextStory () {
      if (this.getIsAnimating) {
        this.stopAnimation()
      }

      if (this.getCurrentStory === null) {
        this.setCurrentStory(this.getStories[0])
      } else {
        let index = this.getStories.indexOf(this.getCurrentStory)
        index++
        if (index >= this.getStories.length - 1) {
          index = 0
        }
        this.setCurrentStory(this.getStories[index])
      }
    },
    ...mapActions('story',
      [
        'fetchStories'
      ]),
        ...mapActions('map',
      [
        'fetchUserPosition'
      ]),
      ...mapActions('explore',
      [
      'startAnimation',
      'stopAnimation',
      'setCurrentStory'
      ])
  },
  watch: {
    searchedStory (story) {
      if (story) {
        console.log('choose ', story)
        this.setCurrentStory(story)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.controls
  position: absolute
  width: 100%
  display: flex
  top: 50%
  flex-direction: row
  z-index: 1000
  justify-content: flex-end
  pointer-events: none
  &_arrow_right
    width: 60px
    height: 60px
    margin-right: 20px
    color: $pallete-5
    align-self: flex-end
    filter: invert(1) drop-shadow(2px 4px 6px black)
    cursor: pointer
    pointer-events: all

.explore
  z-index: 0
  height: 100%
  &_content
    height: 100%
    display: flex
    .map
      width: 100%
</style>
