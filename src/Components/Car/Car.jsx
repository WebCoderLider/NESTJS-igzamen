import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import './../Cars/car.css'
function Cars() {
    const [data, setData] = useState(null);
    const { car_id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/cars/${car_id}`)
            .then(res => res.json())
            .then(data => setData(data));
    }, [car_id]);

    const [userData, setUserData] = useState([]);
    const [data1, setData1] = useState();

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
                    // console.error(error);
                });
        }
    }, []);


    useEffect(() => {
        if (userData) {
            fetch(`http://localhost:3000/users/${userData.message}`)
                .then(res => res.json())
                .then(data => setData1(data))
        }
    }, [userData]);

    const requestBody = {
        username: data1 ? data1.user_email : '',
        user_id: data1 ? data1.user_id : '',
        car_id: data ? data.car_id : '',
    };
    const saqlashbtn = () => {
        fetch('http://localhost:3000/liked/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error fetching car data from the server');
                }
            })
            .then(data => setData(data))
            .catch(error => {
                console.error(error);
            });
    };


    console.log(requestBody);
    const [likecount, setLikecount] = useState()
    useEffect(() => {
        fetch('http://localhost:3000/liked/')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error fetching car data from the server');
                }
            })
            .then(data => setLikecount(data))
            .catch(error => {
                console.error(error);
            });
    }, [likecount])


    return (
        <div>
            <Navbar />
            {
                data ? (
                    <div key={data.car_id} className="Car_div d-flex justify-content-around">
                        <div className="Car_left bg-light p-4">
                            <h4>{data.cars_marka}</h4>
                            <img className='leftcarimg' src={`http://localhost:3000/cars/img/${data.cars_img}`} alt="" />
                            <h4>narxi: <b>{data.car_price}$</b></h4>
                            <h4>car name: <b>{data.cars_marka}</b></h4>
                            <h4>tanirovka: <b>{data.cars_tanirovka}</b></h4>
                            <h4>mator: <b>{data.cars_motor}</b></h4>
                            <h4>year: <b>{data.cars_year}</b></h4>
                            <h4>color: <b>{data.cars_color}</b></h4>
                            <h4>Distance::<b> {data.cars_distance}</b></h4>
                            <h4>Gearbook: <b>{data.cars_gearbook}</b></h4>
                            <h4 className='h4description'>Description: <b>{data.cars_description}</b></h4>
                            <button className='btn btn-outline-danger' onClick={saqlashbtn}>{likecount?likecount.length:0}</button>
                        </div>
                        <div className="Car_Right">
                            <h1>{data.cars_marka}</h1>
                            <img src={`http://localhost:3000/cars/img/${data.cars_img}`} alt="" />
                        </div>
                    </div>
                ) : ''
            }
        </div>
    );
}

export default Cars;
