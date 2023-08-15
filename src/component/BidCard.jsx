import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import { errortoast, successtoast } from '../fucntions/toast';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function BidCard() {
    const token = localStorage.getItem("token");
    const user = jwt(token);
    const InitialState = { product_category_id: '', product_name: '', product_description: '', product_quantity: '', seller_name: '', seller_phone: '', state_id: '', city_id: '', start_price: '', no_of_bids: '', latest_bid: '', your_bid: '', start_date: '', end_date: '' }
    const [BidCardData, setBidCardData] = useState({ InitialState });
    const [bid, setbid] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);


    const { id } = useParams();


    useEffect(() => {

        const endDateTime = new Date(BidCardData.end_date).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = endDateTime - currentTime;
        let intervalId;

        if (timeDifference > 0) {
            setRemainingTime(timeDifference);

            // Decrease the remaining time at a regular interval (every second)
            intervalId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1000);
            }, 1000);


        } else {
            // If the auction has already ended, set remainingTime to 0
            setRemainingTime(0);
        }


        const unsubauction = onSnapshot(doc(db, "auction", id), (doc) => {
            if (doc.exists()) {
                const firestore_data = doc.data();

                // console.log("auction data: ", firestore_data);
                setBidCardData(prev => ({ ...prev, 'no_of_bids': firestore_data.no_of_bids, 'latest_bid': parseFloat(firestore_data.latest_bid) }))
            }
        });
        const user_phone = user.userphone
        const unsubuserbid = onSnapshot(doc(db, "user_bid", user_phone.toString(), "auction", id), (doc) => {
            if (doc.exists()) {

                const firestore_data = doc.data();
                // console.log(firestore_data);
                // console.log("user bid data: ", firestore_data);
                setBidCardData(prev => ({ ...prev, 'your_bid': parseFloat(firestore_data.bid) }))
            }
        });

        let formdata = new FormData();
        formdata.append("auction_id", id)
        formdata.append("phone", user.userphone)
        axios.post("/user/get-card-auction-information", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    setBidCardData(response.data.data)
                    axios.post("/user/get-user-bid", formdata)
                        .then((response) => {
                            if (response.data.status === 200) {
                                setBidCardData(prev => ({ ...prev, 'your_bid': response.data.data.bid }))
                            }else{
                                errortoast(response.data.msg);
                              }
                        })
                }else{
                    errortoast(response.data.msg);
                  }
            })

        return () => {
            // Stop listening to changes
            unsubauction();
            unsubuserbid();
            clearInterval(intervalId);
        }

    }, [BidCardData.end_date]);


    const submitBid = () => {
        // const confirmSubmit = window.confirm("Are you sure you want to submit this bid?");
        // if (confirmSubmit) {
        let formdata = new FormData();
        formdata.append("auction_id", id)
        formdata.append("phone", user.userphone)
        formdata.append("bid", bid)
        axios.post("/user/set-user-bid", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    successtoast(response.data.msg);

                } else {
                    errortoast(response.data.msg);
                }
            })
        // }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setbid(value)
    }

    return (
        <>
            <ToastContainer />
            <div className="d-flex justify-content-center rounded ">
                <div className="card shadow mt-3" style={{ width: "18rem" }}>
                    <div className="container d-flex justify-content-center mt-3">
                        <b style={{ color: 'green' }}>{BidCardData.auction_id} </b>
                    </div>
                    {remainingTime > 0 ? (
                        <div className="container d-flex justify-content-center">
                            <b> {new Date(remainingTime).toISOString().substr(11, 8)}</b>
                        </div>
                    ) : (
                        <div className="container d-flex justify-content-center">
                            <b>Auction Ended</b>
                        </div>
                    )}
                    {/* <hr /> */}
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" class="d-block w-100" alt="..."  style={{height:"50%"}}/>
                            </div>
                            <div class="carousel-item">
                                <img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" class="d-block w-100" alt="..."  style={{height:"50%"}}/>
                            </div>
                            <div class="carousel-item">
                                <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" class="d-block w-100" alt="..." style={{height:"50%"}} />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="container">
                        <b>Product Name:</b>{BidCardData.product_name}
                    </div>
                    <div className="container">
                        <b>Product Description:</b>{BidCardData.product_description}
                    </div>
                    <div className="container">
                        <b>Seller Name : </b>{BidCardData.seller_name}
                    </div>
                    <div className="container">
                        <b>Seller Phone : </b>{BidCardData.seller_phone}
                    </div>
                    <div className="container">
                        <b>Quantity of product : </b>{BidCardData.product_quantity}
                    </div>
                    <div className="container">
                        <b>Product Category : </b>{BidCardData.product_category_name}
                    </div>
                    <div className="container">
                        <b>Start Price : </b>{BidCardData.start_price}
                    </div>
                    <div className="container">
                        <b>No. of Bids : </b>{BidCardData.no_of_bids}
                    </div>
                    <div className="container">
                        <b>Current Bid : </b>{BidCardData.latest_bid}
                    </div>
                    <div className="container">
                        <b>Your Bid : </b>{BidCardData.your_bid}
                        {(BidCardData.your_bid === BidCardData.latest_bid && BidCardData.your_bid !== 0) && (
                            <span className="badge badge-success ml-2">Winning</span>
                        )}
                        {(BidCardData.your_bid !== BidCardData.latest_bid && BidCardData.your_bid !== 0) && (
                            <span className="badge badge-danger ml-2">Loosing</span>
                        )}
                        {BidCardData.your_bid === 0 && (
                            <span className="badge badge-secondary ml-2">Not Bidded</span>
                        )}
                        {/* {BidCardData.your_bid>BidCardData.latest_bid ? (
                            <span className="badge badge-success ml-2">Winning</span>
                        ):( <span className="badge badge-danger ml-2">Loser</span>)} */}
                    </div>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <div className="container">
                            <b style={{ color: 'red' }}>Start Date</b>{BidCardData.start_date}
                        </div>
                        <div className="d-flex" style={{ height: "60px", marginTop: "-17px", marginBottom: " -5px" }}>
                            <div className="vr"></div>
                        </div>

                        <div className="container">
                            <b style={{ color: 'red' }}>End Date</b>{BidCardData.end_date}
                        </div>
                    </div>
                    <div className="contain">
                        <input className="ml-2" type="number" name="bid" value={bid} placeholder='Bid' onChange={handleChange} />
                        <button className="btn btn-success ml-2 mb-2" onClick={submitBid}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
