import React from 'react'
import Card from '../common/Card'
import { useParams } from 'react-router-dom';
import Editimg from '../images/edit_auction.svg'
import Summary from '../images/summary.svg'


export default function ViewEditAuction() {
    const { id } = useParams();
    
  return (
    <div className="container mt-3 d-flex flex-wrap justify-content-center">
        <Card name = "Auction Summary" to={`/auction-summary/${id}`} img={Summary}/>
        <Card name = "Edit auction" to={`/edit-auction/${id}`}img={Editimg}/>
    </div>
  )
}
