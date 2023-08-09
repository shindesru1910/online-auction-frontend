import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AuctionSummary() {
    const { id } = useParams();
    const[AuctionSummary,setAuctionSummary] = useState([]);
    console.log(AuctionSummary);
    useEffect(()=>{
        let formdata = new FormData();
        formdata.append("auction_id",id)
        axios.post("http://localhost:8000/user/get-auction-summary",formdata)
          .then((response)=>{
              if(response.status === 200){
                setAuctionSummary(response.data.data)
                console.log(response.data.data)
    
              }
          })
        },[])

  return (
    <>
    <div className="container d-flex justify-content-center ">
            <h2>Auction Summary</h2>
    </div>
    <div className="container d-flex justify-content-center ">
      <table class="table">
  <thead className ="table-dark">
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Bidder Name</th>
      <th scope="col">Bidder Phone</th>
      <th scope="col">Bid</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    {AuctionSummary.map((summary,index) =>(
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{summary.bidder_name}</td>
      <td>{summary.bidder_phone}</td>
      <td>₹ {summary.bid}</td>
      <td>{summary.datetime}</td>
    </tr>
    ))}
  </tbody>
</table>
    </div>
    </>
  )
}
