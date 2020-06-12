import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase'
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_KEY,
    libraries: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// database
export const db = firebase.firestore()

// storage
export const storage = firebase.storage().ref();

// console.log('storage', storage)
// console.log('db', db)
/*
db.collection("users").onSnapshot(() => {
  console.warn('snapshotFIRST!')
})
*/

if (firebase.messaging.isSupported()) {
  console.warn('messaging supported!')
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_MESSAGING) // 1. Generate a new key pair
  // Request Permission of Notifications
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.')

    // Get Token
    messaging.getToken().then((token) => {
      console.log(token)
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err)
  });
} else {
  console.error('messaging not supported!')
}
