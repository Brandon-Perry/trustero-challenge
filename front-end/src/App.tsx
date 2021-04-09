import React, { SyntheticEvent, useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks'
import taskSlice, {fetchTasks, createTask, deleteTask, editTask, createComment, deleteComment, TaskWithCallbacks} from './store/taskSlice'
import {fetchLists, createList, deleteList, editList} from './store/listsSlice'
import { Box, Button, Container, createStyles, Grid, makeStyles, Paper, Theme, Typography, TextField, Select, MenuItem, FormHelperText } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import TaskItem from './components/TaskItem'
import SideBar from './components/SlideBar'
import EditListModal from './components/EditListModal'

import {Task} from './store/taskSlice'
import {List} from './store/listsSlice'
import { Nullish } from '@testing-library/dom';

export const useStyles = makeStyles((theme:Theme)=> {
  return createStyles({
    container: {
      display:'flex',
      justifyContent:'center',
      flexDirection:'row'
    },
    sideBarContainer: {
      padding:theme.spacing(2),
      maxWidth:'30vw'
    },
    dialogue: {
      margin: theme.spacing(2)
    },
    paperBody: {
      padding:theme.spacing(2),
      minHeight:'80vh',
      display:'flex',
      // justifyContent: 'center',
      // flexDirection: 'row'
    },
    paperHead: {
      padding:theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    paperSideBar: {
      padding: theme.spacing(2)
    },
    sideBarBox: {
      padding: theme.spacing(2)
    },
    taskGrid: {
      spacing: 1,
      // justifyContent:"space-evenly",
      alignContent:"center",

    },
    commentBox: {
      padding: theme.spacing(1),
      wordWrap:'break-word'
    },
    taskItem: {
      width: '400px',
    },
    paperItem: {
      width:'400px',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      }
    },
    paperItemCompleted: {
      width: '400px',
      backgroundColor: '#757575'
    },
    addTaskBox: {
      display:'flex',
      justifyContent: 'center',
      width:'500px'
    },
    taskItemText: {

    },
    taskItemTextCompleted: {
      textDecoration: 'line-through'
    },
    trashCan: {
      fontSize:60,
      '&:hover': {
        color: '#424242',
        
      }
    },
    smallIcon: {
      '&:hover': {
        color: '#424242',
      }
    }
  })
})


function App() {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const taskList:Task[] = useAppSelector(state => state.taskSlice.tasks)
  const listList:List[] = useAppSelector(state => state.listsSlice.lists)

  const [taskField, setTaskField] = useState<string>('')
  const [sideBarStatus, setSideBarStatus] = useState<boolean>(false)
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [selectedTaskId, setSelectedTaskId] = useState<number|null>(null)
  const [selectedListId, setSelectedListId] = useState<number|'None'>('None')

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

  const changeModalStatus = (e:any) => {
    setModalStatus(!modalStatus)
  }

  const injectCallbacks = (task:Task) => {
    const data:TaskWithCallbacks = {
      ...task,
      callBacks: {
        setSelectedTaskId: setSelectedTaskId,
        setSideBarStatus: setSideBarStatus
      }
    }
    return <TaskItem {...data} />
  }

  const displayTasks = (task:Task) => {
    if (selectedListId === task.list_id || selectedListId === 'None') {
      return injectCallbacks(task)
    } else {
      return null
    }
  }

  const displayModal = () => {
    const task = taskList.filter((task:Task) => task.id === selectedTaskId)[0]
    return <SideBar {...task} />
  }

  const changeSelectedListId = (e:any) => {
    setSelectedListId(e.target.value)
  }  

  const deleteSelectedTasks = (e:any) => {
    for (let task of taskList) {
      if (task.status) {//if task is complete 
        dispatch(deleteTask(task.id))
      }
    }
  }

  
  
  return (
    <Container className={classes.container}>
      <EditListModal isOpen={modalStatus} closeFunc={setModalStatus} />
      {/* Header Area */}
      <Box>
      <Paper className={classes.paperHead}>
        <Box className={classes.addTaskBox}>
          {/* <button onClick={changeSideBarStatus}>Press me</button> */}

          <TextField 
            onKeyPress={enterTask} 
            onChange={updateTaskField}
            value={taskField} 
            fullWidth={true} 
            id="new_task_field" 
            label="New Task - Press Enter" 
            variant="outlined" 
          />
          <DeleteForeverIcon onClick={deleteSelectedTasks} className={classes.trashCan}/>

        </Box>
      </Paper>

      {/* Body */}
      <Paper className={classes.paperBody}>

       

        {/* Task Items */}
        <Grid 
          container 
          direction='column' 
          alignItems="center"
          spacing={1}
        >
           {/* Task filter */}
          <Box display='flex' flexDirection='row'>
            <Box>
              <Select value={selectedListId} onChange={changeSelectedListId}>
                <MenuItem value={"None"}>None</MenuItem>
                {listList ? listList.map((list:List) => (
                  <MenuItem value={list.id}>{list.name}</MenuItem>
                )) 
                : null} 
              </Select>
              <FormHelperText>Filter by List</FormHelperText>
            </Box>
          <EditIcon className={classes.smallIcon} display='inline' onClick={changeModalStatus}/>

          </Box>

          {taskList ? taskList.map((task:Task) => (
            displayTasks(task)
          )) : null}
        </Grid>
      </Paper>
      </Box>

      {/* Side bar */}
      <Box>
        {sideBarStatus ? 
          displayModal()
        : null}
      </Box>
    </Container>
  );
}

export default App;
