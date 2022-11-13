import React, { useEffect, useState } from 'react'
import '../component/../App.css'
import { useNavigate } from 'react-router-dom';


const CryptoTable = (props) => {
  const navigate = useNavigate();

  //coinList contians all crypto which is presented in table
  const [coinlist, setCoinlist] = useState([]);

  //useEffetc 
  useEffect(() => {
    setCoinlist(props.currentItems);
  }, [props.currentItems])


  return (
    <div className='container-fluid tablestyle'>
      <div className='row'>
      
          <table className="table table-striped table-hover ">
            <thead >
              <tr style={{ backgroundColor: "gold" }}>
                <th scope="col">Coin</th>
                <th scope="col">Current Price</th>
                <th scope="col">24H Market Update</th>
                <th scope="col">Market Cap</th>
              </tr>
            </thead>
            <tbody className='table-dark'>

              {coinlist !== null && coinlist.map((items) => (
                <tr style={{cursor:'pointer'}}
                onClick={() => { navigate(`/coinpage/${items.id}`) }} key={items.id}>
                  {/* this coloumn contains image and name of crypto  */}
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
                  {/* if current price is greater than 1000 then append k */}
                  {items.current_price < 1000 ?
                    <td className='text-align-center'>&#8377;&nbsp;{items.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td> :
                    <td className='text-align-center'>&#8377;&nbsp;{items.current_price.toString().slice(0, -3)} K
                    </td>
                  }

                  {/* percentage loss or profit */}
                  <td style={{ color: items.market_cap_change_percentage_24h > 0 ? "green" : "red" }}>
                    {items.market_cap_change_percentage_24h > 0 ? ("+" + items?.market_cap_change_percentage_24h?.toFixed(2) + " %") : (items?.market_cap_change_percentage_24h?.toFixed(2) + " %")}
                  </td>

                  {/* market_cap column*/}
                  <td>&#8377;&nbsp;{items.market_cap.toString().slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} M
                  </td>

                </tr>

              ))}
            </tbody>
          </table>

      
      </div>
    </div>

  )

}

export default CryptoTable

