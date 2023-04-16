import React from 'react'
import useAuth from "../../helper/useAuth"
import { associatedrso } from '../../actions/rso';
import { useDispatch } from 'react-redux';
import PostAdmin from './PostAdmin';
import jwtDecode from 'jwt-decode';

function Admin() {
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const {userType} = useAuth()

  if (!token)
  {
    return <p>Please login first</p>
  }
  else if (userType == "student")
  {
    return <p>Please return to the Home Page</p>
  }
  else
  {
    const decoded = jwtDecode(token);
    const {userID} = decoded;

    dispatch(associatedrso(userID))
    
    return (
      <PostAdmin/>
    )
  }
}

export default Admin