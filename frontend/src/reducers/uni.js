import { UNI } from "../constants/actionTypes"

const uniReducer = (state = {uni: []}, action) => {
    switch(action.type)
    {
        case UNI:
            return {
                ...state,
                uni: action.payload
            };
        default:
            return state;
    }
}

export default uniReducer