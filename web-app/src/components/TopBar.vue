<template>
  <header class="topbar" v-if="getMeta">
    <div class="wrap">
      <a class="wrap_back" v-if="getMeta.back" @click="goBack">
        <img src="static/icons/backarrow-icon.svg" />
      </a>
      <router-link class="wrap_logo" v-if="!getMeta.back" to="/" tag="a">LOGO</router-link>
      <div class="controls">
        <!--
          <div
            class="controls_btn"
            :class="{ 'controls_btn--selected': $route.path === '/create' }"
          >Create</div>
        -->
        <div
          @click="$router.push('/explore')"
          class="controls_btn"
          :class="{ 'controls_btn--selected': $route.path === '/explore' }"
        >Explore</div>
        <div
          @click="$router.push('/')"
          class="controls_btn"
          :class="{ 'controls_btn--selected': $route.path === '/' }"
        >Home</div>
      </div>
    </div>
  </header>
</template>

<script>

import {
  mapGetters,
  mapActions
} from 'vuex'

import {
} from '@/components/atoms'

export default {
  components: {
  },
  mounted () {
  },
  updated () {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isModalOpen'
    ]),
    getMeta () {
      if (this.$route.meta.top) {
        if (this.$route.meta.top.show) {
          return this.$route.meta.top
        }
        return false
      }
      return false
    }
  },
  methods: {
    goBack: function () {
      this.$router.push(-1)
    },
    ...mapActions('map', [
      'fetchCurrentPosition'
    ])
  },
  watch: {
  }
}
</script>

<style lang="sass" scoped>
.topbar
  position: fixed
  width: 100%
  padding-right: 20px
  padding-left: 20px
  background: $pallete-6
  z-index: 10
  height: 50px
  .wrap
    justify-content: space-between
    display: flex
    flex-direction: row
    width: 100%
    &_logo
      justify-content: center
      align-self: center
      width: 50px
      color: white
      img
        max-width: 100%
        height: auto
    &_back
      color: white
      width: 15px
      padding: 2px

    .controls
      width: 50%
      padding-right: 20px
      height: 50px
      display: flex
      align-content: right
      justify-content: right
      flex-direction: row-reverse
      &_btn
        opacity: 0.4
        cursor: pointer
        width: 100px
        height: 100%
        margin-left: 5px
        font-weight: 100
        font-size: 15px
        color: white
        display: flex
        justify-content: center
        flex-direction: column
        text-align: center

        &--selected
          opacity: 1
</style>
