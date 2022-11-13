import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { CryptoContext } from './Context';
import { ProfileURL } from './config';
import cryptocurrencies from './images/cryptocurrencies.png'
import profilepic from './images/man.png'



export default function Navbar() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(CryptoContext);


  //     //fetch user info
  function fetchUserData() {
    try {
      const token = localStorage.getItem('token');
      fetch(ProfileURL, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
        })
    }
    catch (error) {
      console.error(error.response.data);
    }


  }

  //end of fetch function


  function Logout() {
    localStorage.clear();
    navigate('/')

  }

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetchUserData();
    }
  }, []);

  return (
    <div >

      <Box sx={{ flexGrow: 1 }}>

        <AppBar color='transparent' position="static">
          <Toolbar>
            <Typography variant="h6" color='gold' component="div" sx={{ flexGrow: 1 }}>
              <Link to='/' style={{ 'textDecoration': 'none', color: 'gold' }}> CRYPTO <img src={cryptocurrencies} style={{ height: '35px', marginBottom: "5px" }} alt="" /> DATA </Link>
            </Typography>
            {/* if local storage is empty then show sign up an sign in else username */}
            {!(localStorage.getItem('token'))
              ?
              <div>
                <Button onClick={() => { navigate('/signup') }} style={{ 'color': 'gold' }} >Sign Up</Button>
                <Button onClick={() => { navigate('/signin') }} style={{ 'color': 'gold' }} >Sign In</Button>
              </div>
              :
              <div className="dropdown">
                <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <b>{user?.firstname}&nbsp;{user?.lastname}</b>
                </button>
                <div style={{ margin: "0px 20px 0px 0px " }} className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button  onClick={() => { navigate('/') }} className="dropdown-item btn btn-primary" type="button" >Home</button>
                  <button className="dropdown-item btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModalLong">Profile</button>
                  <button onClick={() => { navigate('/favoritecoin') }} className="dropdown-item" type="button">Favorite Coins</button>
                  <button onClick={Logout} className="dropdown-item" type="button">Logout</button>

                </div>
              </div>

            }

          </Toolbar>
        </AppBar>
      </Box>
      {/* using bootstrap modal for user profile */}

      <div className='row'>
        <div className='col-md-4'>
          <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">WELCOME TO CRYPTODATA</h5>
                </div>
                <div className="modal-body d-flex flex-column ">
                  <div  style={{textAlign:'center'}}>
                    <img style={{ height: "200px"}} src={profilepic} alt="profilepic" />
                  </div>
                  <div style={{ margin: "25px 0px 0px 17px" }}>
                    <h4> Name:  {user.firstname}&nbsp;{user.lastname}</h4>
                    <h4>Email: {user.email}</h4>
                    <h4>Phone: {user.phone}</h4>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>







    </div>
  )
}
