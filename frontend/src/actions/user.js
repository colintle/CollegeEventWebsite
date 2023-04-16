import * as api from '../api/index';
import {AUTH} from '../constants/actionTypes';

// Public
export const createuser = (formData, navigate) => async(dispatch) => {
    try{
        await api.createUser(formData)
        alert("Successful")
        navigate('/auth')
    }
    catch(error){
        alert(error.response.data.message)
    }
}

// Public
export const loginuser = (formData, navigate) => async(dispatch) => {
    try{
        const {data} = await api.loginUser(formData)
        dispatch({type: AUTH, payload: data.token})
        //alert('Successful')
        navigate("/home")
    }
    catch(error)
    {
        alert(error.response.data.message)
    }
}
