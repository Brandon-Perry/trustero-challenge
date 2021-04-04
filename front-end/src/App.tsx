import React from 'react';
import './App.css';
import {useAppDispatch} from './store/hooks'
import taskSlice from './store/taskSlice'
import {addTaskListThunk} from './store/taskSlice'

function App() {

  const dispatch = useAppDispatch()

  const getInfo = async () => {
    dispatch(addTaskListThunk('this is a test'))
    
  }

  return (
    <div className="App">
      
          <button onClick={getInfo}>Log test</button>
        
    </div>
  );
}

export default App;
