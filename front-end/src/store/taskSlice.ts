import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
    tasks:[]
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
        // addTaskList: (state, action: PayloadAction<Task>) => {
            
        // }
    }
})

export const {setTaskList, removeTask} = taskSlice.actions

export default taskSlice.reducer