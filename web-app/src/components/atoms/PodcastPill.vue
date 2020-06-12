<template>
  <div class="pill">
    TODO: Slideshow. Go to story page.
  <a @click='showStory'>
    GO TO STORY PAGE: ID: {{story ? story.id : ''}}
  </a>
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
    }
  },
  methods: {
    showStory () {
      console.log('this story', this.story)
      this.$router.push('/stories/' + this.story.id)
    }
  },
  mounted () {
    console.log('this story', this.story)
  },
  updated () {
    console.log('this story', this.story)
  }
}
</script>
<style lang="sass" scoped>
.pill
  background: red
  height: 100px
  width: 200px
  cursor: pointer
</style>
