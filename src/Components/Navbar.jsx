import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState();

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/users/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error fetching user data from the server');
          }
        })
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);


  useEffect(() => {
    if (userData) {
      fetch(`http://localhost:3000/users/${userData.message}`)
        .then(res => res.json())
        .then(data => setData(data))
    }
  }, [userData]);

  return (
    <div>
      <div className="navbar d-flex justify-content-around p-5">
      <Link to='/' className='btn btn-primary'>Home</Link>
        {
          localStorage.getItem('token') ? (
            <div>
              <Link to={'/useradmin'}>
                <img style={{ width: "40px", height: '40px', borderRadius: '100%' }} src={`http://localhost:3000/users/${data ? data.user_img : ''}`} alt="" />
                <b className='btn'>{data ? data.username : ''}</b>
              </Link>
            </div>
          ) : (
            <Link to='/login'>
              <button className='btn btn-primary'>Register</button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
