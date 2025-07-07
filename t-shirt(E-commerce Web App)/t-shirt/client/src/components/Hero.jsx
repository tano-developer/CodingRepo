import React from 'react'
import '../assets/css/heroSection.css'
import hero_img from '../assets/images/hero_img.png';
export const Hero = () => {
    return (
      <div className='hero'>
          <div className='hero-left'>
              <h2>NEW  ARRIVAL ONLY </h2> 
              <div>
                  <div className="hero-hand-icon">
                      <p>New <span>👋</span></p>
                     
                  </div>
                  <p>Collections</p>
                  <p>For Everyone</p>
              </div>
          </div>
          <div className='hero-right'>
              <img src={hero_img} alt="" />
          </div>
  
      </div>
    )
  }
  
  export default Hero;