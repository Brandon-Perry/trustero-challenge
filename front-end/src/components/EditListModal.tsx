import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import {Dialog, DialogTitle, List, ListItem, ListItemText, Box, TextField} from '@material-ui/core/';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { editList, List as ListInterface}  from '../store/listsSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


import {createList, deleteList} from '../store/listsSlice'
import taskSlice, { deleteTask, Task } from '../store/taskSlice';
import {useStyles} from '../App'


const EditListModal = ({isOpen, closeFunc}:any) => {

    const classes = useStyles()

    const dispatch = useAppDispatch()
    
    const listLists:ListInterface[] = useAppSelector(state => state.listsSlice.lists)
    const taskList:Task[] = useAppSelector(state => state.taskSlice.tasks)
    const [newListValue, setNewListValue] = useState<string>('')
    const [editListValue, setEditListValue] = useState<string>('')
    const [editListId, setEditListId] = useState<number|null>(null)

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

    const focusListEdit = (list_id:number, list_name:string) => {
        setEditListId(list_id)
        setEditListValue(list_name)
    }

    const submitListEdit = (e:KeyboardEvent) => {
        if (e.code === 'Enter' && editListId) {
            dispatch(editList(editListId,editListValue))
            setEditListValue('')
            setEditListId(null)
        }
    }
    

    return (
       <Dialog
        open={isOpen}
        onClose={()=> closeFunc(false)}
       >
           <Box className={classes.dialogue}>
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
                        return (
                        <ListItem>
                            {editListId === list.id ? 
                            <TextField 
                                value={editListValue}
                                onFocus={()=> setEditListValue(list.name)}
                                onChange={(e)=> setEditListValue(e.target.value)}
                                onKeyPress={submitListEdit}
                            />
                            : <ListItemText primary={list.name} />}
                            <EditIcon onClick={()=> focusListEdit(list.id, list.name)} />
                            <DeleteForeverIcon className={classes.smallIcon} onClick={()=>deleteListFunc(list.id)}/>
                        </ListItem>)
                    })}
                </List>
            </Box>

       </Dialog>
    )
}


export default EditListModal