import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBBo9i47izPaJx63AaSXf0ulTZ4a5HR0cE',
  authDomain: 'aide-en-ligne-affixe.firebaseapp.com',
  databaseURL: 'https://aide-en-ligne-affixe.firebaseio.com',
  projectId: 'aide-en-ligne-affixe',
  storageBucket: '',
  messagingSenderId: '192306049259',
  appId: '1:192306049259:web:fbca040e0d9744ecc38eae'
})

export const db = app.database()
export const storage = app.storage()
export const auth = app.auth()
