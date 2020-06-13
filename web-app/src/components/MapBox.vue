<template>
  <div class="map">
    <MglMap
      :accessToken="accessToken"
      mapStyle="mapbox://styles/antoniohof/ckbdmlsim237n1jqzu8lrebsx?optimize=true"
      :center="this.initialCenter"
      :zoom="this.initialZoom"
      @load="onMapLoaded"
      @zoomend="onZoomChanged"
      @dragend="onCenterChanged"
    >
      <MglMarker
        v-for="(story, index) in storiesAdded"
        :key="index"
        :coordinates="getCenterLayer(story)"
      >
        <div :id="'marker_' + story.id" slot="marker" class="marker" />
        <MglPopup>
          <PodcastPill :story="story"></PodcastPill>
        </MglPopup>
      </MglMarker>
      <MglGeojsonLayer
        v-for="story in storiesAdded"
        :key="story.id"
        :sourceId="story.id"
        :layerId="story.id"
        :layer="layerInfo(story.id)"
        @click="onClickedStory(story)"
      ></MglGeojsonLayer>
    </MglMap>
    <div class="calculation-box">
      <p>Draw a polygon using the draw tools.</p>
      <div id="calculated-area"></div>
    </div>
  </div>
</template>
<script>
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
import { mapGetters, mapActions } from 'vuex'
import { MglMap, MglGeojsonLayer, MglPopup, MglMarker  } from "vue-mapbox";
import {
  PodcastPill
} from '@/components/atoms'
export default {
  components: {
    MglMap,
    MglGeojsonLayer,
    MglPopup,
    MglMarker,
    PodcastPill
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
      currentDraw: null,
      storiesAdded: []
    }
  },
  computed: {
    ...mapGetters('map', [
      'getLastLocation'
    ]),
    ...mapGetters('explore', [
      'getIsAnimating',
      'getCurrentStory'
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

      this.mapbox.loadImage('/images/blood.png', (err, img) => {
        if (err) {
          console.error(err)
        }
        this.mapbox.addImage('pattern', img)
      })

      // add all the stories to the map
      await this.stories.length > 0
      this.stories.forEach(story => {
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

      this.$emit('loaded')
    },
    updateDrawArea (e) {
      let data = this.currentDraw.getAll();

      this.saveNewArea(data)

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

      this.currentDraw.deleteAll()
    },
    onClickedStory (s) {
      console.log('clicked story', s)
      if (this.lastSelected !== s.id) {
        setTimeout(() => {
          this.lastSelected = s.id
        }, 100)
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

      if (!this.mapbox) return
      let addedIds = []
      this.storiesAdded.forEach((s) => addedIds.push(s.id))

      if (addedIds.indexOf(story.id) !== -1) {
        return
      }

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
      this.storiesAdded.push(story)

      /*
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
      */
    },
    saveNewArea (data) {
      console.log("data to save", data)
      let coordData = []
      data.features[0].geometry.coordinates[0].forEach((coord) => {
        console.log(coord)
        coordData.push({
          lng: coord[0],
          lat: coord[1]
        })
      })

      let entity = {
        title: 'Story 1',
        description: 'Lorem ipsum dolor sit amet.',
        date: 1545096864,
        thumbnail: '',
        author: 'Samantha',
        city: 'Rio de Janeiro',
        state: 'Brazil',
        geometry: {
          coordinates: coordData
        },
        photos: [
          {
            url: ''
          },
          {
            url: ''
          },
          {
            url: ''
          }
        ]
      }
      this.save(entity)
    },
    layerInfo (id) {
      return {
        'id': id,
        'type': 'fill',
        'source': id,
        'layout': {},
        'paint': {
        //'fill-pattern': 'pattern',
        'fill-color': '#933922', // pallete 4
        'fill-opacity': 0.5,
        'fill-outline-color': 'black'
        }
      }
    },
    getCenterLayer (story) {
      let src = this.mapbox.getSource(story.id)
      if (src) {
        let center = window.turf.centroid(src._data);
        return center.geometry.coordinates
      } else {
        return [0,0]
      }
    },
    ...mapActions('map', [
      'setLastLocation'
    ]),
    ...mapActions('story', [
      'save'
    ])
  },
  watch: {
    stories () {
      if (!this.mapbox) return
      this.stories.forEach(story => {
        this.addToMap(story)
      })
    },
    getCurrentStory (story) {
      if (story === null || !this.mapbox) {
        return
      }
      console.log('get current story', story)
      console.log('is animating')
      this.mapbox.flyTo({
        center: this.getCenterLayer(story),
        essential: true,
        zoom: 6
      })
      let marker = document.querySelector('#marker_' + story.id)
      marker.click()
    }
  }
}
</script>

<style lang='sass'>
.marker
  height: 15px !important
  width: 15px
  background-color: black
  border-radius: 50%
  display: inline-block
  cursor: pointer

.slide-fade-enter-active
  transition: all 1s ease !important

.slide-fade-leave-active
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0) !important

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(100px) !important
  opacity: 0 !important
</style>

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
    margin: 0
    font-size: 13px
</style>
