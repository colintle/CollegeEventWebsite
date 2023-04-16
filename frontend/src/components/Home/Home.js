import React from 'react'
import { useDispatch } from 'react-redux';
import {publicevent, privateevent} from "../../actions/event"
import {associatedrso, approverso, unapprovedrso} from '../../actions/rso';
import PostHome from './PostHome';
import jwtDecode from 'jwt-decode';


function Home() {
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch()

  if (!token)
  {
    return <p>Please login first</p>
  }
  else
  {
    const decoded = jwtDecode(token);
    const {userID, universityID} = decoded;
    
    // events
    dispatch(publicevent(universityID));
    dispatch(privateevent(universityID));

    // rsos
    dispatch(associatedrso(userID))
    dispatch(approverso(universityID))
    dispatch(unapprovedrso(universityID))

    return (
      <PostHome/>
    )
  }
}

export default Home