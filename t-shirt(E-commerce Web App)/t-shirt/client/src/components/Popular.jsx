import React from 'react'
import '../assets/css/popular.css'
import data_product from './data';


const Popular = () => {
  return (
    <div className='popular'>
    <h1>POPULAR IN WOMEN</h1>
    
    <div className='popular-item'>
        {data_product.map((item, i) => {
            return (
                <div key={i} className='item-card'>
                    <img src={item.image} alt={item.name} />
                    <div className='item-card-content'>
                        <h2>{item.name}</h2>
                        <div className='price'>
                            <span className='new-price'>${item.new_price}</span>
                            <span className='old-price'>${item.old_price}</span>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
</div>

  )
}

export default Popular