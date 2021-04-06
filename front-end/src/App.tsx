import React, { useEffect } from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks'
import taskSlice from './store/taskSlice'
import listsSlice from './store/listsSlice'
import {fetchTasks, createTask, deleteTask, editTask, createComment, deleteComment} from './store/taskSlice'
import {fetchLists, createList, deleteList, editList} from './store/listsSlice'

function App() {

  const taskList = useAppSelector(state => state.taskSlice.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchLists())
  },[])

  useEffect(() => {
    console.log(taskList)
  }, [taskList])

  const dispatch = useAppDispatch()

  const getInfo = async () => {
    dispatch(deleteComment(9,3))
    
  }

  return (
    <div className="App">
      
          <button onClick={getInfo}>Log test</button>

        
    </div>
  );
}

export default App;
