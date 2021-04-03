import React from 'react';
import './App.css';

function App() {

  const getInfo = async () => {
    let tasksRes = await fetch('/api/tasks/7', {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'},
      
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
