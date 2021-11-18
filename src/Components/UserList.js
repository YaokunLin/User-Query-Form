import React from 'react'
import InfoTable from './InfoTable'
import useFetch from '../Tools/useFetch'

function UserList({ trigger }) {
  const { error, isPending, data: userInfo } = useFetch('http://localhost:8000/userInfo', trigger)
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      {/*<button onClick={refreshPage}>Click to reload!</button>*/}
      <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {userInfo && <InfoTable userInfo={userInfo} />}
      </div>

    </div>
  )
}

export default UserList
