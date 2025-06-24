// src/firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAN5A8vhogPlfVRXG9GKi19hNVnruVtPoM",
  authDomain: "booking-c1102.firebaseapp.com",
  projectId: "booking-c1102",
  storageBucket: "booking-c1102.appspot.com",
  messagingSenderId: "132420751457",
  appId: "1:132420751457:web:9a74a7eccc0bca4e831a20",
  measurementId: "G-YW9N2H3XF1"
};

// Khởi tạo Firebase (chỉ khởi khi chưa có)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
