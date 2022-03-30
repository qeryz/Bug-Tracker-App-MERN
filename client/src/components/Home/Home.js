import React, {useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import { getPostsBySearch } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const query = useQuery();
    const page =  query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        
        if (!user?.result?.name) { // If user is not authenticated, redirect to login page
            navigate('/auth');
        }
        

    }, []);

    const searchPost = () => {
        if (search.trim() || tags) {
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        }
        else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPost();
        }
    };

    // console.log(tags);

    return (
        <div style={{ marginTop: '5rem'}}>
            {(!searchQuery && !tags.length) && (
                <Paper position='sticky' className={classes.pagination} elevation={6}>
                    <Pagination page={page} />
                </Paper>
            )}
            <Grow in>
                <Container className={classes.homeContainer} maxWidth='xl'>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={8} className={classes.gridContainer}>
                        
                        <Grid item xs={12} sm={6} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                            <AppBar className={classes.appBarSearch} align='center' position='static' color='inherit'>
                                <Typography align='center' gutterBottom variant='h6'>Search Posts</Typography>
                                <TextField name='search' type='search' variant='outlined' label='Search Keywords' fullWidth value={search} onKeyPress={handleKeyPress} 
                                onChange={(e, reason) => {
                                    setSearch(e.target.value)
                                    if (e.target.value === '')
                                        navigate(-1);
                                }} 
                                />
                                <Autocomplete
                                    multiple
                                    options={[]}
                                    freeSolo
                                    value={tags}
                                    onChange={(e, newval, reason) => {
                                        if (!/\s/.test(e.target.value)) // if tag contains no spaces, set tag
                                            setTags(newval);
                                        if (reason === 'clear')
                                            navigate(-1);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        style={{ margin: '10px 0'}}
                                        variant='outlined'
                                        label='Search Project Tags'
                                        onKeyDown={e => {
                                            if (e.key === ' ' && !tags.includes(e.target.value)) {
                                                if (!/\s/.test(e.target.value)){
                                                    setTags(tags.concat(e.target.value));
                                                }
                                            }
                                        }}
                                        />
                                    )}
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                            </AppBar>
                            <Form currentId = {currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
            {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page} />
                </Paper>
            )}
        </div>
    )
}

export default Home
