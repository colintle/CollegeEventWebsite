import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes';
import jwt_decode from "jwt-decode";
import useAuth from "../../helper/useAuth";
import logo from "../../images/logo.jpg";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useState(JSON.parse(localStorage.getItem('token')))
  const {username} = useAuth()

  useEffect(() => {
    let decodedToken;
    if (token){
      decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
      {
          logout();
      }
    }
  }, [location, token])

  const logout = () => {
    dispatch({type: LOGOUT});
    navigate("/auth");
  }

  const handleHome = () => {
    navigate("/home");
  }

  const handleAdmin = () => {
    navigate("/admin")
  }

  return (
    <div>
      <section>
        <div className='navbar'>
          <h1>College Events Website</h1>
          <button onClick={logout}>Auth</button>
          <button onClick={handleHome}>Home</button>
          <button onClick={handleAdmin}>Admin</button>
          <div className='logo-wrapper'>
            <img src={logo} className='logo'/>
          </div>
        </div>
        <p>Developed By <strong>Colin Le</strong></p>
        <p>Welcome <strong>{username}</strong></p>
    </section>
    </div>
  )
}
export default Navbar
