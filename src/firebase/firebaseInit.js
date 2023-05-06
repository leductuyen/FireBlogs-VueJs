import 'firebase/firestore'
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyByfHaD_yB6wMQuISSBOcvh91KLXOMJEns',
    authDomain: 'fireblogs-9a360.firebaseapp.com',
    projectId: 'fireblogs-9a360',
    storageBucket: 'fireblogs-9a360.appspot.com',
    messagingSenderId: '1044028211644',
    appId: '1:1044028211644:web:230c2bc438d1b5fdb5ebb9',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
