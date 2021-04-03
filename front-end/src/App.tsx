import React from 'react';
import './App.css';

function App() {

  const getInfo = async () => {
    let tasksRes = await fetch('/api/lists/4', {
      method: 'DELETE',
        
    })
      
    console.log(tasksRes)
    let tasksJson = await tasksRes.json()
    console.log(tasksJson)
  }

  return (
    <div className="App">
      
          <button onClick={getInfo}>Log test</button>
        
    </div>
  );
}

export default App;
