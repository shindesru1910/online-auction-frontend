import React, { useEffect, useState } from 'react';
import styles from '../css/add_auction.module.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {errortoast, successtoast} from '../fucntions/toast';
import { useParams } from 'react-router-dom';

export default function EditAuction() {
    const InitialState = { product_category_id: '', product_name: '', product_description: '', product_quantity: '', seller_name: '', seller_phone: '', state_id: '', city_id: '', start_price: '', start_date: '', end_date: '' }
    const [auctionData, setauctionData] = useState(InitialState);
    console.log(auctionData);
    const [category, setcategory] = useState([]);
    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);
    const [loading, setloading] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        let formdata = new FormData();
        formdata.append("auction_id", id)
        axios.post("/user/get-auction-by-id", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    setauctionData(response.data.data)
                }else{
                    errortoast(response.data.msg);
                  }
            })
    }, [])
    useEffect(()=>{
        axios.get("/user/get-category")
          .then((response) => {
            if (response.data.status === 200) {
              setcategory(response.data.data)
              console.log(response.data.data);
            }else{
                errortoast(response.data.msg);
              }
          })
          axios.get("/user/get-state")
          .then((response) => {
            if (response.data.status === 200) {
              setstates(response.data.data)
              console.log(response.data.data);
            }else{
                errortoast(response.data.msg);
              }
          })
      },[])

      useEffect(() => {
        if (auctionData.state_id !== '') {
          let formdata = new FormData()
          formdata.append('state_id', auctionData.state_id)
          axios.post("/user/get-all-city-by-state-id", formdata)
            .then((response) => {
              if (response.data.status === 200) {
                setcities(response.data.data)
              }else{
                errortoast(response.data.msg);
              }
            })
        }
      }, [auctionData.state_id])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'start_date' || name === 'end_date') {
            let modifiedValue = value.replace('T', ' ');
            console.log(name, modifiedValue);
            setauctionData(prev => ({ ...prev, [name]: modifiedValue }))
        }
        else {
            console.log(name, value)
            setauctionData(prev => ({ ...prev, [name]: value }))
        }
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        setloading(true);
        let formdata = new FormData()
        formdata.append("auction_id", id)
        formdata.append('product_category_id', auctionData.product_category_id)
        formdata.append('product_name', auctionData.product_name)
        formdata.append('product_description', auctionData.product_description)
        formdata.append('product_quantity', auctionData.product_quantity)
        formdata.append('seller_name', auctionData.seller_name)
        formdata.append('seller_phone', auctionData.seller_phone)
        formdata.append('city_id', auctionData.city_id)
        formdata.append('start_price', auctionData.start_price)
        formdata.append('start_date', auctionData.start_date)
        formdata.append('end_date', auctionData.end_date)
        axios.post("/user/update-auction", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    console.log(response.data.msg);
                    successtoast(response.data.msg);
                    window.location.reload();
                }else{
                    errortoast(response.data.msg);
                  }
            })
            .finally(()=>setloading(false));
    }
    return (
        <>
            <ToastContainer />
            <div className={`container border mt-4 shadow ${styles['add-auction-form']}`}>
                <div className='container d-flex justify-content-center mt-2 mb-2'>
                    <h2>Edit Auction</h2>
                </div>
                <div className="row mb-2">
                    <div className="col-3 d-flex justify-content-center">Category</div>
                    <div className="col">

                        <select className="form-select" aria-label="Default select example" value={auctionData.product_category_id} name="product_category_id" onChange={handleChange}>
                            <option selected>Category</option>
                            {category.map((cat_data) => <option key={cat_data.id} value={cat_data.id}>{cat_data.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Product Name
                    </label>
                    <input type="text" value={auctionData.product_name} className="form-control" name="product_name" id="exampleFormControlInput1" placeholder='Product Name' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Product Description
                    </label>
                    <textarea className="form-control" value={auctionData.product_description} id="exampleFormControlTextarea1" rows="3" placeholder='Product Description' name="product_description" onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Product Quantity
                    </label>
                    <input type="Number" className="form-control" value={auctionData.product_quantity} id="exampleFormControlInput1" min={1} placeholder='Product Quantity' name="product_quantity" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Seller Name
                    </label>
                    <input type="text" className="form-control" value={auctionData.seller_name} id="exampleFormControlInput1" placeholder='Seller Name' name="seller_name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Seller Phone
                    </label>
                    <input type="number" className="form-control" value={auctionData.seller_phone} id="exampleFormControlInput1" placeholder='Seller Phone' name="seller_phone" onChange={handleChange} />
                </div>
                <div className="row mb-2">
                    <div className="col-3 d-flex justify-content-center">State</div>
                    <div className="col">

                        <select value={auctionData.state_id} name="state_id" onChange={handleChange} className="form-select" aria-label="Default select example">
                            <option selected>State</option>
                            {states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3 d-flex justify-content-center">City</div>
                    <div className="col">

                        <select value={auctionData.city_id} name="city_id" onChange={handleChange} className="form-select" aria-label="Default select example">
                            <option selected>City</option>
                            {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Start Price
                    </label>
                    <input type="text" className="form-control" value={auctionData.start_price} id="exampleFormControlInput1" placeholder='Start Price' name="start_price" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Start Date
                    </label>
                    <input type="datetime-local" className="form-control" value={auctionData.start_date} id="exampleFormControlInput1" placeholder='Start Date' name="start_date" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        End Date
                    </label>
                    <input type="datetime-local" className="form-control" value={auctionData.end_date} id="exampleFormControlInput1" placeholder='End Date' name="end_date" onChange={handleChange} />
                </div>
                <div className="container d-flex justify-content-center">
                {loading ? <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </button> :
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit</button>}
                </div>
            </div>
        </>
    );
}
