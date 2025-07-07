import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/footer.css'
import instagram from '../assets/images/Instrgram.png';
import whatsapp from '../assets/images/whatsapp.png';
import Facebook from '../assets/images/Facebook.png';
import pintester from '../assets/images/Pintester.png';
import Twitter from '../assets/images/Twitter.png';
import logo from '../assets/images/logo-img.png';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={logo} alt="" />
                
            </div> 
            <ul>
                
                <li><Link to="/" className='hover:border-b-2 border-black'>Home</Link></li>
                <li><Link to="/wishlist" className='hover:border-b-2 border-black'>Wishlist</Link></li>
                <li><Link to="/shoes/men" className='hover:border-b-2 border-black'>Men</Link></li>
                <li><Link to="/shoes/women" className='hover:border-b-2 border-black'>Women </Link></li>
                <li><Link to="/shoes/kids" className='hover:border-b-2 border-black'>Kids</Link></li>
                
                
            </ul>
            <div className='footer-social-icon'>
                <div className="footer-icons-container">
                    <img className="instagram" src= {instagram} alt="" /> 
                </div>
                <div className='footer-icons-container'>
                    <img className="whatsapp" src= {whatsapp} alt="" /> 
                </div>
                <div className='footer-icons-container'> 
                    <img className="pintester" src= {pintester} alt="" /> 
                </div>
                <div className='footer-icons-container'> 
                    <img className="twitter" src= {Twitter} alt="" /> 
                </div>
                <div className='footer-icons-container'> 
                    <img className="facebook" src= {Facebook} alt="" /> 
                </div>
            </div>
            <div className='footer-copyright'> 
                <hr/>
                <p className='mt-4 self-center'> Copyright © {new Date().getFullYear()}2023 - All Right Reserved</p>
            </div> 
        </div>
    )
    
    }

export default Footer