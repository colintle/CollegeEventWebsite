import { APPROVED, UNAPPROVED, JOINED, STUDENTS } from "../constants/actionTypes"

const initialState = {
    approved: [],
    unapproved: [],
    joined: [],
    students: []
}

const rsoReducer = (state = initialState, action) => {
    switch(action.type){
        case APPROVED:
            return {
                ...state,
                approved: action.payload
            };
        case UNAPPROVED:
            return {
                ...state,
                unapproved: action.payload
            };
        case JOINED:
            return {
                ...state,
                joined: action.payload
            };
        case STUDENTS:
            return {
                ...state,
                students: action.payload
            } ;
        default:
            return state;
    }
}

export default rsoReducer