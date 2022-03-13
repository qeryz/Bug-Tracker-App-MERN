import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box, InputLabel, MenuItem, FormControl, Select, } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

// Get current id

const Form = ({ currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '', priority: '', status: '', });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)) ;
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post); 

    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updatePost(currentId, { ...postData } ));
        }
        else{
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        }

        clear();
        
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In To Create Your Post.
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', priority: '', status: '', });
    }

    const clearImage = () => {
        setPostData({ ...postData, selectedFile: ''});
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Edit' : 'Report' } a Bug</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title}onChange={(e) => setPostData( { ...postData, title: e.target.value })}/>
                <TextField name='message' variant='outlined' label='Description' fullWidth multiline rows={4} value={postData.message}onChange={(e) => setPostData( { ...postData, message: e.target.value })}/>
                <TextField name='tags' variant='outlined' label='Project Tags' fullWidth value={postData.tags}
                onChange={(e) => setPostData( { ...postData, tags: e.target.value.toLowerCase().trim().split(',') })}/>
                
                <Box className= {classes.fileInput} sx={{ m: 1, minWidth: 120 }} >
                    <FormControl className= {classes.priority} variant="outlined">
                        <InputLabel>Priority</InputLabel>
                        <Select
                        value={postData.priority? postData.priority: ''}
                        label="Priority"
                        
                        onChange={(e) => setPostData( { ...postData, priority: e.target.value })}
                        >
                        <MenuItem value={'High'}>High</MenuItem>
                        <MenuItem value={'Medium'}>Medium</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className= {classes.fileInput} sx={{ m: 1, minWidth: 120 }} >
                    <FormControl className= {classes.priority} variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                        value={postData.status? postData.status: ''}
                        label="Status"
                        
                        onChange={(e) => setPostData( { ...postData, status: e.target.value })}
                        >
                        <MenuItem value={'Open'}>Open</MenuItem>
                        <MenuItem value={'In Progress'}>In Progress</MenuItem>
                        <MenuItem value={'To Be Tested'}>To Be Tested</MenuItem>
                        <MenuItem value={'Reopen'}>Reopen</MenuItem>
                        <MenuItem value={'Closed'}>Closed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>    

                <div className={classes.fileInput}> <FileBase type ='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} /> </div>
                <div className={classes.fileInput}> <Button disabled={!postData.selectedFile} style= {{minWidth: '35%'}} variant='outlined' color='secondary' size='small' onClick={clearImage} >Clear Image</Button> </div>
                <Button disabled={(!postData.title) || (!postData.message) || (!postData.priority) || (!postData.status) } className={classes.buttonSubmit} 
                variant='contained' color='primary' size='large' type='submit' endIcon={<SendIcon />} fullWidth >{currentId ? 'Submit Edit' : 'Submit'}</Button>
                <Button disabled={(!postData.title) && (!postData.message) && (!postData.tags)} variant='contained' color='secondary' 
                size='small' onClick={clear} fullWidth>Clear Form</Button>
            </form>
        </Paper>
    );
}

export default Form;