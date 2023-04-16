import {useState } from 'react';
import { useDispatch } from 'react-redux';
import { createuser, loginuser } from '../../actions/user';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';


const Auth = () => {
  const [formData, setFormData] = useState({ username: '', password: '', userType: 'student', universityID: '' });
  const [isSignUp, setIsSignUp] = useState(false);
  const universities = useSelector(state => state.uni.uni);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.universityID === 0 || formData.universityID === '' || formData.username === '' || formData.password === '' || formData.userType === '')
      {
      return alert("Fill all fields!")
      }
      dispatch(createuser(formData, navigate));
    } 
    else {
      if (formData.username === '' || formData.password === '')
      {
      return alert("Fill all fields!")
      }
      dispatch(loginuser({ username: formData.username, password: formData.password }, navigate));
    }
    setFormData({ username: '', password: '', userType: 'student', universityID: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeUni = (e) => {
    console.log(e.target.value)
    setFormData({ ...formData, universityID: e.target.value });
  };
  
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setFormData({ username: '', password: '', userType: 'student', universityID: '' });
  };

  return (
    <div>
      <section>
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      </section>
      
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {isSignUp && (
            <div>
              <label htmlFor="userType">User Type</label>
              <select id="userType" name="userType" onChange={handleChangeUni}>
                <option key={"student"} value={"student"}>
                  Student
                </option>
              </select>
              <label htmlFor="universityID">University ID</label>
              <select id="universityID" name="universityID" onChange={handleChangeUni}>
                <option key={0} value={0}>
                  Select One
                </option>
              {universities.map((university) => (
                <option key={university.ID} value={university.ID}>
                  {university.Name}
                </option>
              ))}
              </select>
            </div>
          )}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
          <button type="button" onClick={switchMode}>
            {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Auth;
