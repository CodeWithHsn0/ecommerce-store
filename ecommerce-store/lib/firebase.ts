import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9QEERzLslHmreGgQ3kFlaTvbuI_tXsq8",
  authDomain: "store-e02ab.firebaseapp.com",
  projectId: "store-e02ab",
  storageBucket: "store-e02ab.appspot.com",
  messagingSenderId: "551031098944",
  appId: "1:551031098944:web:3adbde1d89d690340859a5",
  measurementId: "G-N8GBCPS8CH",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const db = getFirestore(app)

// Initialize Analytics (only in browser)
export const initAnalytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app)
  }
  return null
}

export default app

