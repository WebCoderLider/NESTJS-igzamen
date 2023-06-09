import React, { useEffect, useRef, useState } from 'react';
import './admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
    const category_name = useRef();
    const category_img = useRef();
    const [responseMessage, setResponseMessage] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
    function fetchData() {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setData(data));
    }
    function PostCategory(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the values from the input fields
        const categoryName = category_name.current.value;
        const categoryImg = category_img.current.files[0]; // Faylni tanlash

        // Create a FormData object
        const formData = new FormData();
        formData.append('category_name', categoryName);
        formData.append('category_img', categoryImg);

        // Make a POST request to the server with the form data
        fetch('http://localhost:3000/categories', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                // Handle the response from the server
                setResponseMessage(data);
                fetchData(); // Fetch updated data after posting a category
                category_name.current.value = ''
                category_img.current.files = ''
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error posting category:', error);
                setResponseMessage('An error occurred');
            });
    }
    function handleDelete(categoryId) {
        // Make a DELETE request to the server to delete the category
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(data => {
                // Handle the response from the server
                setResponseMessage(data);
                fetchData(); // Fetch updated data after deleting a category
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error deleting category:', error);
                setResponseMessage('An error occurred');
            });
    }
    const [CarsCategory, setCarsCategory] = useState(true)
    const carsClick = () => {
        setCarsCategory(false)
    }
    const categoryClick = () => {
        setCarsCategory(true)
    }
    const [selectedTanirovka, setSelectedTanirovka] = useState('');
    const [selectedGearbook, setSelectedGearbook] = useState('');
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [categories]);
    const handleTanirovkaChange = (event) => {
        setSelectedTanirovka(event.target.value);
    };
    const handleGearbookChange = (event) => {
        setSelectedGearbook(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('cars_marka', event.target.cars_marka.value);
        formData.append('cars_tanirovka', selectedTanirovka);
        formData.append('cars_motor', event.target.cars_motor.value);
        formData.append('cars_year', event.target.cars_year.value);
        formData.append('cars_color', event.target.cars_color.value);
        formData.append('cars_distance', event.target.cars_distance.value);
        formData.append('cars_gearbook', selectedGearbook);
        formData.append('cars_description', event.target.cars_description.value);
        formData.append('cars_img', fileInputRef.current.files[0]);
        formData.append('category_id', event.target.category_id.value);
        formData.append('car_price', event.target.car_price.value); // Add the car_price field

        try {
            const response = await fetch('http://localhost:3000/cars/', {
                method: 'POST',
                body: formData,
            });

            console.log(response.message);
            // Reset form fields
            event.target.reset();
            setSelectedTanirovka('');
            setSelectedGearbook('');
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    const [carsget, setCarsget] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/cars/')
            .then(res => res.json())
            .then(data => setCarsget(data))
    }, [carsget])
    const handleDeletecars = (car_id) => {
        fetch(`http://localhost:3000/cars/${car_id}`, {
            method: 'DELETE'
        })
            .then(data => {
                setResponseMessage(data);
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting category:', error);
                setResponseMessage('An error occurred');
            });
    }
    const [usersclick, setUsersclick] = useState(false)
    const [userdata, setUserData] = useState([])
    const usersclicked = () => {
        setUsersclick(prev => !prev)
    }
    useEffect(() => {
        fetch('http://localhost:3000/users/')
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [userdata])
    const deleteuser = (user_id) => {
        fetch(`http://localhost:3000/users/${user_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => alert('user deleted'))
    }
    return (
        <div>
            <div className="AdminPanel">
                <div className="AdminLeft text-center bg-light">
                    <h4 className="btn">admin panel</h4>
                    <button className="btn btn-primary d-block w-100 m-1" onClick={categoryClick}>categories</button>
                    <button className="btn btn-primary d-block w-100 m-1" onClick={carsClick}>cars</button>
                    <button className="btn btn-primary d-block w-100 m-1" onClick={usersclicked}>users</button>
                </div>
                <div className="Admin_Right">
                    {
                        CarsCategory ? (
                            <div className="CategoriesPage">
                                <form className='d-block w-100'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Category name</label>
                                        <input type="text" ref={category_name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Category img</label>
                                        <input type="file" ref={category_img} className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={PostCategory}>Submit</button>
                                </form>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">category name</th>
                                            <th scope="col">img</th>
                                            <th scope="col">delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data ? data.map(el => (
                                                <tr key={el.category_id}>
                                                    <td>{el.category_name}</td>
                                                    <td><img src={`http://localhost:3000/categories/${el.category_img}`} alt="undefined" /></td>
                                                    <td><button className='btn btn-danger' onClick={() => handleDelete(el.category_id)}>delete</button></td>
                                                </tr>
                                            )) : ''
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <label>
                                            Marka:
                                            <input type="text" className='form-control carsAdd' name="cars_marka" required />
                                        </label>
                                        <label>
                                            Tanirovka:
                                            <select name="cars_tanirovka" value={selectedTanirovka} className='form-control carsAdd' onChange={handleTanirovkaChange} required>
                                                <option value="">-- Select --</option>
                                                <option value="bor">bor</option>
                                                <option value="yoq">yoq</option>
                                                {/* Add more options */}
                                            </select>
                                        </label>
                                        <label>
                                            Motor:
                                            <input type="text" className='form-control carsAdd' name="cars_motor" required />
                                        </label>
                                        <label>
                                            Year:
                                            <input type="number" className='form-control carsAdd' name="cars_year" required />
                                        </label><br />
                                        <label>
                                            Color:
                                            <input type="text" className='form-control carsAdd' name="cars_color" required />
                                        </label>
                                        <label>
                                            Distance:
                                            <input type="text" className='form-control carsAdd' name="cars_distance" required />
                                        </label>
                                        <label>
                                            Gearbook:
                                            <select name="cars_gearbook" className='form-control carsAdd' value={selectedGearbook} onChange={handleGearbookChange} required>
                                                <option value="">-- Select --</option>
                                                <option value="Mehanik">Mehanik</option>
                                                <option value="Avtomat">Avtomat</option>
                                                {/* Add more options */}
                                            </select>
                                        </label><br />
                                        <label>
                                            Description:
                                            <textarea name="cars_description" className='form-control carsAdd' required></textarea>
                                        </label>
                                        <label>
                                            Image:
                                            <input type="file" className='form-control carsAdd' name="cars_img" accept="image/*" ref={fileInputRef} required />
                                        </label>
                                        <label>
                                            Category:
                                            <select className='form-control' name="category_id" required>
                                                <option value="">-- Select --</option>
                                                {categories ? (
                                                    categories.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>
                                                            {category.category_name}
                                                        </option>
                                                    ))
                                                ) : ''}
                                            </select>
                                        </label>
                                        <label>
                                            Price:
                                            <input type="number" className='form-control carsAdd' name="car_price" required />
                                        </label>

                                        <br />
                                        <button type="submit" className='btn btn-primary'>Create Car</button>
                                    </form>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">category name</th>
                                                <th scope="col">img</th>
                                                <th scope="col">delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carsget ? carsget.map(el => (
                                                    <tr key={el.car_id}>
                                                        <td>{el.cars_marka}</td>
                                                        <td><img src={`http://localhost:3000/cars/img/${el.cars_img}`} alt="undefined" /></td>
                                                        <td><button className='btn btn-danger' onClick={() => handleDeletecars(el.car_id)}>delete</button></td>
                                                    </tr>
                                                )) : ''
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    }
                </div>

                {
                    usersclick ? (

                        <div className="UsersModal">
                            <div className='bg-light'>
                                <div className="header d-flex justify-content-around">
                                    <h1>users modal</h1>
                                    <button className='btn btn-warning' onClick={usersclicked}>close</button>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">username</th>
                                            <th scope="col">delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userdata ? userdata.map(el => (
                                                <tr key={el.user_id}>
                                                    <td>{el.username}</td>
                                                    <td><button onClick={() => deleteuser(el.user_id)} className='btn btn-danger'>delete</button></td>
                                                </tr>
                                            )) : ''
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
}

export default Admin;
