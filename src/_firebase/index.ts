/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author luke zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

import type {default as Firebase} from "firebase/app"

declare const firebase: typeof Firebase

const firebaseConfig = {
    apiKey: "AIzaSyC8LzSIS1mRoQuFnjtwq1U5vtp2Hx2rdtk",
    authDomain: "kk-cabinets.firebaseapp.com",
    databaseURL: "https://kk-cabinets.firebaseio.com",
    projectId: "kk-cabinets",
    storageBucket: "kk-cabinets.appspot.com",
    messagingSenderId: "999203573812",
    appId: "1:999203573812:web:7baa8753bce4e8ac187a61"
}

firebase.initializeApp(firebaseConfig)

export const firestore: Firebase.firestore.Firestore | undefined = firebase.firestore?.()

export default {
    firestore,
}
