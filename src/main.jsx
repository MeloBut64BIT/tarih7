// EN BAŞA EKLEYIN - import'lardan önce bile
console.log('========== APP STARTING ==========');

// Hataları yakala ve ekranda göster
window.onerror = function(msg, url, lineNo, columnNo, error) {
  const errorMsg = `
    ERROR DETECTED:
    Message: ${msg}
    URL: ${url}
    Line: ${lineNo}
    Column: ${columnNo}
    Error: ${error}
  `;
  console.error(errorMsg);
  alert(errorMsg);
  
  // Ekranda da göster
  document.body.innerHTML = `<div style="padding:20px;color:red;font-family:monospace;white-space:pre-wrap;">${errorMsg}</div>`;
  return false;
};

window.addEventListener('unhandledrejection', function(event) {
  const errorMsg = `PROMISE ERROR: ${event.reason}`;
  console.error(errorMsg);
  alert(errorMsg);
  document.body.innerHTML = `<div style="padding:20px;color:red;font-family:monospace;">${errorMsg}</div>`;
});

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('========== IMPORTS LOADED ==========');

try {
  console.log('========== RENDERING APP ==========');
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('========== APP RENDERED ==========');
} catch (error) {
  console.error('RENDER ERROR:', error);
  alert('RENDER ERROR: ' + error.message);
  document.body.innerHTML = `<div style="padding:20px;color:red;">${error.message}</div>`;
}