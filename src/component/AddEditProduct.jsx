import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditProduct(props) {
  const { onHide,flag,editproductdata,handlesave} = props;
  
  let InitialState;
  if(flag === 'edit'){
    InitialState = editproductdata;
    console.log(editproductdata);
  }else{
    InitialState = {pro_name:'',pro_purchase_rate:'',pro_expected_rate:'',pro_category:'',pro_qty:''}
  }

  const [productData, setproductData] = useState(InitialState);
  console.log(productData);
  const handleChange = (e) =>{
    const {name,value} = e.target;
    console.log(name,value);
    setproductData(Prev => ({...Prev,[name]:value}))
  }
  try {
    return (
      <Modal
        {...props}
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {flag ==='add'?'Add Product':'Edit Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Prouct Name</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name = "pro_name"
                value={productData.pro_name}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
           <div className="col-3 d-flex justify-content-center">Purchase Rate</div>
           <div className="col">
              <input
                type="text"
                className="form-control"
                name ="pro_purchase_rate"
                value={productData.pro_purchase_rate}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
             <div className="col-3 d-flex justify-content-center">Expected Rate</div>
             <div className="col">
              <input
                type="text"
                className="form-control"
                name = "pro_expected_rate"
                value={productData.pro_expected_rate}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Category</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "pro_category"
                value={productData.pro_category}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Quantity</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "pro_qty"
                value={productData.pro_qty}
                onChange={handleChange}
                />
            </div>
            </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={()=>handlesave(productData)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditProduct;
