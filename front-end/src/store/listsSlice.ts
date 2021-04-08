import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { displayPartsToString } from 'typescript'
import { AppDispatch, Appthunk } from './index'


export interface List {
    id:number,
    name:string
}

export interface Lists {
    lists:List[]
}

export const initialState: Lists ={
    lists:[]
}

const listsSlice = createSlice({
    name:'lists',
    initialState,
    reducers: {
        setLists: (state, action: PayloadAction<List[]>) => {
            state.lists = action.payload
        },
        addList: (state, action: PayloadAction<List>) => {
            state.lists = [...state.lists, action.payload]
        },
        changeList: (state, action: PayloadAction<List>) => {
            state.lists.forEach((list:List, i) => {
                if (list.id === action.payload.id) {
                    state.lists[i] = action.payload
                    return state.lists
                }
            })
        },
        removeList: (state, action: PayloadAction<number>) => {
            let result = state.lists.filter((list:List) => list.id !== action.payload)
            state.lists = result
        }
    },

})

export const {setLists, addList, changeList, removeList} = listsSlice.actions

export default listsSlice.reducer


export const fetchLists = () => async (dispatch:any) => {
    const listsRes = await fetch('/api/lists/')
    const data = await listsRes.json()
    dispatch(listsSlice.actions.setLists(data))
}

export const createList = (name:string) => async (dispatch:any) => {
    const listRes = await fetch('/api/lists/', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'name':name
        })
    })
    const data = await listRes.json()
    dispatch(listsSlice.actions.addList(data))
}

export const deleteList = (id:number) => async (dispatch:any) => {
    const res = await fetch(`/api/lists/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
 
    dispatch(listsSlice.actions.removeList(id))
}

export const editList = (id:number, name:string) => async(dispatch:any) => {
    const listRes = await fetch(`/api/lists/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'name':name
        })
    })
    const data = await listRes.json()
    dispatch(listsSlice.actions.changeList(data))
}