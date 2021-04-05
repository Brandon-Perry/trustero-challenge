import React, { useEffect } from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks'
import taskSlice from './store/taskSlice'
import {fetchTasks, addTaskListThunk} from './store/taskSlice'

function App() {

  const taskList = useAppSelector(state => state.taskSlice.tasks)

  useEffect(() => {
    console.log(taskList)
  }, [taskList])

  const dispatch = useAppDispatch()

  const getInfo = async () => {
    dispatch(addTaskListThunk('this is a test'))
    dispatch(fetchTasks())
    
  }

  return (
    <div className="App">
      
          <button onClick={getInfo}>Log test</button>

        
    </div>
  );
}

export default App;
