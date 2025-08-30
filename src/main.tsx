import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer'

// Make Buffer available globally for crypto libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}
globalThis.Buffer = Buffer

createRoot(document.getElementById("root")!).render(<App />);
