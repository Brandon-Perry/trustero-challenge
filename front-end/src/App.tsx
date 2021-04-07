import React, { SyntheticEvent, useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks'
import {fetchTasks, createTask, deleteTask, editTask, createComment, deleteComment} from './store/taskSlice'
import {fetchLists, createList, deleteList, editList} from './store/listsSlice'
import { Box, Button, Container, createStyles, Grid, makeStyles, Paper, Theme, Typography, TextField } from '@material-ui/core';

import TaskItem from './components/TaskItem'

import {Task} from './store/taskSlice'
import {List} from './store/listsSlice'

export const useStyles = makeStyles((theme:Theme)=> {
  return createStyles({
   
    paperBody: {
      padding:theme.spacing(2),
      minHeight:'80vh',
      display:'flex',
    },
    paperHead: {
      padding:theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    taskGrid: {
      spacing: 10,
      justifyContent:"space-evenly",
      alignContent:"center",

    },
    taskItem: {
      width: '400px'
    },
    paperItem: {
      width:'400px',
      
    },
    addTaskBox: {
      display:'flex',
      justifyContent: 'center',
      width:'500px'
    }
  })
})


function App() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  
  const taskList:Task[] = useAppSelector(state => state.taskSlice.tasks)
  const listList:List[] = useAppSelector(state => state.listsSlice.lists)

  const [taskField, setTaskField] = useState<string>('')

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchLists())
  },[])


  const enterTask = (e:KeyboardEvent) => {
    if (e.code === 'Enter' && taskField) {
      dispatch(createTask(taskField))
      setTaskField('')
    }
  }

  const updateTaskField = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setTaskField(e.target.value)
  }

  
  
  return (
    <Container>
      <Paper className={classes.paperHead}>
        <Box className={classes.addTaskBox}>

          <TextField 
            onKeyPress={enterTask} 
            onChange={updateTaskField}
            value={taskField} 
            fullWidth={true} 
            id="new_task_field" 
            label="New Task - Press Enter" 
            variant="outlined" 
          />

        </Box>
      </Paper>
      <Paper className={classes.paperBody}>
        <Grid 
          container 
          direction='column' 
          justify="space-evenly"
          alignItems="center"
        >
          {taskList ? taskList.map((task:Task) => (
            <TaskItem {...task} />
          )) : null}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
