<template>
  <div class='map'>
    <MglMap
    :accessToken="accessToken"
    mapStyle="mapbox://styles/antoniohof/ckbc8ga6a0z9z1ild616htc33?optimize=true"
    :center="this.initialCenter"
    :zoom="this.initialZoom"
    @load="onMapLoaded"
    @zoomend="onZoomChanged"
    @dragend="onCenterChanged"
    />
  <div class="calculation-box">
    <p>Draw a polygon using the draw tools.</p>
    <div id="calculated-area"></div>
  </div>
</div>
</template>
<script>
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
import { mapGetters, mapActions } from 'vuex'
import { MglMap } from "vue-mapbox";
import {
} from '@/components/atoms'

export default {
  components: {
    MglMap
  },
  props: {
    stories: Array
  },
  beforeMount () {
    this.initialCenter = [this.getLastLocation.lng, this.getLastLocation.lat]
    this.initialZoom = this.getLastLocation.zoom
  },
  mounted () {

  },
  data () {
    return {
      initialCenter: [],
      initialZoom: 2,
      mapbox: null,
      lastSelected: -1,
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      currentDraw: null
    }
  },
  computed: {
    ...mapGetters('map', [
      'getLastLocation'
    ])
  },
  methods: {
    async onMapLoaded(evt) {
      this.mapbox = evt.map
      // Here we cathing 'load' map event
      // const asyncActions = event.component.actions

      // await asyncActions.setCenter([this.getLastLocation.lng, this.getLastLocation.lat])
      // await asyncActions.setZoom(this.getLastLocation.zoom)

      console.log("map loaded")

      // add all the stories to the map
      await this.stories.length > 0
      console.log(this.stories)
      this.stories.forEach(story => {
        console.log('adding', story.title)
        this.addToMap(story)
      })


      // add draw controls
      // draw mode
      this.currentDraw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
          polygon: true,
          trash: true
      }
      });
      this.mapbox.addControl(this.currentDraw);

      this.mapbox.on('draw.create', this.updateDrawArea);
      // this.mapbox.on('draw.delete', this.updateDrawArea);
      // this.mapbox.on('draw.update', this.updateDrawArea);

      console.log(this.currentDraw)
    },
    updateDrawArea (e) {
      let data = this.currentDraw.getAll();
      console.log(data)

      this.save()

      let answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
        var area = window.turf.area(data);
        // restrict to area to 2 decimal points
        var rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML =
            '<p><strong>' +
            rounded_area +
            '</strong></p><p>square meters</p>';
      } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Use the draw tools to draw a polygon!');
      }
    },
    onClickStory (s) {
      console.log('clicked story', s)
      if (this.lastSelected !== s.id) {
        this.lastSelected = s.id
      }
    },
    onZoomChanged (evt) {
      // save zoom inside store
      this.setLastLocation({lat: evt.map.transform._center.lat, lng: evt.map.transform._center.lng, zoom: evt.map.style.z})
    },
    onCenterChanged (evt) {
      // save location inside store
      this.setLastLocation({lat: evt.map.transform._center.lat, lng: evt.map.transform._center.lng, zoom: evt.map.style.z})
    },
    getStory (id) {
      return this.stories.find((story) => story.id === id)
    },
    addToMap (story) {
      this.mapbox.addSource(story.id, {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [[...story.geometry.coordinates.map((coord) => {
              return [coord.lng, coord.lat]
            })]]
          },
          "properties": {
            "title": story.title,
            "marker-symbol": "monument"
          }
        }
      });
      this.mapbox.addLayer({
        'id': story.id,
        'type': 'fill',
        'source': story.id,
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
      })
    },
    ...mapActions('map', [
      'setLastLocation'
    ]),
    ...mapActions('story', [
      'save'
    ])
  },
  watch: {
  }
}
</script>

<style lang='sass' scoped>
  .calculation-box
    z-index: 1000
    height: 120px
    width: 150px
    position: absolute
    bottom: 100px
    left: 10px
    background-color: rgba(255, 255, 255, 0.9)
    padding: 15px
    text-align: center

  p
    font-family: 'Open Sans'
    margin: 0
    font-size: 13px
</style>
