import React, { useState, useEffect } from 'react'
// import Card from '../common/Card'
import axios from 'axios';
import { Link } from 'react-router-dom'
import AuctionTable from '../common/AuctionTable';
import Swal from 'sweetalert2';
import { errortoast } from '../fucntions/toast';

export default function ViewAuction() {
    const [activetab, setactibetab] = useState('live');
    const [auctionData, setauctionData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const[original,setoriginal] = useState([]);
    
    useEffect(() => {
        if (activetab === 'live') {
            axios.get("/user/get-live-auctions")
                .then((response) => {
                    if (response.data.status === 200) {
                        setauctionData(response.data.data)
                    } else {
                        errortoast(response.data.msg);
                    }
                })
        }
        else if (activetab === 'upcoming') {
            axios.get("/user/get-upcoming-auctions")
                .then((response) => {
                    if (response.data.status === 200) {
                        setauctionData(response.data.data)
                    } else {
                        errortoast(response.data.msg);
                    }
                })
        }
        else if (activetab === 'completed') {
            axios.get("/user/get-completed-auctions")
                .then((response) => {
                    if (response.data.status === 200) {
                        setauctionData(response.data.data)
                        setoriginal(response.data.data)
                    } else {
                        errortoast(response.data.msg);
                    }
                })
        }
    }, [activetab])

    const setactivetab = (tab) => {
        setactibetab(tab)
    }
    const handleDelete = (auctionData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let formdata = new FormData();
                formdata.append('auction_id', auctionData.auction_id);
                axios.post("/user/delete-auction", formdata)
                    .then((response) => {
                        if (response.data.status === 200) {
                            console.log(response.data.msg);

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            ).then((result) => window.location.reload())
                        } else {
                            errortoast(response.data.msg);
                        }
                    });

            }
        });
    };

    function convert_str_to_date (dateString){
        // Split the date and time parts
        const [datePart, timePart] = dateString.split(', ');

        // Split the date part into day, month, and year
        const [day, month, year] = datePart.split('-').map(Number);

        // Split the time part into hours and minutes
        const [hours, minutes] = timePart.split(':').map(Number);

        // Create the date object
        const dateObject = new Date(year, month - 1, day, hours, minutes);
        return dateObject
    }

    const fetchDataBetweenDates = () => {

        const filteredData = original.filter(item => {
            const itemStartDate = convert_str_to_date(item.start_date);
            const itemEndDate = convert_str_to_date(item.end_date);
            const filterStartDate = new Date(startDate);
            filterStartDate.setDate(filterStartDate.getDate() - 1);
            const filterEndDate = new Date(endDate);
            filterEndDate.setDate(filterEndDate.getDate() + 1);
          
            return itemStartDate >= filterStartDate && itemEndDate <= filterEndDate;
          });
        
        setauctionData(filteredData);
    };
    return (
        <>
            
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name} - {item.date_field}</li>
                ))}
            </ul>
            {/* <div className="container mt-3 d-flex flex-wrap justify-content-end">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div> */}
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
                <AuctionTable fetchDataBetweenDates={fetchDataBetweenDates} activetab={activetab} startDate={startDate} endDate={endDate}  column={[{ key: "auction_id", lable: "Auction Id" }, { key: "product_category_name", lable: "Product category" }, { key: "product_name", lable: "Product Name" }, { key: "product_quantity", lable: "Quantity Of Product" }, { key: "state_name", lable: "State" }, { key: "city_name", lable: "City" }, { key: "start_price", lable: "Start Price" }, { key: "start_date", lable: "Start Date" }, { key: "end_date", lable: "End Date" }]} data={auctionData} handledelete={handleDelete} setStartDate={setStartDate} setEndDate={setEndDate}/>
            </div>

        </>
    )
}
