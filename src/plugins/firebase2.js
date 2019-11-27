import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBJismhrcbp8gkwD1LL4v6dsnCc4Pz8yMs',
  authDomain: 'affixe20-suiviutilisation.firebaseapp.com',
  databaseURL: 'https://affixe20-suiviutilisation.firebaseio.com',
  projectId: 'affixe20-suiviutilisation',
  storageBucket: 'affixe20-suiviutilisation.appspot.com',
  messagingSenderId: '504928429966',
  appId: '1:504928429966:web:033f18c46454534b5fe6df'
})

export const db = app.database()
export const storage = app.storage()
export const auth = app.auth()
