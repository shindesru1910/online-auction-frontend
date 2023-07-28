import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditUserModal(props) {
  const { state, id, onHide,flag,editUserData,handlesave} = props;
  
  let InitialState;
  if(flag === 'edit'){
    InitialState = editUserData;
    console.log(editUserData);
  }else{
    InitialState = {first_name:'',last_name:'',phone:'',password:'',address:'',is_admin:'',state_id:'',city_id:''}
  }

  const [userData, setuserData] = useState(InitialState);
  console.log(userData);
  const handleChange = (e) =>{
    const {name,value} = e.target;
    console.log(name,value);
    setuserData(Prev => ({...Prev,[name]:value}))
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
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Fisrt Name</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name = "first_name"
                value={userData.first_name}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
           <div className="col-3 d-flex justify-content-center">Last Name</div>
           <div className="col">
              <input
                type="text"
                className="form-control"
                name ="last_name"
                value={userData.last_name}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
             <div className="col-3 d-flex justify-content-center">Phone Number</div>
             <div className="col">
              <input
                type="text"
                className="form-control"
                name = "phone"
                value={userData.phone}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Address</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "address"
                value={userData.address}
                onChange={handleChange}
                />
                </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Is Admin</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "is_admin"
                value={userData.is_admin}
                onChange={handleChange}
                />
            </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">State Id</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "state_id"
                value={userData.state_id}
                onChange={handleChange}
                />
            </div>
            </div>
          <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">City</div>
          <div className="col">
              <input
                type="text"
                className="form-control"
                name = "city_id"
                value={userData.city_id}
                onChange={handleChange}
                />
            </div>
            </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={()=>handlesave(userData)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditUserModal;
