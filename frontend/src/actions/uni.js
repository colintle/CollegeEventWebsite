import { UNI } from "../constants/actionTypes";
import * as api from '../api/index'

// Public
export const getuni = () => async(dispatch) => {
    try{
        const {data} = await api.getUni();
        dispatch({type: UNI, payload: data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}

// Admin
export const edituni = (formData, navigate) => async(dispatch) => {
    try{
        await api.editUni(formData)
        navigate("/")
    }
    catch(error)
    {
        console.log(error)
    }
}

// Admin
export const createuni = (formData, navigate) => async(dispatch) => {
    try{
        await api.createUni(formData)
        navigate('/')
    }
    catch(error)
    {
        console.log(error)
    }
}

// Admin
export const removeuni = (id, navigate) => async(dispatch) => {
    try{
        await api.deleteUni(id)
        navigate('/')
    }
    catch(error)
    {
        console.log(error)
    }
}