import { Grid, Theme, Paper, ThemeProvider, Checkbox } from '@material-ui/core'
import React from 'react'
import {Task} from '../store/taskSlice'
import {useStyles} from '../App'

const TaskItem = ({id, title}:Task) => {
    const classes = useStyles()

    return (
        <Grid item className={classes.taskItem}>
            <Paper>
                <Checkbox />{title}
            </Paper>
        </Grid>
    )
}

export default TaskItem