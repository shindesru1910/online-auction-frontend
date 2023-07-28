import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import City from './component/City';
import State from './component/State';
import Navbar from './component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './component/Home';
import Product from './component/Product';
import User from './component/User';

// import { Navbar } from 'react-bootstrap';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path ="/state" element={<State/>}/>
      <Route path ="/home" element={<Home/>}/>
      <Route path ="/city" element={<City/>}/>
      <Route path = "/product" element={<Product/>}/>
      <Route path = "/user" element={<User/>}/>
    </Routes>
    </>
  );
}

export default App;
