import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts' // Import this BEFORE App to ensure it's initialized
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
