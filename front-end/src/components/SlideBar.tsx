import { Container, Box, TextField, Typography, Button, Select, MenuItem, Paper, Divider } from '@material-ui/core';
import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from 'react';
import {Task, Comment, createComment, editTask, editComment, deleteComment} from '../store/taskSlice'
import {useAppDispatch, useAppSelector} from '../store/hooks'
import { List } from '../store/listsSlice';
import EditIcon from '@material-ui/icons/Edit';
import {useStyles} from '../App'
import { ContactlessOutlined, DeleteForever } from '@material-ui/icons';


const SlideBar = ({id, title, description, list_id, status, comments}:Task) => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    let listsList = useAppSelector<List[]>(state => state.listsSlice.lists)
    
    const [titleValue, setTitleValue] = useState<string>(title)
    const [descriptionValue, setDescriptionValue] = useState<string>(description)
    const [newCommentValue, setNewCommentValue] = useState<string>('')
    const [selectedListId, setSelectedListId] = useState<number>(list_id)
    const [commentEditID, setCommentEditID] = useState<number|null>(null)
    const [commentEditText, setCommentEditText] = useState<string>('')

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

    const submitEditCommentText = (e:KeyboardEvent) => {
        if (e.code === 'Enter' && commentEditID) {
            dispatch(editComment(commentEditText, commentEditID))
        }
    }

    const focusCommentEdit = (comment_text:string, comment_id:number) => {
        setCommentEditID(comment_id)
        setCommentEditText(comment_text)
    }

    const changeSelectedListId = (e:any) => {
        setSelectedListId(e.target.value)
    }

    const submitChanges = () => {
        dispatch(editTask(id,titleValue,descriptionValue,status,selectedListId))
    }

    
    const deleteCommentDispatch = (comment_id:number, task_id:number) => {
        dispatch(deleteComment(comment_id, task_id))
    }

    return (
    <Container className={classes.sideBarContainer}>
        {/* Text field for title */}
        <Paper className={classes.paperSideBar}>
        <Box className={classes.sideBarBox}>
            <TextField 
                onChange={updateTitleValue}
                value={titleValue}
                label={'Task Name'}
                variant='outlined'
            />
        </Box>

        <Divider />

        {/* Text field for description */}
        <Box className={classes.sideBarBox}>
            <TextField 
                onChange={updateDescriptionValue}
                value={descriptionValue}
                label={'Task Description'}
                variant='outlined'
                multiline={true}
                rows={2}
                rowsMax={Infinity}
        />
        </Box>

        <Divider />

        {/* Select field for lists */}
        <Box className={classes.sideBarBox}>
            List: <Select
                value={selectedListId}
                onChange={changeSelectedListId}
            >
                {listsList ? listsList.map((list:List) => (
                    <MenuItem value={list.id}>{list.name}</MenuItem>
                ))
                : null}

            </Select>
        </Box>

        <Divider />

        {/* Task status */}
        <Box className={classes.sideBarBox}>
            <Typography>Status: {status ? 'Done' : 'In Progress'}</Typography>
        </Box>

        <Divider />

        {/* Submit button */}
        <Box className={classes.sideBarBox}>
            <Button variant='outlined' onClick={submitChanges}>Save Changes</Button>
        </Box>

        {/* Comments */}
        <Box className={classes.sideBarBox}>
            <Typography>Comments</Typography>
            {comments.map((comment:Comment) => {
                return (
                    <Box className={classes.commentBox}>
                        {console.log(commentEditText)}
                        {commentEditID === comment.id ? 
                        <TextField 
                        value={commentEditText}
                        onFocus={()=> setCommentEditText(comment.comment_text)}
                        onChange={(e)=> setCommentEditText(e.target.value)}
                        onKeyPress={submitEditCommentText}
                        /> 
                        : comment.comment_text}
                        <EditIcon onClick={()=> focusCommentEdit(comment.comment_text, comment.id)} />
                        <DeleteForever onClick={()=> deleteCommentDispatch(comment.id, comment.task_id)} />
                    </Box>
                )
            })}
            
              
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
        </Paper>
    </Container>
    )
}

export default SlideBar