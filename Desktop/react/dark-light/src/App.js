import React, { useState} from 'react'
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="container">
        <span className={{color:darkMode ? 'gray' : 'yellow'}}>
        🔅
        </span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={()=> setDarkMode(!darkMode)} />
            <span className="slider round"></span>
          </label>
        </div>
        <span className={{color:darkMode ? 'yellow' : 'gray'}}>
        🌛
        </span>
      </div>
      <div>
        <h1>Its Time: {darkMode ? "Dark" : "Light"} Mode</h1>
      </div>
    </div>
  );
}

export default App;
