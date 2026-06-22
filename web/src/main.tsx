import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'
import './i18n.ts'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Unable to mount Sokołek Studio: missing #root element.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
