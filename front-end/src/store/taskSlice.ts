import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { act } from 'react-dom/test-utils'
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
        changeTask: (state, action: PayloadAction<Task>) => {
            state.tasks.forEach((task:Task, i)=> {
                if (task.id === action.payload.id) {
                    state.tasks[i] = action.payload
                    return state.tasks
                }
            })
        },
        appendOne: (state, action: PayloadAction<Task>) => {
            state.tasks = [action.payload]
        },
    }
})

export const {setTaskList, removeTask, addTask, changeTask} = taskSlice.actions

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

export const createTask = (title:string, description:string, list_id?:number) => async (dispatch:any) => {
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

export const deleteTask = (id:number) => async (dispatch:any) => {
    const res = await fetch(`/api/tasks/${id}`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
    console.log(res)
    dispatch(taskSlice.actions.removeTask(id))
}

export const editTask = (id:number,title:string,description:string,list_id?:number) => async(dispatch:any) => {
    const taskRes = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'title': title,
            'description':description,
            'list_id':list_id
        })
    })
    console.log(taskRes)
    const data = await taskRes.json()
    console.log(data)
    dispatch(taskSlice.actions.changeTask(data))
}