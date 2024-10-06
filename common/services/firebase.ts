// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'some-api-key',
  authDomain: 'some-auth-domain',
  projectId: 'some-project-id',
  storageBucket: 'some-storage-bucket',
  messagingSenderId: 'some-messaging-sender-id',
  appId: 'some-app-id',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
