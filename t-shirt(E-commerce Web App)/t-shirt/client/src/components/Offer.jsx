import React from 'react'
import '../assets/css/offer.css'
import exclusive_image from '../assets/images/offer-image.png';

const Offers = () => {
  return (
    <div className='offers'>
      <div className='offers-left'>
          <img src={exclusive_image} alt=''/>
        </div>
        <div className='offers-right'>
            <h1>Exclusive <br></br>Offers for you</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
          
            <button>Check Now</button>

        </div>
        

    </div>
  )
}

export default Offers