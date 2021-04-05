import React, { useEffect } from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks'
import taskSlice from './store/taskSlice'
import {fetchTasks, addTaskListThunk, addTask, deleteTask} from './store/taskSlice'

function App() {

  const taskList = useAppSelector(state => state.taskSlice.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  },[])

  useEffect(() => {
    console.log(taskList)
  }, [taskList])

  const dispatch = useAppDispatch()

  const getInfo = async () => {
    dispatch(deleteTask(2))
    
  }

  return (
    <div className="App">
      
          <button onClick={getInfo}>Log test</button>

        
    </div>
  );
}

export default App;
