// Early Buffer and process polyfills - replace simple version with full library
import { Buffer as BufferPolyfill } from 'buffer';

// Replace the simple polyfill with the full Buffer implementation
if (typeof globalThis.Buffer === 'undefined' || typeof globalThis.Buffer.from !== 'function') {
  globalThis.Buffer = BufferPolyfill;
}
if (typeof window !== 'undefined') {
  window.Buffer = globalThis.Buffer;
}

// Ensure process is available for crypto extensions
if (typeof globalThis.process === 'undefined') {
  (globalThis as any).process = {
    env: {},
    version: '',
    versions: {} as any,
    platform: 'browser' as any,
    browser: true,
    nextTick: function(callback: () => void) {
      setTimeout(callback, 0);
    }
  };
}
if (typeof window !== 'undefined' && typeof (window as any).process === 'undefined') {
  (window as any).process = (globalThis as any).process;
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
