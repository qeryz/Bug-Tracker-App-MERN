import React, { useState, useEffect, } from 'react';
import {  AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


import useStyles from './styles';
import BugReportOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import Hidden from '@mui/material/Hidden';


import { Stack } from '@mui/material';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const userId = user?.result?.googleId || user?.result?._id;

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
            <AppBar className = {classes.appBar} sticky= 'top' color='inherit'>
                <div className={classes.brandContainer}>
                    <Hidden mdDown>
                        <Typography component={Link} to='/' className={classes.heading} variant='h4' align='center'>BugTracker</Typography>
                    </Hidden>
                    <BugReportOutlinedIcon fontSize='large' className={classes.image}/>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <Stack direction='row' spacing={{xs: 7, sm: 8, md: 6, lg: 40, xl: 75}} style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}> 
                            <Stack direction='row' spacing={{xs: 1, sm: 3, md: 4}} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            }}>
                                <Stack spacing={1} direction='row' component={Link} to='/' style={{ textDecoration: 'none'}}>
                                    <div className={classes.navbarItems}>
                                        <HomeOutlinedIcon align='center' style={{ margin: '6px', fontSize: '25' }} />
                                        <Typography variant='overline' style={{ fontSize: '14px', paddingTop: '3px' }}><Hidden smDown>Home</Hidden></Typography>
                                    </div>
                                    
                                </Stack>
                                
                                <Stack spacing={1} direction='row' component={Link} to={`/creator/${userId}`} style={{ textDecoration: 'none'}}>
                                    <div className={classes.navbarItems}>
                                        <FeedOutlinedIcon fontSize='large' align='center' style={{ margin: '6px', fontSize: '25' }} />
                                        <Typography variant='overline' style={{ fontSize: '14px', paddingTop: '3px' }}><Hidden smDown>My Posts</Hidden></Typography>
                                    </div>
                                </Stack>
                                
                            </Stack>
                        
                            <Stack direction='row' spacing={1}>
                                <Avatar className={classes.purple} alt={user?.result.name} src={(user?.result?.imageUrl)}>{user?.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant='subtitle1'><Hidden mdDown>{user?.result.name}</Hidden></Typography>
                                <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}><Hidden smDown>Sign Out</Hidden><LoginOutlinedIcon /></Button>
                            </Stack>
                        </Stack>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'><Hidden smDown>Sign In</Hidden>&nbsp;<LogoutOutlinedIcon /></Button>
                    )}
                </Toolbar>                
            </AppBar>
        </div>
    )
}

export default Navbar
