import { PUBLIC, PRIVATE, RSO } from "../constants/actionTypes";
import * as api from '../api/index'

// Admin
export const createevent = (formData, navigate) => async(dispatch) => {
    try{
        await api.createEvent(formData);
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Public
export const rsoevent = (formData) => async(dispatch) => {
    try{
        const {data} = await api.rsoEvent(formData)
        dispatch({type:RSO, payload: data})
    }
    catch(error) {
        console.log(error)
    }
}

// Admin
export const editevent = (formData, navigate) => async(dispatch) => {
    try{
        await api.editEvent(formData);
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Public
export const publicevent = (id) => async(dispatch) => {
    try{
        const {data} = await api.publicEvent(id)
        dispatch({type:PUBLIC, payload: data})
    }
    catch(error) {
        console.log(error)
    }
}

// Public
export const privateevent = (id) => async(dispatch) => {
    try{
        const {data} = await api.privateEvent(id)
        dispatch({type:PRIVATE, payload: data})
    }
    catch(error) {
        console.log(error)
    }
}

// Public
export const approveevent = (id, navigate) => async(dispatch) => {
    try{
        await api.approveEvent(id);
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Private (Don't think I will need this)
export const disapproveevent = (id, navigate) => async(dispatch) => {
    try{
        await api.disapproveEvent(id);
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Admin
export const removeevent = (id, navigate) => async(dispatch) => {
    try{
        await api.removeEvent(id);
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}