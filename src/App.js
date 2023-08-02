import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import City from './component/City';
import State from './component/State';
import Navbar from './component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './component/Home';
import Product from './component/Product';
import User from './component/User';
import Category from './component/Category';
import Auction from './component/Auction';
import AddAuction from './component/AddAuction';
import ViewAuction from './component/ViewAuction';
import ViewEditAuction from './component/ViewEditAuction';
import EditAuction from './component/EditAuction';
import Login from './component/Login';
import AdminRoute from './common/AdminRoute';
import BidAuction from './component/BidAuction';
import BidCard from './component/BidCard';


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/state" element={<AdminRoute><State /></AdminRoute> } />
      <Route path ="/home" element={<Home/>}/>
      <Route path ="/city" element={<City/>}  />
      <Route path = "/product" element={<Product/>}/>
      <Route path = "/user" element={<User/>}/>
      <Route path = "/category" element={<Category/>}/>
      <Route path = "/auction" element={<Auction/>}/>
      <Route path = "/go-to-auction" element={<BidAuction/>}/>
      <Route path = "/add-auction" element={<AddAuction/>}/>
      <Route path = "/view-auction" element={<ViewAuction/>}/>
      <Route path = "/view-edit-auction/:id" element={<ViewEditAuction/>}/>
      <Route path = "/edit-auction/:id" element={<EditAuction/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/bid-card/:id" element={<BidCard/>}/>

    </Routes>
    </>
  );
}

export default App;
