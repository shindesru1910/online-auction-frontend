import React from 'react'
import Card from '../common/Card'
import Add_auction from '../images/add_auction.svg'
import View_auction from '../images/view_auction.svg'



export default function Auction() {
  return (
    <>
    <div>
      <h1>Auctions</h1>
      <div className="container mt-3 d-flex flex-wrap justify-content-center">
        <Card name = "Add Auction" to="/add-auction" img={Add_auction}/>
        <Card name = "View Auction" to="/view-auction" img={View_auction}/>
        </div>
    </div>
    </>
  )
}
