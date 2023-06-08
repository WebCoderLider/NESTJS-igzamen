import React, { useEffect, useState } from 'react'
import './categorys.css'
import { Link } from 'react-router-dom'
function Category() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setData(data))
            .catch((error) => {
                console.log(error)
            });
    }, [])
    return (
        <div>
            <h4 className='modelstext'>Models {'>'}</h4>
            <div className="Cards">
                {
                    data ? data.map(el => (
                        <Link to={`/cars/${el.category_id}`} key={el.category_id}>
                            <div className="Cardd text-center bg-light">
                                <img src={`http://localhost:3000/categories/${el.category_img}`} alt="" />
                                <h4>{el.category_name}</h4>
                            </div>
                        </Link>
                    )) : <h1>Categoriyalar mavjud emas!</h1>
                }
            </div>
        </div>
    )
}

export default Category
