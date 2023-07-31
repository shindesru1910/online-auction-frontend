import React, { useState, useEffect } from 'react'
// import Card from '../common/Card'
import axios from 'axios';
import { Link } from 'react-router-dom'
import AuctionTable from '../common/AuctionTable';

export default function ViewAuction() {
    const [activetab, setactibetab] = useState('live');
    const [auctionData, setauctionData] = useState([]);
    console.log(auctionData);
    useEffect(() => {
        if (activetab === 'live') {
            axios.get("http://localhost:8000/user/get-live-auctions")
                .then((response) => {
                    if (response.status === 200) {
                        setauctionData(response.data.data)
                    }
                })
        }
        else if (activetab==='upcoming') { 
            axios.get("http://localhost:8000/user/get-upcoming-auctions")
                .then((response) => {
                    if (response.status === 200) {
                        setauctionData(response.data.data)
                    }
                })
        }
        else if (activetab==='completed') { 
            axios.get("http://localhost:8000/user/get-completed-auctions")
                .then((response) => {
                    if (response.status === 200) {
                        setauctionData(response.data.data)
                    }
                })
        }
    }, [activetab])

    const setactivetab = (tab) => {
        setactibetab(tab)
    }
    return (
        <>
            <div className="container mt-3 d-flex flex-wrap justify-content-center">
                
                <ul className="nav nav-tabs">
                    <li className="nav-item ">
                        <Link className={`nav-link  ${activetab === 'live' && 'active'}`} aria-current="page" to="#" onClick={() => setactivetab('live')}>Live</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activetab === 'upcoming' && 'active'}`} to="#" onClick={() => setactivetab('upcoming')}>Upcoming</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activetab === 'completed' && 'active'}`} to="#" onClick={() => setactivetab('completed')}>Completed</Link>
                    </li>
                </ul>
                <AuctionTable column={[{ key: "auction_id", lable: "Auction Id" }, { key: "product_category_name", lable: "Product category" }, { key: "product_name", lable: "Product Name" }, { key: "product_quantity", lable: "Quantity Of Product" }, { key: "state_name", lable: "State" }, { key: "city_name", lable: "City" }, { key: "start_price", lable: "Start Price" }, { key: "start_date", lable: "Start Date" }, { key: "end_date", lable: "End Date" }]} data={auctionData} />
            </div>

        </>
    )
}
