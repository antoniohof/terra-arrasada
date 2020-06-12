<template>
  <section class="explore">
    <section class="explore_content">
      <MapBox :stories='getStories' class='map'>
      </MapBox>
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
    this.fetchStories()
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
      ]
    )
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
  margin-top: 50px
  @media (min-width: 992px)
    overflow-y: hidden
  &_content
    height: 100%
    display: flex
    .map
      width: 100%

    @media (min-width: 992px)
      display: flex
      padding: 0px 20px 0
      margin-right: 0
      margin-left: 0
      max-width: none
      height: 80%

</style>
