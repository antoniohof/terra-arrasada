<template>
  <section class="explore">
    <section class="explore_content">
      <MapBox :stories="getStories" class="map"></MapBox>
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
      ])
  },
  methods: {
    ...mapActions('story',
      [
        'fetchStories'
      ]),
        ...mapActions('map',
      [
        'fetchUserPosition'
      ])
  }
}
</script>

<style lang="sass" scoped>
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
