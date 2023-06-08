import React, { useEffect, useState } from 'react';

function UserAdmin() {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
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

  console.log(userData.message)

  useEffect(() => {
    if (userData) {
      fetch(`http://localhost:3000/users/${userData.message}`)
        .then(res => res.json())
        .then(data => setData(data))
    }
  }, [userData]);

  console.log(data);

  return (
    <div>
      <h1>User Admin</h1>

      {
        data ? (
          <div key={data.user_id}>
            <p>Username: {data.username}</p>
            <p>Email: {data.user_email}</p>
            {/* Render other user-specific data here */}
          </div>
        ):'loading...'
          }
    </div>
  );
}

export default UserAdmin;
