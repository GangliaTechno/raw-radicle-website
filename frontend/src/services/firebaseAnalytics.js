import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDfR8UoaNqB0IGEd2yozbsik8YfZS9lCTI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'raw-radicles.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'raw-radicles',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'raw-radicles.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '72980249763',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:72980249763:web:c80b558be45aacc33e1316',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-77DTPE5T5B',
}

let analyticsPromise

const getFirebaseAnalytics = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null)
  }

  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        if (!supported) return null
        const app = initializeApp(firebaseConfig)
        return getAnalytics(app)
      })
      .catch(() => null)
  }

  return analyticsPromise
}

export const trackAnalyticsEvent = async (eventName, params = {}) => {
  const analytics = await getFirebaseAnalytics()
  if (!analytics) return
  logEvent(analytics, eventName, params)
}

export const trackPageView = (location) => {
  window.setTimeout(() => {
    trackAnalyticsEvent('page_view', {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, 0)
}
