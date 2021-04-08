import { Container, Box, TextField, Typography, Button, Select, MenuItem } from '@material-ui/core';
import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from 'react';
import {Task, Comment, createComment, editTask} from '../store/taskSlice'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import { List } from '../store/listsSlice';
import { idText } from 'typescript';


const SlideBar = ({id, title, description, list_id, status, comments}:Task) => {
    const dispatch = useAppDispatch()
    let listsList = useAppSelector(state => state.listsSlice.lists)
    
    const [titleValue, setTitleValue] = useState<string>(title)
    const [descriptionValue, setDescriptionValue] = useState<string>(description)
    const [newCommentValue, setNewCommentValue] = useState<string>('')
    const [selectedList, setSelectedList] = useState<List>()

    useEffect(()=> {
        setTitleValue(title)
        setDescriptionValue(description)
    },[id]) //Values carry on from previously selected tasks because the component doesn't rerender. This in effect cleans it up

    const cleanupFunction = () => {
        setTitleValue(title)
    }

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

    const submitChanges = () => {
        dispatch(editTask(id,titleValue,descriptionValue,status,list_id))
    }

    const changeSelectedList = (e:any) => {
        setSelectedList(e.target.value)
    }

    return (
    <Container>
        {console.log(title)}
        <Box>
            <TextField 
                onChange={updateTitleValue}
                value={titleValue}
                label={'Task Name'}
                variant='outlined'
            />
        </Box>
        <Box>
            <TextField 
                onChange={updateDescriptionValue}
                value={descriptionValue}
                label={'Task Description'}
                variant='outlined'
            />
        </Box>
        <Box>
            {/* <Select
                value={selectedList.name}
                onChange={changeSelectedList}
            >
                {listsList.map((list:List) => (
                    <MenuItem value={list}>{list.name}</MenuItem>
                ))}

            </Select> */}
        </Box>
        <Box>
            <Typography>Status: {status ? 'Done' : 'In Progress'}</Typography>
        </Box>
        <Box>
            <Button onClick={submitChanges}>Save Changes</Button>
        </Box>
        <Box>
            <Typography>Comments</Typography>
            {comments ? comments.map((comment:Comment) => (
                <Typography>{comment.comment_text}</Typography>
            )): null}
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