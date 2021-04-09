import { Comment } from '@material-ui/icons'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { act } from 'react-dom/test-utils'
import { TupleType } from 'typescript'
import { useAppDispatch } from './hooks'
import { AppDispatch, Appthunk } from './index'
// import {AppThunk} from './index'

export interface Comment {
    id:number,
    task_id:number,
    comment_text:string,
}

interface Comment_Delete {
    comment_id:number,
    task_id:number
}

interface passedCallBacks {
    setSideBarStatus: any,
    setSelectedTaskId: any
}

export interface Task {
    id:number,
    title:string,
    description:string,
    status:boolean,
    list_id:number,
    comments:Comment[],
}

export interface TaskWithCallbacks extends Task {
    callBacks: passedCallBacks
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
        addComment: (state, action: PayloadAction<Comment>) => {
            state.tasks.forEach((task:Task, i) => {
                if (task.id === action.payload.task_id) {
                    state.tasks[i].comments = [...state.tasks[i].comments, action.payload]
                    return state.tasks
                }
            })
        },
        changeComment: (state, action: PayloadAction<Comment>) => {
            state.tasks.map((task:Task) => {
                if (task.id === action.payload.task_id) {
                    task.comments.forEach((comment:Comment, i) => {
                        if (comment.id === action.payload.id) {
                            task.comments[i] = action.payload
                            return state.tasks
                        }
                    })
                }
            })
        },
        removeComment: (state, action: PayloadAction<Comment_Delete>) => {
            state.tasks.forEach((task:Task) => {
                if (task.id === action.payload.task_id) {
                    task.comments = task.comments.filter((comment:Comment) => comment.id !== action.payload.comment_id)
                    return state.tasks
                }
            })
        }
        
    }
})

export const {
    setTaskList, 
    removeTask, 
    addTask, 
    changeTask,
    addComment,
    removeComment
} = taskSlice.actions

export default taskSlice.reducer

// export const addTaskListThunk = (
//     text:string
// ): Appthunk => async (dispatch: AppDispatch) => {
//     const newTask : Task = {
//         id:20,
//         title: 'test',
//         description: text,
//         status: false,
//         list_id: 1,
//         comments: []
//     }

//     dispatch(taskSlice.actions.appendOne(newTask))
// }


export const fetchTasks = () => async (dispatch:any) => {
    const tasksRes = await fetch('/api/tasks/')
    const data = await tasksRes.json()
    dispatch(taskSlice.actions.setTaskList(data))
  };

export const createTask = (title:string, description?:string, list_id?:number) => async (dispatch:any) => {
    const taskRes = await fetch('/api/tasks/', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'title':title,
            'description':description,
            'list_id':list_id,
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

export const editTask = (id:number,title?:string,description?:string,status?:boolean,list_id?:number) => async(dispatch:any) => {
    const taskRes = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'title': title,
            'description':description,
            'list_id':list_id,
            'status':status
        })
    })
    const data = await taskRes.json()
    dispatch(taskSlice.actions.changeTask(data))
}

export const createComment = (comment_text:string, task_id:number) => async(dispatch:any) => {
    const commentRes = await fetch(`/api/comments/task/${task_id}`, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'comment_text':comment_text,
        })
    })
    const data = await commentRes.json()
    dispatch(taskSlice.actions.addComment(data))
}

export const editComment = (comment_text:string, id:number) => async(dispatch:any) => {
    const commentRes = await fetch(`/api/comments/${id}`, {
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'comment_text':comment_text,
        })
    })
    const data = await commentRes.json()
    console.log('thunk data', data)
    dispatch(taskSlice.actions.changeComment(data))
}

export const deleteComment = (comment_id:number,task_id:number) => async(dispatch:any) => {
    const res = await fetch(`/api/comments/${comment_id}`, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
    })
    // const data = await res.json()
    
    const dispatchedObj:Comment_Delete = {
        'comment_id':comment_id,
        'task_id':task_id
    }
    dispatch(taskSlice.actions.removeComment(dispatchedObj))
}