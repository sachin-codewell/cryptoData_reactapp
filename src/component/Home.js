import React, { useContext, useState, useEffect } from 'react'
import '../component/../App.css'
import TrendingCoin from './TrendingCoin'
import Pagination from './Pagination'



export default function Home() {


    return (
        <div className='container-fluid'>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div  className="carousel-item active">
                        <img  style={{minHeight:'200px'}} className="d-block w-100" src="https://source.unsplash.com/1200x400?crypto█" alt="First slide" />
                    </div>
                </div>
            </div>

            <div className='carousel-list'>
                {/* Trending  Coin Carousel  */}

                <TrendingCoin />
            </div>

            {/* Presenting Crypto Data */}

            <div className="heading">
                <h2>Future Is Here</h2>
            </div>


            <Pagination itemsPerPage={10} />









        </div>
    )
}
