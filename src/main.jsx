import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import { AdminProvider } from './context/AdminContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AdminProvider>
  </StrictMode>,
)
