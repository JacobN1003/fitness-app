import React from 'react'
import './css/app.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Home />
    </div>
  );
}

export default App;
