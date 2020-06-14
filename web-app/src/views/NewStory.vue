<template>
  <v-col align-self="center" >
    <v-row class='newstory fill-height fill-width' align="center" justify="center" align-content="center">
      <v-form
        class='newstory_form mx-4'
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >
        <!--
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        -->

        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>


        <v-textarea
          v-model="description"
          name="input-7-1"
          filled
          label="Description"
          auto-grow
          full-width
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>


        <v-text-field
          v-model="city"
          :rules="cityRules"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          v-model="country"
          :rules="countryRules"
          label="Country"
          required
        ></v-text-field>

        <v-select
          class='mt-4'
          v-model="crimeType"
          :items="types"
          :rules="[v => !!v || 'Type is required']"
          label="Type"
          required
        ></v-select>

        <v-btn
          :loading="loading"
          tile
          :disabled="!valid"
          color="white"
          class="mt-4"
          @click="submit"

        >
          Next
        </v-btn>
        <v-alert class='mt-6' v-if="error !== ''" type="error" tile>
        {{ error }}
        </v-alert>

      </v-form>
    </v-row>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'newstory',
  components: {
  },
  computed: {
    ...mapGetters('auth', [
      'getUser'
    ])
  },
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required'
    ],
    description: '',
    descriptionRules: [
      v => !!v || 'Description is required'
    ],
    city: '',
    cityRules: [
      v => !!v || 'City is required'
    ],
    country: '',
    countryRules: [
      v => !!v || 'Country is required'
    ],
    crimeType: '',
    types: [
      'Oil Spill',
      'Deforestation',
      'Littering',
      'Other'
    ],
    lazy: false,
    loading: false,
    error: ''
  }),

  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    ...mapActions('story', [
      'storeCreatingStory'
    ]),
    submit () {
      let entity = {
        title: this.title,
        description: this.description,
        date: 1545096864,
        thumbnail: '',
        zoom: 0,
        authorName: this.getUser.displayName,
        authorID: this.getUser.uid,
        city: this.city,
        country: this.country,
        geometry: {
          coordinates: []
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

      this.storeCreatingStory(entity)
      this.$router.push('/new2')
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
}
</script>

<style lang='sass' scoped>
.newstory_form
  width: 100%
</style>