import { Container, Box, TextField, Typography, Button, Select, MenuItem } from '@material-ui/core';
import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from 'react';
import {Task, Comment, createComment, editTask} from '../store/taskSlice'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import { List } from '../store/listsSlice';
import { idText } from 'typescript';


const SlideBar = ({id, title, description, list_id, status, comments}:Task) => {
    const dispatch = useAppDispatch()
    let listsList = useAppSelector<List[]>(state => state.listsSlice.lists)
    
    const [titleValue, setTitleValue] = useState<string>(title)
    const [descriptionValue, setDescriptionValue] = useState<string>(description)
    const [newCommentValue, setNewCommentValue] = useState<string>('')
    const [selectedListId, setSelectedListId] = useState<number>(list_id)

    useEffect(()=> {
        setTitleValue(title)
        setDescriptionValue(description)
        setSelectedListId(list_id)
        setNewCommentValue('')
    },[id]) //Values carry on from previously selected tasks because the component doesn't rerender. This in effect cleans it up

    const updateTitleValue = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setTitleValue(e.target.value)
    }

    const updateDescriptionValue = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionValue(e.target.value)
    }

    const updateNewCommentValue = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setNewCommentValue(e.target.value)
    }

    const enterComment = (e:KeyboardEvent) => {
        if (e.code === 'Enter' && newCommentValue) {
            dispatch(createComment(newCommentValue, id))
            setNewCommentValue('')
        }
    }

    const changeSelectedListId = (e:any) => {
        setSelectedListId(e.target.value)
    }

    const submitChanges = () => {
        dispatch(editTask(id,titleValue,descriptionValue,status,selectedListId))
    }

    


    return (
    <Container>
        {/* Text field for title */}
        <Box>
            <TextField 
                onChange={updateTitleValue}
                value={titleValue}
                label={'Task Name'}
                variant='outlined'
            />
        </Box>

        {/* Text field for description */}
        <Box>
            <TextField 
                onChange={updateDescriptionValue}
                value={descriptionValue}
                label={'Task Description'}
                variant='outlined'
            />
        </Box>

        {/* Select field for lists */}
        <Box>
            <Select
                value={selectedListId}
                onChange={changeSelectedListId}
            >
                {listsList ? listsList.map((list:List) => (
                    <MenuItem value={list.id}>{list.name}</MenuItem>
                ))
                : null}

            </Select>
        </Box>

        {/* Task status */}
        <Box>
            <Typography>Status: {status ? 'Done' : 'In Progress'}</Typography>
        </Box>

        {/* Submit button */}
        <Box>
            <Button onClick={submitChanges}>Save Changes</Button>
        </Box>

        {/* Comments */}
        <Box>
            <Typography>Comments</Typography>
            {comments ? comments.map((comment:Comment) => (
                <Typography>{comment.comment_text}</Typography>
            )): null}

            {/* Textfield for comments */}
            <Box>
                <TextField
                    onKeyPress={enterComment}
                    onChange={updateNewCommentValue} 
                    value={newCommentValue}
                    label={'Enter Comment Here - Press Enter'}
                    variant={'outlined'}
                    multiline={true}
                    rows={3}
                    rowsMax={Infinity}
                />
            </Box>

        </Box>
    </Container>
    )
}

export default SlideBar