import React, { useState, useEffect, } from 'react';
import {  AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles';
import BugReportOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import { Stack } from '@mui/material';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div>
            <AppBar className = {classes.appBar} position='static' color='inherit'>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant='h4' align='center'>BugTracker</Typography>
                    <BugReportOutlinedIcon fontSize='large' className={classes.image}/>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <Stack direction='row' spacing={2}>
                            <Avatar className={classes.purple} alt={user.result.name} referrerPolicy='no-referrer' src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                        </Stack>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )}
                </Toolbar>                
            </AppBar>
        </div>
    )
}

export default Navbar
