import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = {token: null}, action) => {
    switch(action.type)
    {
        case AUTH:
            localStorage.setItem('token', JSON.stringify(action.payload));
            return {token: null};
        case LOGOUT:
            localStorage.clear();
            return {token: null};
        default:
            return state;
    }
};

export default authReducer;