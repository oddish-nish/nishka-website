import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// Console Easter Egg
console.log('%cHey :)', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');
console.log('%cIf you\'re reading this, you\'re probably curious.', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');
console.log('%cThat\'s my favorite trait in people.', 'font-size: 20px; font-weight: bold; color: #D89BA5; font-family: Inter, sans-serif;');
console.log('%cType oddish if you\'re still here.', 'font-size: 14px; color: #9A8BAA; font-family: Inter, sans-serif;');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


