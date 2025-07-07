import React from 'react'
import '../assets/css/newCollection.css'
import Item from './Item/item'
import new_Collections from '../assets/new_collections'
const NewCollections = () => {
  return (
    <div className='new-collection'>
      <h1>NEW COLLECTION</h1>
   
      <div className='collection'>
        {new_Collections.map((item,i)=>{
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

export default  NewCollections