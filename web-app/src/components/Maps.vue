<template>
  <GmapMap
      ref='mapRef'
      :center='center'
      :zoom='zoom'
      class='gmap'
      @center_changed='onCenterChanged'
      @zoom_changed='onZoomChanged'
  >
    <GmapInfoWindow
      :options="infoWindow.infoOptions"
      :position="infoWindow.infoWindowPos"
      :opened="infoWindow.infoWinOpen"
      @closeclick="closeInfo"
    >{{infoWindow.infoContent}}
      <PodcastPill :story='getStory(lastSelected)'>
      </PodcastPill>
    </GmapInfoWindow>
    <GmapMarker
      :key="index"
      v-for="(s, index) in stories"
      :position="{ lat: s.lat, lng: s.lng }"
      :clickable="true"
      :title="s.title"
      :draggable="false"
      @click="onClickStory(s)"
    />
  </GmapMap>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mapStyle from '@/utils/mapStyle'

import {
  PodcastPill
} from '@/components/atoms'

export default {
  components: {
    PodcastPill
  },
  props: {
    stories: Array
  },
  mounted () {
    this.center = {
      lat: this.getLastLocation.lat,
      lng: this.getLastLocation.lng
    }
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.setZoom(this.getLastLocation.zoom)
      map.setOptions({
        gestureHandling: 'greedy',
        styles: mapStyle(),
        mapTypeControl: false,
        streetViewControl: false
      })
    })
  },
  data () {
    return {
      lastSelected: -1,
      infoWindow: {
        infoWinOpen: false,
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      },
      center: {lat: 10.0, lng: 10.0},
      zoom: 3
    }
  },
  computed: {
    ...mapGetters('map', [
      'getLastLocation'
    ])
  },
  updated () {
    if (this.center.lng === 0 && this.getLastLocation.lng !== 0) {
      this.center = {
        lat: this.getLastLocation.lat,
        lng: this.getLastLocation.lng
      }
    }
  },
  methods: {
    onClickStory (s) {
      console.log('clicked story', s)
      if (this.lastSelected !== s.id) {
        this.lastSelected = s.id
        this.infoWindow.infoWinOpen = true
        this.infoWindow.infoWindowPos = { lat: s.lat, lng: s.lng }
        this.infoWindow.infoContent = s.description
        this.infoWindow.infoWinOpen = true
      } else {
        this.infoWindow.infoWinOpen = false
      }
    },
    closeInfo () {
      this.infoWindow.infoWinOpen = false
      this.lastSelected = -1
    },
    onZoomChanged (newZoom) {
      // save zoom inside store
      this.zoom = newZoom
      this.setLastLocation({ lat: this.center.lat, lng: this.center.lng, zoom: this.zoom })
    },
    onCenterChanged (newCenter) {
      // save location inside store
      this.setLastLocation({ lat: newCenter.lat(), lng: newCenter.lng(), zoom: this.zoom })
    },
    getStory (id) {
      return this.stories.find((story) => story.id === id)
    },
    ...mapActions('map', [
      'setLastLocation'
    ])
  },
  watch: {
    getLastLocation: function () {
      if (this.center.lat !== 0 || this.center.lng !== 0) return
      this.center = {
        lat: this.getLastLocation.lat,
        lng: this.getLastLocation.lng
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.gmap
  position: relative
  width: 100%
  bottom: 0
  height: 100%
</style>
