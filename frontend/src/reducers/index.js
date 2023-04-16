import { combineReducers } from "redux";
import event from "./event";
import rating from "./rating";
import rso from "./rso";
import uni from "./uni";
import user from "./user"

export default combineReducers({
    event,
    rating,
    rso,
    uni,
    user
});