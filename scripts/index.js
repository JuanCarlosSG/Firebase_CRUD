// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtl2i8aAcioxkBK6AW3leE8hOeO-FJFUo",
  authDomain: "jcsg-web-crud.firebaseapp.com",
  projectId: "jcsg-web-crud",
  storageBucket: "jcsg-web-crud.appspot.com",
  messagingSenderId: "423252133385",
  appId: "1:423252133385:web:efc5492fc9a2120cb8dad8",
  measurementId: "G-SLWE6MFQT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
