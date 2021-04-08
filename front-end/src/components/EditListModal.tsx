import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import {Dialog, DialogTitle, List, ListItem, ListItemText, TextField} from '@material-ui/core/';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { List as ListInterface}  from '../store/listsSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {createList, deleteList} from '../store/listsSlice'
import taskSlice, { deleteTask, Task } from '../store/taskSlice';



const EditListModal = ({isOpen, closeFunc}:any) => {

    const dispatch = useAppDispatch()
    
    const listLists:ListInterface[] = useAppSelector(state => state.listsSlice.lists)
    const taskList:Task[] = useAppSelector(state => state.taskSlice.tasks)
    const [newListValue, setNewListValue] = useState<string>('')

    const changeNewListValue = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setNewListValue(e.target.value)
    }

    const enterList = (e:KeyboardEvent) => {
        if (e.code === 'Enter' && newListValue) {
          dispatch(createList(newListValue))
          setNewListValue('')
        }
    }

    const deleteListFunc = (id:number) => {
        let toDeleteTasks = taskList.filter((task:Task) => task.list_id === id)
        for (let task of toDeleteTasks) {
            dispatch(deleteTask(task.id))
        }
        dispatch(deleteList(id))
    }
    

    return (
       <Dialog
        open={isOpen}
        onClose={()=> closeFunc(false)}
       >
            <TextField 
                onKeyPress={enterList}
                value={newListValue}
                onChange={changeNewListValue}
                label={'Add List - Press Enter'}
                variant='outlined'
            />
            <DialogTitle>Edit Lists</DialogTitle>
            <List>
                {listLists.map((list:ListInterface)=> {
                    return (<ListItem>
                        <ListItemText primary={list.name} />
                        <DeleteForeverIcon onClick={()=>deleteListFunc(list.id)}/>
                    </ListItem>)
                })}
            </List>

       </Dialog>
    )
}


export default EditListModal