import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { CryptoContext } from './Context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GetFavoriteURL, RemoveToFavoriteURL } from './config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FavoritesCrypto() {
   const navigate = useNavigate();
  //will pass user id to fetch favrt and add favrt
  const { user } = useContext(CryptoContext);
  const [favoriteCoins, setFavoriteCoins] = useState([]);

 

  // start of getFAvorite function
  async function fetchFavoriteCrypto() {
    let response = await axios.get(GetFavoriteURL, {
      params: { userid: user._id }
    })
    console.log(response.data)
    setFavoriteCoins(response.data.favoriteCryptoArr)
  }
  //end of function

  //Start of DeleteFromFavorite Function

  async function DeleteFromFavorite(cryptoname) {
    const response = await axios.post(RemoveToFavoriteURL, { _id: user._id, name: cryptoname })
    toast('Remove Successfully', {
      position: "top-center",
      autoClose: 2000,
      type: "warning",
      theme: "colored",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    fetchFavoriteCrypto();
  }
  //end of delete from favrt

  //useEffect
  useEffect(() => {
    if (Object.keys(user).length != 0) {
      fetchFavoriteCrypto();
    }
  }, [user])


  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-md-12 mt-4'>
          <h2 className='text-center'
            style={{ color: 'white', fontFamily: 'cursive', fontWeight: '600' }} >Your Favorite Coin List
          </h2>
          <br />
          <div>
            <table className="table table-striped table-hover ">
              <thead >
                <tr style={{ backgroundColor: "gold" }}>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">Market</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody className='table-dark'>

                {favoriteCoins.length!=0&&favoriteCoins.map((items) => (
                  <tr key={items.name}>
                    {/* column for image and name of coin */}
                    <td>
                      <img
                        src={items.image}
                        height="60px"
                        width="60px"
                      />
                      <span style={{
                        fontWeight: "bolder",
                        fontFamily: 'roboto',
                        textAlign: "center",
                        fontSize: '1rem'
                      }}>
                        <br />
                        {items?.name}
                        <br />
                      </span>
                    </td>

                    {/* cloumn for current price */}
                    {items.current_price < 1000 ?
                      <td className='text-align-center'>&#8377;&nbsp;{items.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td> :
                      <td className='text-align-center'>&#8377;&nbsp;{items.current_price.toString().slice(0, -3)} K
                      </td>
                    }

                    {/* column for profit and loss percantage */}
                    <td style={{ color: items.price_change_percentage_24h > 0 ? "green" : "red" }}>
                      {items.price_change_percentage_24h > 0 ? ("+" + Number.parseFloat(items?.price_change_percentage_24h).toFixed(2) + " %") : (Number.parseFloat(items?.price_change_percentage_24h).toFixed(2) + " %")}
                    </td>

                    {/* column for marjet cap */}
                    <td>&#8377;&nbsp;{items.market_cap.slice(0, -6)} M</td>

                    <td style={{cursor:'pointer'}} onClick={() => { DeleteFromFavorite(items?.name) }}><DeleteForeverIcon /></td>

                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  )
}
