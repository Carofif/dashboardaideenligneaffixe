import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyASf4fgwPYCVvJGlYtuyEysUwgu6cuzJ_U',
  authDomain: 'aide-en-ligne-affixe2.firebaseapp.com',
  databaseURL: 'https://aide-en-ligne-affixe2.firebaseio.com',
  projectId: 'aide-en-ligne-affixe2',
  storageBucket: 'aide-en-ligne-affixe2.appspot.com',
  messagingSenderId: '1007272013383',
  appId: '1:1007272013383:web:3c5a65af83f00f4cc98b62'
})

export const db = app.database()
export const storage = app.storage()
export const auth = app.auth()
