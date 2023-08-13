import React, { useEffect, useState } from 'react';
import styles from '../css/add_auction.module.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {successtoast} from '../fucntions/toast';

export default function AddAuction() {
  const InitialState = {product_category_id:'',product_name:'',product_description:'',product_quantity:'',seller_name:'',seller_phone:'',state_id:'',city_id:'',start_price:'',start_date:'',end_date:''}
  const[auctionData,setauctionData]=useState(InitialState);
  const[category,setcategory]=useState([]);
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  
  useEffect(()=>{
    axios.get("/user/get-category")
      .then((response) => {
        if (response.status === 200) {
          setcategory(response.data.data)
          console.log(response.data.data);
        }
      })
      axios.get("/user/get-state")
      .then((response) => {
        if (response.status === 200) {
          setstates(response.data.data)
          console.log(response.data.data);
        }
      })
  },[])
  

  useEffect(() => {
    if (auctionData.state_id !== '') {
      let formdata = new FormData()
      formdata.append('state_id', auctionData.state_id)
      axios.post("/user/get-all-city-by-state-id", formdata)
        .then((response) => {
          if (response.status === 200) {
            setcities(response.data.data)
          }
        })
    }
  }, [auctionData.state_id])

  const handleChange = (e) =>{
    const {name,value} = e.target
    if(name==='start_date' || name === 'end_date'){
    let modifiedValue = value.replace('T', ' ');
    console.log(name,modifiedValue);
    setauctionData(prev => ({...prev,[name]:modifiedValue}))
    }
    else{
    console.log(name,value)
    setauctionData(prev => ({...prev,[name]:value}))
    }
  }

  const handleSubmit = () => {
  
    let formdata = new FormData()
    formdata.append('product_category_id',auctionData.product_category_id)
    formdata.append('product_name',auctionData.product_name)
    formdata.append('product_description',auctionData.product_description)
    formdata.append('product_quantity',auctionData.product_quantity)
    formdata.append('seller_name',auctionData.seller_name)
    formdata.append('seller_phone',auctionData.seller_phone)
    formdata.append('city_id',auctionData.city_id)
    formdata.append('start_price',auctionData.start_price)
    formdata.append('start_date',auctionData.start_date)
    formdata.append('end_date',auctionData.end_date)
    axios.post("/user/create-auction",formdata)
    .then((response)=>{
        if(response.status === 200){
          console.log(response.data.msg);
          successtoast(response.data.msg);
          window.location.reload();
        }
    })
  }

  return (
    <>
    <ToastContainer />
    <div className={`container border mt-4 shadow ${styles['add-auction-form']}`}>
      <div className='container d-flex justify-content-center mt-2 mb-2'>
        <h2>Add Auction</h2>
      </div>
      <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Category</div>
            <div className="col">
          
            <select className="form-select" aria-label="Default select example" value={auctionData.product_category_id} name="product_category_id" onChange={handleChange}>
              <option selected>Category</option>
              {category.map((cat_data)=><option key={cat_data.id} value={cat_data.id}>{cat_data.name}</option>)}
            </select>
            </div>
          </div>
      <div className="mb-3">
        <label className="form-label">
          Product Name
        </label>
        <input type="text" className="form-control" name="product_name" id="exampleFormControlInput1" placeholder='Product Name' onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Product Description
        </label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"placeholder='Product Description'name="product_description" onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Product Quantity
        </label>
        <input type="Number" className="form-control" id="exampleFormControlInput1" min={1} placeholder='Product Quantity'name="product_quantity" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label className="form-label">
        Seller Name
        </label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='Seller Name'name="seller_name" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label className="form-label">
        Seller Phone
        </label>
        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder='Seller Phone'name="seller_phone" onChange={handleChange}/>
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
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='Start Price'name="start_price" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label className="form-label">
        Start Date
        </label>
        <input type="datetime-local" className="form-control" id="exampleFormControlInput1" placeholder='Start Date'name="start_date" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label className="form-label">
        End Date
        </label>
        <input type="datetime-local" className="form-control" id="exampleFormControlInput1" placeholder='End Date'name="end_date" onChange={handleChange}/>
      </div>
      <div className="container d-flex justify-content-center">
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </>
  );
}
