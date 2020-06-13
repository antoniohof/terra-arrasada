<template>
  <section class="explore">
    <section class="explore_content">
      <div class="controls">
        <img @click="nextStory" src="@/assets/icons/arrow.png" class="controls_arrow" />
      </div>
      <MapBox @loaded="onLoaded" :stories="getStories" class="map"></MapBox>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  MapBox
} from '@/components'

export default {
  mounted () {
    this.fetchUserPosition()
  },
  updated () {
  },
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
      ])
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
    nextStory () {
      if (this.getIsAnimating) {
        this.stopAnimation()
      }

      if (this.getCurrentStory === null) {
        this.setCurrentStory(this.getStories[0])
      } else {
        let index = this.getStories.indexOf(this.getCurrentStory)
        index++
        if (index > this.getStories.length - 1) {
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
  &_arrow
    width: 60px
    height: 60px
    color: $pallete-5
    align-self: flex-end
    filter: invert(1) drop-shadow(2px 4px 6px black)
    cursor: pointer
    pointer-events: all

.explore
  z-index: 0
  @media (min-width: 992px)
    overflow-y: hidden
  &_content
    height: 100%
    display: flex
    .map
      width: 100%
</style>
