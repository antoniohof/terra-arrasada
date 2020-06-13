<template>
  <div class="home">
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: 'home',
  components: {
  },
  computed: {
  },
  methods: {
    ...mapActions('map', [
      'fetchUserPosition'
    ])
  }
}
</script>

<style lang='sass' scoped>


</style>
