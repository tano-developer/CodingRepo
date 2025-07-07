import React from 'react'
import Hero from '../components/Hero'
import ShopBy from '../components/ShopBy'
import Popular from '../components/Popular'
import NewLetter from '../components/NewsLetter'
import Offers from '../components/Offer'
import NewCollection from '../components/NewCollection'

const Home = () => {
    return (
        <div className=' '>
            <Hero />
            <Popular />
            <NewCollection />
            <Offers />
            <NewLetter  />
        </div>
    )
}

export default Home