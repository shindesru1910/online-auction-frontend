// import React,{useState,useEffect} from 'react'
// import axios from 'axios';

// export default function AuctionSummary() {
//     const InitialState = { product_category_id: '', product_name: '', product_description: '', product_quantity: '', seller_name: '', seller_phone: '', state_id: '', city_id: '', start_price: '', no_of_bids: '', latest_bid: '', your_bid: '',first_name:'',last_name:'',phone:'', start_date: '', end_date: '' }
//     const[AuctionSummaryData,setAuctionSummaryData]=useState({InitialState});
//     console.log(AuctionSummaryData);
//     useEffect(()=>{
//         let formdata = new FormData();
//         formdata.append("auction_id", id)
//         // formdata.append("phone", user.userphone)
//         axios.post("http://localhost:8000/user/get-auction-summary", formdata)
//             .then((response) => {
//                 if (response.data.status === 200) {
//                     setAuctionSummaryData(response.data.msg);
//                     console.log(setAuctionSummaryData);
//                 }
//             })
//     },[])
//     return (
        
//         <>
//         <div className="d-flex justify-content-center rounded ">
//             <div className="card shadow mt-3" style={{ width: "18rem" }}>
//                 <div className="container d-flex justify-content-center mt-3">
//                     <b style={{color:'green'}}>Auction Id</b>
//                 </div>
//                 <hr />
//                 <div className="container">
//                     <b>Product Name:</b>{AuctionSummaryData.product_name}
//                 </div>
//                 <div className="container">
//                     <b>Product Description:</b>{AuctionSummaryData.product_description}
//                 </div>
//                 <div className="container">
//                     <b>Seller Name : </b>{AuctionSummaryData.seller_name}
//                 </div>
//                 <div className="container">
//                     <b>Seller Phone : </b>{AuctionSummaryData.seller_phone}
//                 </div>
//                 <div className="container">
//                     <b>Quantity of product : </b>{AuctionSummaryData.product_quantity}
//                 </div>
//                 <div className="container">
//                     <b>Product Category : </b>{AuctionSummaryData.product_category_id.name}
//                 </div>
//                 <div className="container">
//                     <b>Start Price : </b>{AuctionSummaryData.start_price}
//                 </div>
//                 <div className="container">
//                     <b>No. of Bids : </b>{AuctionSummaryData.no_of_bids}
//                 </div>
//                 <div className="container">
//                     <b>Final Bid : </b>{AuctionSummaryData.latest_bid}
//                 </div>
//                 <div className="container">
//                     <b>Customer Name: </b>{AuctionSummaryData.first_name}
//                 </div>
//                 <div className="container">
//                     <b>Customer Phone: </b>{AuctionSummaryData.phone}
//                 </div>
//                 <hr />
//                 <div className='d-flex justify-content-center'>
//                     <div className="container">
//                         <b style={{color:'red'}}>Start Date</b>07/08/23 14:24
//                     </div>
//                     <div className="d-flex" style={{ height: "60px", marginTop: "-17px", marginBottom: " -5px" }}>
//                         <div className="vr"></div>
//                     </div>

//                     <div className="container">
//                         <b style={{color:'red'}}>End Date</b> 08/08/23 14:24
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }
