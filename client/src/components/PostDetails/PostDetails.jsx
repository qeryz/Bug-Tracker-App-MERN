import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Chip } from '@material-ui/core/';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CommentSection from './CommentSection';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  
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

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <div className={classes.postContainer} >
        <Paper elevation={6} className={classes.loadingPaper} >
          <CircularProgress size='8em' />
        </Paper>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className={classes.postContainer} >
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.imageSection}>
          {post.selectedFile && (
            <>
              <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </>
          )}
        </div>
        <div className={classes.card}>
          <div className={classes.section}>
          <Divider style={{ margin: '20px 0' }} />
            <Typography style={{ marginBottom: '0.2rem' }} variant='h3' component='h2'>{post.title}</Typography>
            <Typography variant='overline'>Reported by: </Typography>
            <Link to={`/creator/${post.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                <Chip 
                icon={<AccountCircleIcon style= {{ color: 'white'  }} />}
                style={{ padding: '15px', paddingLeft: '4px', paddingRight: '4px', cursor: 'pointer', color: 'white', backgroundColor: '#687b87'}}
                label={`${post.name}`} />
            </Link>
            <Typography display='block' style={{ marginBottom: '0.5rem' }} variant='caption'>{moment(post.createdAt).fromNow()}</Typography>
            <Stack style={{ marginBottom: '1.5rem', marginTop: '0.4rem' }} spacing={1}>
              <Stack direction='row' spacing={1}>
                <Chip className={ getColorStatus(post) } size='small' label={post.status.toUpperCase()} />
                { post.status !== 'Closed' && (<>
                <Chip className={ getColorPriority(post) } size='small' variant='outlined' label={`Priority: ${post.priority} `} /> </>) }
              </Stack>
            </Stack>       
            <Divider style={{ margin: '20px 0' }} />
            <Typography gutterBottom variant='body1' style={{ margin: '15px' }} component='p'>{post.message}</Typography>
            <Typography gutterBottom style={{ marginBottom: '1.5rem', marginLeft: '15px' }} variant='body1' color='textSecondary' component='h2'>Tags: {post.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }} key={tag}>
                <Chip display='block' 
                style={{ padding: '15px', paddingLeft: '2px', paddingRight: '2px', margin: '4px', cursor: 'pointer', color: 'white', backgroundColor: '#F50057'}}
                label={` #${tag} `} />
              </Link>
            ))}
            </Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>        
        </div>

        {!!recommendedPosts.length && (
          <div className={classes.recommendedPosts} >
            <Typography gutterBottom variant='h5'>Related Posts:</Typography>
            <Divider /> &nbsp;
            <Grid container spacing={2} >
              {recommendedPosts.map(({ title, name, message, likes,comments, tags, selectedFile, _id }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} style={{ cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    <Paper style={{ padding: '20px', borderRadius: '10px', }} elevation={3} >
                      <Typography gutterBottom variant='h6'>{title}&nbsp;</Typography>
                      <Typography gutterBottom color='textSecondary' variant='overline'>by: {name}</Typography>
                      <Typography gutterBottom variant='subtitle2'>{message.length > 190 ? `${message.substring(0,190)}...` : message }</Typography>
                      <Typography gutterBottom variant='overline'>Project Tags: {tags.map((tag) => `#${tag} `)}</Typography>
                      <Grid container direction='row' alignItems='center'>
                        <ThumbUpAltIcon color='primary' fontSize='small' />
                        <Typography variant='body2' display='inline'>&nbsp;{likes.length}</Typography>&nbsp;&nbsp; 
                        <MessageIcon style={{ color: '#BDBDBD' }} fontSize='small' />
                        <Typography variant='body2' display='inline'>&nbsp;{comments.length}</Typography>
                      </Grid>
                      &nbsp;
                      <Divider /> &nbsp;
                      <img src={selectedFile} alt='' style={{ objectFit: 'cover', width: '100%', maxHeight: '200px'}} />
                    </Paper>  
                  </Grid>     
                ))}
            </Grid>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Post;