import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CommentSection from './CommentSection';
import { useParams, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

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
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', }} elevation={6}>
      <div className={classes.imageSection}>
        {post.selectedFile && (
          <>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </>
        )}
      </div>
      
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>{post.title}</Typography>
          <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant='body1' component='p'>{post.message}</Typography>
          <Typography variant='h6'>Reported by: {post.name}</Typography>
          <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
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
            {recommendedPosts.map(({ title, name, message, likes, tags, selectedFile, _id }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} style={{ cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                  <Paper style={{ padding: '20px', borderRadius: '10px', }} elevation={3} >
                    <Typography gutterBottom variant='h6'>{title}&nbsp;</Typography>
                    <Typography gutterBottom color='textSecondary' variant='overline'>by: {name}</Typography>
                    <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                    <Typography gutterBottom variant='overline'>Project Tags: {tags.map((tag) => `#${tag} `)}</Typography>
                    <Grid container direction='row' alignItems='center'>
                      <ThumbUpAltIcon color='primary' fontSize='small' />
                      <Typography variant='body2' display='inline'>&nbsp;{likes.length}</Typography>
                    </Grid>
                    &nbsp;
                    <Divider /> &nbsp;
                    <img src={selectedFile} style={{ objectFit: 'cover', width: '100%', maxHeight: '200px'}} />
                  </Paper>  
                </Grid>     
            ))}
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default Post;