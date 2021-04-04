import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AppDispatch, Appthunk } from '.'
// import {AppThunk} from './index'

export interface Comment {
    task_id:number,
    comment_text:string,
}

export interface Task {
    id:number,
    title:string,
    description:string,
    status:boolean,
    list_id:number,
    comments:Comment[]
}

export interface TaskList {
    tasks:Task[]
}


export const initialState: TaskList = {
    tasks:[],
}


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskList: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task:Task) => task.id !== action.payload)
        },
        appendOne: (state, action: PayloadAction<Task>) => {
            state.tasks = [action.payload]
        },
    }
})

export const {setTaskList, removeTask, appendOne} = taskSlice.actions

export default taskSlice.reducer

export const addTaskListThunk = (
    text:string
): Appthunk => async (dispatch: AppDispatch) => {
    const newTask : Task = {
        id:20,
        title: 'test',
        description: text,
        status: false,
        list_id: 1,
        comments: []
    }

    dispatch(taskSlice.actions.appendOne(newTask))
}