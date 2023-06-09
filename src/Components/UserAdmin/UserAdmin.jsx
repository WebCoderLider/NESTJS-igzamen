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
  const usernameRefPut = useRef()
  const emailRefPut = useRef()
  const passwordRefPut = useRef()
  const editProfile = () => {
    const newUsername = usernameRefPut.current.value;
    const newEmail = emailRefPut.current.value;
    const newPassword = passwordRefPut.current.value;
    const userId = userData.message // user_id ni ma'lumotlar bazasidan olib kelish yoki komponentdan olib kelish kerak

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUsername,
        user_email: newEmail,
        user_password: newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("An error occurred");
        }
      })
      .then((data) => {
        console.log(data); // Response ma'lumotlarini ko'rsating
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [modaledit, setModaledit] = useState(false)
  const editprofilebtn = () => {
    setModaledit(prev => !prev)
  }

  return (
    <div>
      <div className="AdminPanel">
        <div className="LeftAdmin bg-light text-center">
          <img src={`http://localhost:3000/users/${data ? data.user_img : ''}`} alt="not found" />
          <h4>{data ? data.username : 'undefined username'}</h4>
          <button className='btn btn-warning m-1' onClick={logoutbtn}>log out Profile</button>
          <button className='btn btn-danger m-1' onClick={deleteprofilebtn}>delete profile</button>
          <button className='btn btn-warning m-2' onClick={editprofilebtn}>Edit profile</button>
          <Link to='/'>
            <button className="btn btn-primary m-3">Home Page</button>
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

          {
            modaledit ? (
              <div className="ModalEditProfile">
                <div className="EditProfile">
                  <button className='closebtn btn btn-primary' onClick={editprofilebtn}>X</button>
                  <form action="#">
                    <input type="text" className='form-control' ref={usernameRefPut} placeholder='New Username' required />
                    <input type="email" className='form-control' ref={emailRefPut} placeholder='New Email' required />
                    <input type="password" className='form-control' ref={passwordRefPut} placeholder='New Password' required />
                    <button className='btn btn-warning' onClick={editProfile}>Edit</button>
                  </form>
                </div>
              </div>
            ):''
          }

        </div>
      </div>
    </div>
  );
}

export default UserAdmin;
