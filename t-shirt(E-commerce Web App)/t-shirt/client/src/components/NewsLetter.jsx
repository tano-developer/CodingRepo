import React from 'react';
import '../assets/css/newsletter.css';

const NewLetter = () => {
  return (
    <div className='newletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className='newletter-form'>
        <input type='email' placeholder='Enter your Email & Username' />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewLetter;
