import { Grid, Theme, Paper, ThemeProvider, Checkbox } from '@material-ui/core'
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
            <Paper className={classes.paperItem}>
                <Checkbox onClick={checkTask} />{title}
            </Paper>
        </Grid>
    )
}

export default TaskItem