import { AUTH, LOGOUT, AUTH_ERROR } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case AUTH_ERROR:
            localStorage.setItem('error', 'true');
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;