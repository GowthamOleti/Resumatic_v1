import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import './index.css'

// Optional: load Microsoft Clarity only if env var is present
const clarityId = import.meta.env.VITE_CLARITY_ID as string | undefined;
if (clarityId && typeof window !== 'undefined') {
  (function (c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Node) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r) as HTMLScriptElement; t.async = true; t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0]; y?.parentNode?.insertBefore(t, y);
  })(window as any, document, 'clarity', 'script', clarityId);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
