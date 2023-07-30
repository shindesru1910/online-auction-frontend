import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditCity(props) {
  const { states, onHide,flag, editcitydata,handlesave} = props;
  // states.map((state)=>{(console.log(state.name))})
  let InitialState;
  if(flag === 'edit'){
    InitialState = editcitydata;
  }else{
    InitialState = {state:'',name:''}
  }

  const[citydata,setcitydata] = useState(InitialState);
  console.log(citydata);
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setcitydata(prev => ({...prev,[name]:value}))
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
          {flag ==='add'?'Add City':'Edit City'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">State</div>
            <div className="col">
          
            <select value={citydata.state_id} name="state_id" onChange={handleChange} class="form-select" aria-label="Default select example">
              <option selected>States</option>
              {states.map((state)=><option key={state.id} value={state.id}>{state.name}</option>)}
            </select>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">City</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                value={citydata.name}
                onChange={handleChange}
              />
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button  onClick={()=>handlesave(citydata)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditCity;
