import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { SingleCoinURL, AddToFavoriteURL } from './config';
import '../component/../App.css'
import { CryptoContext } from './Context';
import { toast } from 'react-toastify';
import CryptoChart from './CryptoChart';



export default function SingleCoinPage() {

  const navigate = useNavigate();
  let { id } = useParams()
  const [cryptoId, setCryptoId] = useState('')
  const [cryptodata, setCryptodata] = useState({});
  const { user } = useContext(CryptoContext);

  async function fetchCryptoData() {
    await fetch(SingleCoinURL(cryptoId))
      .then(res => res.json())
      .then(data => {
        setCryptodata(data);
      })


  }



  async function AddToFavorite() {
    if (localStorage.getItem('token') == null) {
      toast.error('Please Login First To Add Favorite', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
    else {
      toast('Added to favourites', {
        position: "top-center",
        autoClose: 2000,
        type: "success",
        theme: "colored",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      await fetch(AddToFavoriteURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",

        },
        body: JSON.stringify({
          userid: user._id,
          name: cryptodata.name,
          image: cryptodata.image?.small,
          current_price: cryptodata.market_data?.current_price.inr,
          price_change_percentage_24h: cryptodata.market_data?.price_change_percentage_24h_in_currency.inr,
          market_cap: cryptodata.market_data?.market_cap.inr
        })
      }).then(res => res.text)
        .then(data => {
          console.log(data);

        })
    }
  }

  React.useEffect(() => {
    setCryptoId(id)
    fetchCryptoData();

  }, [cryptoId])




  return (
    <div className='container-fluid mt-4'>
      <div className='row d-flex'>
        <div className='col-md-4'>
          <div className='crypto-image' style={{ textAlign: 'center' }}>
            <img src={cryptodata?.image?.large} alt="crypto-image" />
            <br />
            <br />
            <h1 style={{ color: 'white' }}>{cryptodata.name}</h1>
          </div>
          <br />

          <div className='coin-info' style={{ "marginLeft": '25px' }}>
            {cryptodata?.description?.en.split('. ')[0]}
            <br />
            <br />

            <h4>Rank :&nbsp;{cryptodata.coingecko_rank}</h4>
            <h4>Current Price : &#8377;&nbsp;{cryptodata.market_data?.current_price?.inr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
            <h4>Market Cap :  &#8377;&nbsp;{cryptodata.market_data?.market_cap?.inr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>

          </div>

          <div className="buttons " style={{ "margin": '20px 0px 0px 25px' }}>
            {
              (cryptodata?.image == null ? null :
                <button onClick={AddToFavorite} type="button" className="btn btn-outline-warning ">Add to Favorite</button>
              )
            }
            <button onClick={() => { navigate('/') }} style={{ marginLeft: '40px' }} type="button" className="btn btn-outline-warning">Go back</button>
          </div>
          <br />
        </div>

        {/* for chart js component */}
        <div style={{ margin: "90px 0px 0px 0px" }} className="col-md-7">
          <CryptoChart id={id} />
        </div>
      </div>
    </div>
  )
}
