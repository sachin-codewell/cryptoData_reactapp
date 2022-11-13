import React, { useEffect, useState } from 'react'
import { TrendingCoinsURL } from './config';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../component/../App.css'
import { useNavigate } from 'react-router-dom';

export default function TrendingCoin() {

    const navigate = useNavigate();
    const currency = 'inr'
    const [trending, setTrending] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoinsURL(currency))
        setTrending(data);
    }

    useEffect(() => {
        fetchTrending();
    }, [currency]);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    };


    const items = trending.map((coins) => {
        return (
            <span onClick={() => { navigate(`/coinpage/${coins.id}`) }} style={{ color: 'white', cursor: 'pointer' }}>
                <img
                    src={coins?.image}
                    alt={coins?.name}
                    height="60px"
                />
                
                <br />
                <span style={{ fontWeight: "bolder", fontSize: '1rem' }}>
                    &nbsp;
                    {coins?.name}
                    <br />
                    &#8377;&nbsp;{coins?.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
            </span>
        )
    })

    return (

        <div className='carousel ' >

            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={500}
                animationDuration={500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}

            />

        </div>
    )
}
