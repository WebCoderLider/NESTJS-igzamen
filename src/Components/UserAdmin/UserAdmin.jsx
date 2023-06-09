import React, { useEffect, useRef, useState } from 'react';
import './useradmin.css'
import { Link } from 'react-router-dom';
function UserAdmin() {
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

  const logoutbtn = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  const deleteprofilebtn = () => {
    fetch(`http://localhost:3000/users/${userData.message}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          window.location.href = '/'
          localStorage.removeItem('token')
        }
      })
      .then(data => {
        alert(`profile delete successfly \n\n\n msg: ${data}`)
      })
  }

  return (
    <div>
      <div className="AdminPanel">
        <div className="LeftAdmin bg-light text-center">
          <img src={`http://localhost:3000/users/${data ? data.user_img : ''}`} alt="not found" />
          <h4>{data ? data.username : 'undefined username'}</h4>
          <button className='btn btn-warning m-1' onClick={logoutbtn}>log out Profile</button>
          <button className='btn btn-danger m-1' onClick={deleteprofilebtn}>delete profile</button>
          <Link to='/'>
            <button className="btn btn-primary m-1">Home Page</button>
          </Link>
        </div>
        <div className="RightAdmin">
          <div className="userheaderimg">
            <img src={`http://localhost:3000/users/${data ? data.user_img : ''}`} alt="not found" />
            <div>
              <h4>username: {data ? data.username : ''}</h4>
              <h4>user email: {data ? data.user_email : ''}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdmin;
