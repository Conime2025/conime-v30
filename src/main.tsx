import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from '../App'

// Initialize theme before rendering
function initializeTheme() {
  const storedTheme = localStorage.getItem('darkmode');
  
  if (storedTheme === null) {
    // No preference stored, default to dark
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkmode', 'true');
  } else if (storedTheme === 'true') {
    // User prefers dark
    document.documentElement.classList.add('dark');
  } else if (storedTheme === 'false') {
    // User prefers light
    document.documentElement.classList.remove('dark');
  }
}

// Initialize theme immediately
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)