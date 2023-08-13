import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import City from './component/City';
import State from './component/State';
import Navbar from './component/Navbar';
import UserNav from './component/UserNav';
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
import React, { useEffect, useState } from 'react';
import AuctionSummary from './component/AuctionSummary';
import ChangeRoute from './common/ChangeRoute';
import UserRoute from './common/UserRoute';
import jwt from 'jwt-decode';
// import UserRoute from './common/UserRoute';



function App() {
  const [tokenExists, setTokenExists] = useState(false);
  const token = localStorage.getItem("token");
    let user;
    let user_role;
    if (token) {
        user = jwt(token);
        user_role = user.role;
    }

    console.log(user)

  useEffect(() => {
    const checkTokenExists = () => {
      const token = localStorage.getItem('token');

      if (token) {
        setTokenExists(true);
      } else {
        setTokenExists(false);
      }
    };

    checkTokenExists();
  }, []);

  return (
    <>
      {tokenExists && (
        user_role === "admin" ? <Navbar /> : <UserNav/>
      )}
      <Routes>
        <Route path="/" element={<ChangeRoute/>} />
        <Route path = "/login" element={<Login/>}/>
        <Route path="/state" element={<AdminRoute><State/></AdminRoute>} />
        <Route path ="/home" element={<AdminRoute><Home/></AdminRoute>}/>
        <Route path ="/city" element={<AdminRoute><City/></AdminRoute>}  />
        <Route path = "/product" element={<AdminRoute><Product/></AdminRoute>}/>
        <Route path = "/user" element={<AdminRoute><User/></AdminRoute>}/>
        <Route path = "/category" element={<AdminRoute><Category/></AdminRoute>}/>
        <Route path = "/auction" element={<AdminRoute><Auction/></AdminRoute>}/>
        <Route path = "/add-auction" element={<AdminRoute><AddAuction/></AdminRoute>}/>
        <Route path = "/view-auction" element={<AdminRoute><ViewAuction/></AdminRoute>}/>
        <Route path = "/view-edit-auction/:id" element={<AdminRoute><ViewEditAuction/></AdminRoute>}/>
        <Route path = "/edit-auction/:id" element={<AdminRoute><EditAuction/></AdminRoute>}/>
        <Route path = "/auction-summary/:id" element={<AdminRoute><AuctionSummary/></AdminRoute>}/>
        <Route path = "/go-to-auction" element={<UserRoute><BidAuction/></UserRoute>}/>
        <Route path = "/bid-card/:id" element={<UserRoute><BidCard/></UserRoute>}/>
        </Routes>
    </>
  );
}

export default App;
