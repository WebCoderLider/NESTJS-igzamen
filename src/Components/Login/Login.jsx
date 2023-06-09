import React, { useRef, useState } from 'react';
import './Login.css';

function Login() {


    const onLogin = () => {

        const userData = {
            username: username,
            user_password: password
        };

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                // Handle the response from the server
                if (data.token != null) {
                    window.location.href = '/useradmin'
                }
                else{
                    alert('username yoki password xato kiritildi')
                }
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    };




    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);


    const usernameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const imageRef = useRef('')
    const handleRegister = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const image = imageRef.current.files[0];

        const formData = new FormData();
        formData.append('username', username);
        formData.append('user_email', email);
        formData.append('user_password', password);
        formData.append('user_img', image);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                localStorage.setItem('token', res.token)
                setLogin(false)
                return res.json();
            })

    };

    const onLogintrue = () => {
        setLogin(prev => !prev)
    }


    return (
        <div>
            <div className="Login">
                <div className="Modal">
                    {login ? (
                        <div className="LoginModal Modal">
                            <h3 className="text-center">Register</h3>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter username"
                                ref={usernameRef}
                                required
                            />
                            <input
                                className="form-control"
                                type={"email"}
                                placeholder="Enter email"
                                ref={emailRef}
                                required
                            />
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Enter password"
                                ref={passwordRef}
                                required
                            />
                            <input
                                className="form-control"
                                type="file"
                                placeholder="Upload image"
                                ref={imageRef}
                            />

                            <a href="#" onClick={onLogintrue}>
                                Login
                            </a>
                            <button className="btn btn-primary" onClick={handleRegister}>
                                Register
                            </button>
                        </div>
                    ) : (
                        <div className="RegisterModal Modal">
                            <h3 className="text-center">Login</h3>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a href="#" onClick={onLogintrue}>Register</a>
                            <button className="btn btn-primary" onClick={onLogin}>Login</button>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Login;
