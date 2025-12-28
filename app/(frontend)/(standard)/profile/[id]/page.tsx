import React from 'react'

const UserProfile = ({params} : any) => {
  return (
    <div>

      <h1>Profile Page {params.id}</h1>
    </div>
  )
}

export default UserProfile;
