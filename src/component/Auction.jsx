import React from 'react'
import Card from '../common/card'
import AddAuction from './AddAuction'

export default function Auction() {
  return (
    <div>
      <h1>Auctions</h1>
        <div className="container mt-3 d-flex flex-wrap">
        <Card name = "Add Auction" to="/add-auction"/>
        <Card name = "View Auction" to="/view-auction"/>
        </div>
    </div>
  )
}
