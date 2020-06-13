<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view class="view" :class="{ 'margintop': $route.meta.top.show}"></router-view>
    <!--
    <Footer>
    </Footer>
    -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import {
  TopBar
} from '@/components'

export default {
  components: {
    TopBar
  },
  data () {
    return {
    }
  },
  created () {
    console.log('app created')
  },
  mounted () {
    this.fetchStories()
  },
  updated () {
  },
  computed: {
  },
  methods: {
    ...mapActions('story',
    [
      'fetchStories'
    ])
  },
  watch: {
  },
  beforeDestroy () {
  },
  name: 'app'
}
</script>

<style lang="sass">
#app
  font-family: 'Heebo', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100vh
  width: 100vw
  overflow-y: hidden
  overflow-x: hidden
  .view
    width: 100%
    height: 100vh
  .margintop
    margin-top: 50px
    height: calc(100vh - 50px) !important

#nav
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
