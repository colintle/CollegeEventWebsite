import { APPROVED, UNAPPROVED, JOINED, STUDENTS } from "../constants/actionTypes";
import * as api from '../api/index'

// Public
export const joinrso = (formData, navigate) => async(dispatch) => {
    try{
        await api.joinRso(formData)
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Public

export const leaverso = (formData, navigate) => async(dispatch) => {
    try{
        await api.leaveRso(formData)
        navigate("/")
    }
    catch(error)
    {
        console.log(error)
    }
}

// Public (But RSO has to approve)
export const createrso = (formData, navigate) => async(dispatch) => {
    try{
        await api.createRso(formData)
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Admin
export const editrso = (formData, navigate) => async(dispatch) => {
    try{
        await api.editRso(formData)
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Public
export const approverso = (id) => async(dispatch) => {
    try{
        const {data} = await api.approvedRso(id)
        dispatch({type: APPROVED, payload: data})
    }
    catch(error){
        console.log(error)
    }
}

// Admin (List of unapproved rsos)
export const unapprovedrso = (id) => async(dispatch) => {
    try{
        const {data} = await api.unapprovedRso(id)
        dispatch({type: UNAPPROVED, payload: data})
    }
    catch(error){
        console.log(error)
    }
}

// Public (List of joined rso)
export const associatedrso = (id) => async(dispatch) => {
    try{
        const {data} = await api.associatedRso(id)
        dispatch({type: JOINED, payload: data})
    }
    catch(error){
        console.log(error)
    }
}

// Admin 
export const removerso = (id, navigate) => async(dispatch) => {
    try{
        await api.removeRso(id)
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

// Admin (Students in rso)
export const studentsinrso = (id) => async(dispatch) => {
    try{
        const {data} = await api.studentsInRso(id)
        dispatch({type: STUDENTS, payload: data})
    }
    catch(error){
        console.log(error)
    }
}