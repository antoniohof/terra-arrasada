<template>
  <header class="topbar" v-if="getMeta">
    <div class="wrap">
      <a class="wrap_back" v-if="getMeta.back" @click="goBack">
        <img src="static/icons/backarrow-icon.svg" />
      </a>
      <router-link class="wrap_logo" v-if="!getMeta.back" to="/" tag="a">Terra Arrasada</router-link>
      <div class="controls">
        <!--
          <div
            class="controls_btn"
            :class="{ 'controls_btn--selected': $route.path === '/create' }"
          >Create</div>
        -->
        <div
          @click="$router.push('/login')"
          class="controls_btn"
          :class="{ 'controls_btn--selected': $route.path === '/login' }"
        >Login</div>
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
  background: white
  z-index: 10
  height: 50px
  .wrap
    justify-content: space-between
    display: flex
    flex-direction: row
    width: 100%
    &_logo
      text-decoration: line-through !important
      font-weight: 1000
      justify-content: center
      align-self: center
      width: 100px
      color: black
      img
        max-width: 100%
        height: auto
    &_back
      color: black
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
        margin-left: 1.2em
        font-weight: 800
        font-size: 15px
        color: black
        display: flex
        justify-content: center
        flex-direction: column
        text-align: center

        &--selected
          opacity: 1

        &:hover:not(.controls_btn--selected)
          color: red
</style>
