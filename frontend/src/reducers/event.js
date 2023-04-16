import { PUBLIC, PRIVATE, RSO } from "../constants/actionTypes";

const initialState = {
    public: [],
    private: [],
    rso: []
}

const eventReducer = (state = initialState, action) => {
    switch(action.type){
        case PUBLIC:
            return {
                ...state,
                public: action.payload,
            };
        case PRIVATE:
            return {
                ...state,
                private: action.payload,
            };
        case RSO:
            return {
                ...state,
                rso: action.payload,
            };
        default:
            return state;
    }
}

export default eventReducer