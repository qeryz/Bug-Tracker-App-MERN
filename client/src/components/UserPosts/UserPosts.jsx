import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const UserPosts = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
        dispatch(getPostsBySearch({ tags: name }));
    } 
    else {
        dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return (
    <div style={{ paddingTop: '6rem' }}>
        <Typography style= {{ display: 'flex', justifyContent: 'center' }} variant='h5'>No Posts Found.</Typography>
    </div>
  );

  return (
    <div style={{ paddingTop: '5rem' }}>
      {isLoading ? <CircularProgress /> : (
        <>
          <Typography variant="h6">{location.pathname.startsWith('/tags')? `Displaying Posts With Tag "${name}" ` : 
          `Displaying Posts For User "${posts[0]?.name}"` }
          </Typography>
          <Divider style={{ margin: '20px 0 50px 0' }} />
          <Grid container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserPosts;