import React from 'react'
import useAuth from "../../helper/useAuth";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createrso } from '../../actions/rso';


// admin handle edit. right now this is student
function CreateRSO() {
  const {universityID} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  let formData;

  const handleChange = (e) =>{
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formData = {name, universityID}
    dispatch(createrso(formData, navigate))
    navigate("/home")
  }

  return (
    <div>
        <h2>Create a RSO</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='rso'>Name of Rso</label>
          <input type="text" name="rso" value={name} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
  )
}

export default CreateRSO