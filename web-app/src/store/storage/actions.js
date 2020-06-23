// import Vue from 'vue'
import firebase from 'firebase'

const actions = {
  uploadFile: ({ commit },data) => {
    return new Promise((resolve, reject) => {
      // var storageRef = firebase.storage().ref();
      // Create a root reference
      var storageRef = firebase.storage().ref();
      console.log('upload', data)

      let task = storageRef.child(data.url).put(data.file)
      task.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        commit('set_progress', progress)
      },
      (err) => {
        console.error(err)
        reject(err)
      },
      () => {
        console.log('success')
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        })
      })
    })
  }
}

export default actions
