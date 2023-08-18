import React, { useEffect, useState } from 'react';
import styles from '../css/add_auction.module.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { errortoast, successtoast } from '../fucntions/toast';

export default function AddAuction() {
  const InitialState = { product_category_id: '', product_name: '', product_description: '', product_quantity: '', seller_name: '', seller_phone: '', state_id: '', city_id: '', start_price: '', start_date: '', end_date: '' }
  const [auctionData, setauctionData] = useState(InitialState);
  const [category, setcategory] = useState([]);
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [loading, setloading] = useState(false);
  const [isCategoryValid, setIsCategoryValid] = useState(true);

  console.log(auctionData)
  useEffect(() => {
    axios.get("/user/get-category")
      .then((response) => {
        if (response.data.status === 200) {
          setcategory(response.data.data)
          console.log(response.data.data);
        } else {
          errortoast(response.data.msg);
        }
      })
    axios.get("/user/get-state")
      .then((response) => {
        if (response.data.status === 200) {
          setstates(response.data.data)
          console.log(response.data.data);
        } else {
          errortoast(response.data.msg);
        }
      })
  }, [])


  useEffect(() => {
    if (auctionData.state_id !== '') {
      let formdata = new FormData()
      formdata.append('state_id', auctionData.state_id)
      axios.post("/user/get-all-city-by-state-id", formdata)
        .then((response) => {
          if (response.data.status === 200) {
            setcities(response.data.data)
          } else {
            errortoast(response.data.msg);
          }
        })
    }
  }, [auctionData.state_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "product_category_id") {
      setIsCategoryValid(value !== "");
    }
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setauctionData((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);

    const startDate = new Date(auctionData.start_date);
    const endDate = new Date(auctionData.end_date);

    if (endDate <= startDate) {
      errortoast("End date must be after start date.");
      setloading(false);
      return;
    }
    let formdata = new FormData()
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
    axios.post("/user/create-auction", formdata)
      .then((response) => {
        if (response.data.status === 200) {
          successtoast(response.data.msg);
          window.location.reload();
        }
         else {
          errortoast(response.data.msg);
        }
      })
      .finally(() => setloading(false));
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='needs-validation was-validated'>
        <div className={`container border mt-4 shadow ${styles['add-auction-form']}`}>
          <div className='container d-flex justify-content-center mt-2 mb-2'>
            <h2>Add Auction</h2>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Category</div>
            <div className="col">

              <select
                className={`form-select ${auctionData.product_category_id === '' ? 'is-invalid' : ''}`}
                aria-label="Default select example"
                value={auctionData.product_category_id}
                name="product_category_id"
                onChange={handleInputChange}
                required
                title="Please select a category"
              >
                <option value="" disabled>Category</option>
                {category.map((cat_data) => <option key={cat_data.id} value={cat_data.id}>{cat_data.name}</option>)}
              </select>
              {auctionData.product_category_id === '' && (
                <div className="invalid-feedback">Please select a category</div>
              )}


            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Product Name
            </label>
            <input type="text" className="form-control" name="product_name" id="exampleFormControlInput1" placeholder='Product Name' onChange={handleInputChange} pattern=".{3,}" title="Minimum 3 characters required" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Product Description
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Product Description' name="product_description" onChange={handleInputChange} pattern=".{4,}" title="Minimum 4 characters required" required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Product Quantity
            </label>
            <input type="Number" className="form-control" id="exampleFormControlInput1" min={1} placeholder='Product Quantity' name="product_quantity" onChange={handleInputChange} minLength={1} required />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Seller Name
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='Seller Name' name="seller_name" onChange={handleInputChange} pattern=".{4,}" title="Minimum 4 characters required" required />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Seller Phone
            </label>
            <input type="tel" name="seller_phone" onChange={handleInputChange} placeholder='Seller Phone' className="form-control" id="floatingInput"  pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">State</div>
            <div className="col">

              <select
                value={auctionData.state_id}
                name="state_id"
                onChange={handleInputChange}
                className={`form-select ${auctionData.state_id === '' ? 'is-invalid' : ''}`}
                aria-label="Default select example"
                required
                title="Please select a state"
              >
                <option value="" disabled>State</option>
                {states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
              </select>
              {auctionData.state_id === '' && (
                <div className="invalid-feedback">Please select a state</div>
              )}

            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">City</div>
            <div className="col">

              <select
                value={auctionData.city_id}
                name="city_id"
                onChange={handleInputChange}
                className={`form-select ${auctionData.city_id === '' ? 'is-invalid' : ''}`}
                aria-label="Default select example"
                required
                title="Please select a city"
              >
                <option value="" disabled>City</option>
                {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
              {auctionData.city_id === '' && (
                <div className="invalid-feedback">Please select a city</div>
              )}

            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Start Price
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='Start Price' name="start_price" onChange={handleChange} pattern="[0-9]+(\.[0-9]{2})?" title="Please Enter valid price" required />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Start Date
            </label>
            <input type="datetime-local" className="form-control" id="exampleFormControlInput1" placeholder='Start Date' name="start_date" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">
              End Date
            </label>
            <input type="datetime-local" className="form-control" id="exampleFormControlInput1" placeholder='End Date' name="end_date" onChange={handleChange} min={auctionData.start_date} title="End date must be after start date" required />
          </div>
          <div className="container d-flex justify-content-center">
            {loading ? <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Loading...
            </button> :
              <button type="submit" className="btn btn-primary" >
                Submit</button>}
          </div>
        </div>
      </form>
    </>
  );
}
