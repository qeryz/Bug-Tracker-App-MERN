import React, { useState, useEffect } from 'react';
import { Avatar, Paper, Button, Grid, Typography, Container, } from '@material-ui/core';
import { Alert } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';

import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', };

const Auth = () => {
    const classes = useStyles();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false); // Value for whether user clicks sign up or sign in

    const [ isWrong, setIsWrong ] = useState(false); // Flag for wrong sign in credentials
    const [ isExistingUser, setIsExistingUser ] = useState(false); // Flag for sign up, existing user
    const [ isWrongPassword, setIsWrongPassword ] = useState(false); // Flag for sign up, passwords do not match

    const [ formData, setFormData ] = useState(initialState);
    const user = JSON.parse(localStorage.getItem('profile'));   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (user?.result?.name) { // If user is authenticated, redirect to login page
            navigate('/');
        }


    }, [user, navigate, isWrong]);

    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword );

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsExistingUser(false);
        setIsWrongPassword(false);
        setIsWrong(false);

        if(isSignup) {
            dispatch(signup(formData, navigate, setIsExistingUser, setIsWrongPassword));
        }
        else {
            dispatch(signin(formData, navigate, setIsWrong));
        }

    };

    const handleChange = (e) => {
        setFormData( {...formData, [e.target.name]: e.target.value } );
    };

    const switchMode = () => {
        setIsSignup( (prevIsSignup) => !prevIsSignup );
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: { result, token } });
            navigate('/');
        }
        catch(error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later.")
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                { isWrong && (
                    <Alert severity="error">Invalid login credentials.</Alert>
                )}
                { isWrongPassword && (
                    <Alert severity="error">Passwords do not match.</Alert>
                )}
                { isExistingUser && (
                    <Alert severity="error">User with that email already exists.</Alert>
                )}
                <Typography variant='h5'>{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                            <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                        </>
                        ) }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password'} /> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='791074117034-lu7ek27r94q7e67qj53noag4i3ea042n.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Button fullWidth className={classes.switchSign} onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                    </Button>

                </form>
                
            </Paper>
        </Container>

    );
};

export default Auth;
