import React from 'react';
import { Grid, CircularProgress, Typography, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts) ;
    const classes = useStyles();

    if (!posts.length && !isLoading) return (
        <>
            <Typography variant='h4' align='center'> No Posts Found.</Typography>
        </>            
    );

    return (
        isLoading ? <CircularProgress/> : (
            <>
            <Typography variant='h4'
            style={{ display: 'flex', fontSize: '25px', marginTop: '0.3rem', marginBottom: '0.7rem' }} 
            >Recent Tickets</Typography>           
            <Divider />
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} xl={4} > 
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
            </>
        )
    );
}

export default Posts;