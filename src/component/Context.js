import React, { createContext, useEffect, useState } from 'react'


const CryptoContext = createContext()

 const Context= (props) => {

    const[search,setSearch ] = useState('');
    const[user,setUser] = useState({});


  return(
    <CryptoContext.Provider value={{search,setSearch,user,setUser}}>
        {props.children}
    </CryptoContext.Provider>
  );
  
};
export {Context,CryptoContext};
