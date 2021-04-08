import { Grid, Theme, Paper, ThemeProvider, Checkbox, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import {TaskWithCallbacks, editTask} from '../store/taskSlice'
import {useStyles} from '../App'
import { useAppDispatch } from '../store/hooks'

const TaskItem = ({id, title, description, list_id, status, callBacks}:TaskWithCallbacks) => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const [isChecked, setChecked] = useState<boolean>(status)

    const checkTask = () => {
        if (isChecked) {
            setChecked(false)
            dispatch(editTask(id,undefined,undefined,false))
        } else if (!isChecked) {
            setChecked(true)
            dispatch(editTask(id,undefined,undefined,true))
        }
    }

    const openModal = () => {
        callBacks.setSelectedTaskId(id)
        // callBacks.setSideBarStatus(false)
        callBacks.setSideBarStatus(true)
    }

    return (
        <Grid onClick={openModal} item className={classes.taskItem}>
            <Paper className={status ? classes.paperItemCompleted : classes.paperItem}>
                <Checkbox checked={status} onClick={checkTask} />
                <Typography 
                    className={status ? classes.taskItemTextCompleted : classes.taskItemText} display={'inline'}>{title} {list_id}</Typography>
            </Paper>
        </Grid>
    )
}

export default TaskItem