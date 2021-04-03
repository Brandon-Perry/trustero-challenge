import {createSlice} from '@reduxjs/toolkit'

const initialState:any[] = []

const todoSlice = createSlice({
    name: 'stuff',
    initialState,
    reducers: {
        todoAdded(state, action) {
            state.push(action.payload)
        },
        todoToggled(state,action) {
            const todo = state.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
        }
    }
})

export const {todoAdded, todoToggled} = todoSlice.actions

export default todoSlice.reducer