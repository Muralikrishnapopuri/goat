import ReactDOM from 'react-dom/client';
import React from 'react';
import ThemeContent from  './ThemeContext.jsx';
import App from'./App.jsx';
import CountContext  from './CountContext.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContent>
    <CountContext>
 <App/>
    </CountContext>
   
  </ThemeContent>
)
