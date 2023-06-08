import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useParams } from 'react-router-dom';
import car from './../../image/car.svg';

function Cars() {
  const [data, setData] = useState(null);
  const category_id = useParams();
  console.log(category_id)
  useEffect(() => {
    fetch(`http://localhost:3000/categories/${category_id.category_id}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [category_id]);
  console.log(data)
  return (
    <div>
      <Navbar />
      <h4 className='modelstext'>Models {'>'} Cars {'>'} {data ? data.category_name : ''}</h4>
      <h2 className='modelturlari'>Model turlari</h2>
      <div className="Cards">
        {
          data ? (
            data.cars.map(el => (
              <Link to={`/car/${el.car_id}`} key={el.car_id}>
                <div className="Cardd text-left bg-light">
                  <img src={`http://localhost:3000/cars/img/${el.cars_img}`} alt="" />
                  <h4>{el.cars_marka}</h4>
                  <h5>{el.cars_distance}</h5>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    </div>
  );
}

export default Cars;
