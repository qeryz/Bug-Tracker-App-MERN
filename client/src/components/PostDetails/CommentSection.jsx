import React, { useEffect, useRef, useState  } from 'react';
import { Typography, TextField, Button, Divider, Chip, Box, Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commentsRef = useRef(); // For automatic scroll to most recent user comment

    useEffect(() => {
        
    if (!user?.result?.name) { // If user is not authenticated, redirect to login page
        navigate('/auth');
    }
        

    }, []);

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    
    return (
    <div>
        <Typography gutterBottom variant='h6'>Comments: </Typography>
        <Divider />
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                {comments.length > 0 ? (
                    comments.map((c, i) => (
                    <Typography key={i} gutterBottom variant='subtitle1'>
                        <Stack direction='row' spacing={2}>
                            <Avatar style={{ width: '32px', height: '32px', margin: '4px', marginTop: '14px' }}>{c.charAt(0)}</Avatar>
                            <Chip variant='filled'
                                style={{ padding: '25px', paddingLeft: '4px', paddingRight: '4px', margin: '2px', marginTop: '5px', color: 'black', borderColor: '#f0f2f5', backgroundColor: '#f0f2f5'}}
                                label={
                                    <div>
                                        <Typography variant='caption'><Box style={{ color: 'black' }}>{c.split(':')[0]}</Box></Typography>
                                        <Typography gutterBottom variant='caption'><Box style={{ color: '#5e5e5e' }}>{c.split(':')[1]}</Box></Typography>
                                    </div>
                                }
                                variant='outlined'                            
                            />
                        </Stack>                        
                    </Typography>
                    ))
                ) : (
                    <Typography style={{ display: 'flex', margin: '110px', justifyContent: 'center', color: 'grey'}}>No Comments.</Typography>
                    )
            
                }
                <div ref={commentsRef} />
            </div>
            <div style={{ width: '100%' }}> &nbsp;
                <TextField
                    fullWidth
                    rows={6}
                    variant='outlined'
                    label='Write a Comment'
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick}>
                    Comment
                </Button>
            </div>
        </div>
    </div>
    );
    
};

export default CommentSection;