import { getApps, initializeApp, getApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyA9n3gXB8aFAPalpJhSvn4HolQfGfY0JRo",
//   authDomain: "myproject-b32a0.firebaseapp.com",
//   projectId: "myproject-b32a0",
//   storageBucket: "myproject-b32a0.appspot.com",
//   messagingSenderId: "27559148001",
//   appId: "1:27559148001:web:fa49a872fc26232c643aa0",
//   measurementId: "G-CCHYZTV19C",
// };

// -------------config-------------

// const firebaseConfig = {
//   apiKey: "AIzaSyDbG9D8Liuyqtn8bmNaYDuNh9piv6Eoq94",
//   authDomain: "art-monolit-8898c.firebaseapp.com",
//   projectId: "art-monolit-8898c",
//   storageBucket: "art-monolit-8898c.appspot.com",
//   messagingSenderId: "382177457226",
//   appId: "1:382177457226:web:9641737a3911d18bbc22b3",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
