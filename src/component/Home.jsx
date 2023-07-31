import React, { useEffect } from 'react'
import Card from '../common/Card'
import Cityimg from '../images/city.svg'
import Stateimg from '../images/state.svg'
import userimg from '../images/user.svg'
import Auctionimg from '../images/auction.svg'
import Productimg from'../images/product.svg'
import Product_cat_img from '../images/product_cat.svg'

function Home() {

    return (
        <>
            <div className="container mt-3 d-flex flex-wrap justify-content-center">
                <Card name="State" to="/state" img={Stateimg}/>
                <Card name="City" to="/city" img={Cityimg}/>
                <Card name="User" to="/user" img ={userimg}/>
                <Card name="Auction" to="/auction" img ={Auctionimg}/>
                <Card name="Product" to="/product" img={Productimg}/>
                <Card name="Product Category" to="/category" img={Product_cat_img}/>
            </div>
        </>
    )
}

export default Home
