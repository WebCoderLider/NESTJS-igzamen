import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <div className="navbar d-flex justify-content-end p-5">
        <Link to='/admin'>
          <button className='btn btn-primary'>Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
