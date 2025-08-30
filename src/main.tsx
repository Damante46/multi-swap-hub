// Early Buffer polyfill - must be first
import { Buffer as BufferPolyfill } from 'buffer';
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = BufferPolyfill;
}
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = BufferPolyfill;
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
