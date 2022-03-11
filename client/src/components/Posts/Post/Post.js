import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, CardActionArea, Chip, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/AttachmentOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);

    const getColorStatus = (post) => {
        if (post.status === 'Open') return classes.blueFilled;
        else if (post.status === 'In Progress') return classes.orangeFilled;
        else if (post.status === 'To Be Tested') return classes.redFilled;
        else if (post.status === 'Reopen') return classes.greenFilled;
        return classes.lightBlueFilled;
    };

    const getColorPriority = (post) => {
        if (post.priority === 'High') return classes.redOutline;
        else if (post.priority === 'Medium') return classes.orangeOutline;
        return classes.greenOutline;
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));
    
        if (hasLikedPost) {
          setLikes(post.likes.filter((id) => id !== userId));
        } else {
          setLikes([...post.likes, userId]);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize='small' />&nbsp;</>;
    };

    const openPost = (e) => {    
        navigate(`/posts/${post._id}`);
    };

    return (
        
        <Card className={classes.card} raised elevation={4}>
            <CardActionArea onClick={() => openPost() }>
                {/* {post.selectedFile && <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />} */}

                {post.selectedFile ? (
                <div className={classes.overlay3}>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Chip
                            icon={<AccountCircleIcon />}
                            label={post.name}
                            variant='outlined'                            
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Typography variant='caption' color='textSecondary'>{`Reported:  ${moment(post.createdAt).fromNow()} `}</Typography>
                        
                    </Stack>
                    <Stack direction='row' justifyContent='flex-end'>
                        <AttachmentIcon color='action' />
                    </Stack>
                    
                </div>) : (
                <div className={classes.overlay3}>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Chip
                            icon={<AccountCircleIcon />}
                            label={post.name}
                            variant='outlined'                            
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Typography variant='caption' color='textSecondary'>{`Reported:  ${moment(post.createdAt).fromNow()} `}</Typography>
                    </Stack>
                </div>) }

                <div className={classes.details}>
                    <Stack spacing={1}>
                        <Stack direction='row' spacing={1}>
                            <Chip className={ getColorStatus(post) } size='small' label={post.status.toUpperCase()} />
                        </Stack>
                        <Stack direction='row' spacing={1}>
                            { post.status !== 'Closed' && 
                            <Chip className={ getColorPriority(post) } size='small' variant='outlined' label={`Priority: ${post.priority} `} /> }
                        </Stack>
                        <Typography variant='body2' color='textSecondary'>{(post.tags[0] !== '') ? post.tags.map((tag) => `#${tag} `) : ''}</Typography>
                    </Stack>               
                </div>

                <Typography className={classes.title} variant= 'h5'>{post.title[0].toUpperCase() + post.title.substring(1) }</Typography>

                <CardContent>
                    <Typography variant= 'body2' color='textSecondary' component='p'>{post.message[0].toUpperCase() + post.message.substring(1) }</Typography>
                </CardContent>

            </CardActionArea>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                <Button 
                    color='primary' 
                    size='small' 
                    onClick={() => setCurrentId(post._id) }>
                    <EditIcon fontSize='small' />
                    &nbsp;
                </Button>
                
                {(userId === post?.creator) && (
                <>
                    <Button size='small' color='primary' onClick={handleClickOpen}>
                        <DeleteIcon fontSize='small' />
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle id='alert-dialog-title'>
                            {'Are you sure you would like to delete the post?'}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={() => (dispatch(deletePost(post._id)))} autoFocus>
                            Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
                )}
            </CardActions>
        </Card>
    );
}


export default Post;