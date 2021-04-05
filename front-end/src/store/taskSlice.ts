import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { useAppDispatch } from './hooks'
import { AppDispatch, Appthunk } from './index'
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
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks = [...state.tasks, action.payload]
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


export const fetchTasks = () => async (dispatch:any) => {
    const tasksRes = await fetch('/api/tasks/')
    const data = await tasksRes.json()
    dispatch(taskSlice.actions.setTaskList(data))
  };

export const addTask = (title:string, description:string, list_id?:number) => async (dispatch:any) => {
    const taskRes = await fetch('/api/tasks/', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'title':title,
            'description':description,
            'list_id':list_id
        })
    })
    const data = await taskRes.json()
    dispatch(taskSlice.actions.addTask(data))
}