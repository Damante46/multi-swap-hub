// Early Buffer polyfill - replace simple version with full library
import { Buffer as BufferPolyfill } from 'buffer';

// Replace the simple polyfill with the full Buffer implementation
if (typeof globalThis.Buffer === 'undefined' || typeof globalThis.Buffer.from !== 'function') {
  globalThis.Buffer = BufferPolyfill;
}
if (typeof window !== 'undefined') {
  window.Buffer = globalThis.Buffer;
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
