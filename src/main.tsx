import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import faviconUrl from './assets/cwpc-favicon.png?url'
import './index.css'

/** PNG from src so Vite serves a stable URL in dev and a hashed asset in production (better tab support than SVG on some browsers). */
function applyFavicon() {
  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
    .forEach((el) => el.remove())
  const href = new URL(faviconUrl, window.location.href).href
  const icon = document.createElement('link')
  icon.rel = 'icon'
  icon.type = 'image/png'
  icon.setAttribute('sizes', '32x32')
  icon.href = href
  document.head.prepend(icon)
  const apple = document.createElement('link')
  apple.rel = 'apple-touch-icon'
  apple.href = href
  document.head.prepend(apple)
}
applyFavicon()
window.addEventListener('load', applyFavicon, { once: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
