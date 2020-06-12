<template>
  <div class="home">
    <div class='choose'>
    </div>
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

<style lang='scss' scoped>
.choose {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 200px;
}

</style>
