import { RATING } from "../constants/actionTypes"

const ratingReducer = (state = {rating: []}, action) => {
    switch(action.type){
        case RATING:
            return {
                ...state,
                rating: action.payload
            };
        default:
            return state;
    }
}

export default ratingReducer