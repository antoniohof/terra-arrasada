<template>
  <div class="pill" v-show="ready">
    <div class="pill_line"></div>
    <div class="pill_info">
      <h3 class="pill_info_title">{{ story.title }}</h3>
      <a
        class="pill_info_description"
        @click="showStory"
      >GO TO STORY PAGE: ID: {{story ? story.id : ''}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object
    }
  },
  data () {
    return {
      ready: false
    }
  },
  methods: {
    showStory () {
      console.log('this story', this.story)
      this.$router.push('/stories/' + this.story.id)
    }
  },
  mounted () {
    setTimeout(() => {
      console.log("ready")
      this.ready = true
    }, 500)
    console.log('this story', this.story)
  },
  updated () {
    console.log('this story', this.story)
  }
}
</script>
<style lang="sass">
.mapboxgl-popup-tip
  width: 0
  padding-top: 5px
  height: 100px !important
  border: 1px solid black !important
  z-index: 1

.mapboxgl-popup-content
  background: $pallete-1 !important
  padding: 0px !important

.mapboxgl-popup-close-button
  color: white !important
  font-size: 144% !important
</style>
<style lang="sass" scoped>
.pill
  background: transparent
  height: 100px
  &_line

  &_info
    width: 200px
    height: 100%
    cursor: pointer
    background: $pallete-1
    font-weight: 500
    &_title
      color: white
      font-family: "Exo 2"
    &_description
      font-family: "Exo 2"
      color: white
</style>
