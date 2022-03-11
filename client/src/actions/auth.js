import { AUTH, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate, setIsWrong) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data});

        setIsWrong(false);

        navigate('/');
    }
    catch (error) {
        if (error.response.status === 400){
            console.log('400 error, invalid credentials');
            setIsWrong(true);
        }
        if (error.response.status === 404){
            console.log('404 error, user does not exist');
            setIsWrong(true);
        }
    }
};

export const signup = (formData, navigate, setIsExistingUser, setIsWrongPassword) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data});

        navigate('/');
    }
    catch (error) {
        if (error.response.status === 404){
            console.log('404 error, user already exists');
            setIsExistingUser(true);
        }
        if (error.response.status === 400){
            console.log('400 error, passwords do not match');
            setIsWrongPassword(true);
        }
    }
};
