import React from 'react'

function Profile() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token)
  {
    return <p>Please login first</p>
  }
  return (
    <div>Profile</div>
  )
}

export default Profile