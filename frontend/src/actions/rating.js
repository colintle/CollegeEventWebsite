import * as api from '../api/index'
import { RATING } from '../constants/actionTypes'

// This is for the events page
// Public
export const getrating = (id) => async(dispatch) => {
    try{
        const {data} = await api.getRating(id)
        dispatch({type: RATING, payload: data})
    }
    catch(error)
    {
        console.log(error)
    }
}

// Public
export const editrating = (formData, navigate) => async(dispatch) => {
    try{
        await api.editRating(formData)
        navigate('/')
    }
    catch(error)
    {
        console.log(error)
    }
}

// Public
export const createrating = (formData, navigate) => async(dispatch) => {
    try{
        await api.createRating(formData)
        navigate("/")
    }
    catch(error)
    {
        console.log(error)
    }
}

// Public
export const removerating = (id, navigate) => async(dispatch) => {
    try{
        await api.removeRating(id)
        navigate("/")
    }
    catch(error)
    {
        console.log(error)
    }
}
