import React from 'react'

export default function BidCard() {
    return (
        <div className="d-flex justify-content-center rounded ">
            <div className="card shadow mt-3" style={{ width: "18rem" }}>
                <div className="container d-flex justify-content-center mt-3">
                    <b>Auction Id </b>
                </div>
                <hr />
                <div className="container">
                    <b>Product Name:</b>
                </div>
                <div className="container">
                    <b>Product Description:</b>
                </div>
                <div className="container">
                    <b>Seller Name : </b>
                </div>
                <div className="container">
                    <b>Seller Phone : </b>
                </div>
                <div className="container">
                    <b>Quantity of product : </b>
                </div>
                <div className="container">
                    <b>Product Category : </b>
                </div>
                <div className="container">
                    <b>Start Price : </b>
                </div>
                <div className="container">
                    <b>No. of Bids : </b>
                </div>
                <div className="container">
                    <b>Current Bid : </b>
                </div>
                <div className="container">
                    <b>Your Bid : </b>
                </div>
                <hr />
                <div className='d-flex justify-content-center'>
                    <div className="container">
                        <b>Start Date</b>
                    </div>
                    <div class="d-flex" style={{height: "60px",marginTop:"-17px",marginBottom:" -5px"}}>
                        <div class="vr"></div>
                    </div>

                    <div className="container">
                        <b>End Date</b>
                    </div>
                </div>
                <div className="contain">
                    <input className="ml-2" type="number" name="bid" value="bid" placeholder='Bid' />
                    <button className="btn btn-success ml-2 mb-2">Submit</button>
                </div>
            </div>
        </div>
    )
}
