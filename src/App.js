import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import './App.css'
import CryptoTable from './component/CryptoTable';
import Pagination from './component/Pagination';
import SingleCoinPage from './component/SingleCoinPage';
import RegisterForm from './component/RegisterForm';
import SignIn from './component/SignIn';
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import FavoritesCrypto from './component/FavoritesCrypto';


function App() {
  return (
    <div>
      
      <ToastContainer/> 
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path="/coinpage/:id" element={<SingleCoinPage/>} />
        <Route path="/signup" element={<RegisterForm/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/favoritecoin" element={<FavoritesCrypto/>} />
      </Routes>

      </BrowserRouter>


    
    </div>
  );
}

export default App;
