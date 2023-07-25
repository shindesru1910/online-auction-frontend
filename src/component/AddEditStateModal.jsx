import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditStateModal(props) {
  const { state, id, onHide,handlesave,flag,editstatedata } = props;
  
  let InitialState;
  if(flag === 'edit'){
    InitialState = editstatedata;
  }else{
    InitialState = {name:'',shorthand:''}
  }

  const [stateData, setstateData] = useState(InitialState);
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setstateData(Prev => ({...Prev,[name]:value}))
  }
  try {
    return (
      <Modal
        {...props}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add State
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Name</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                value={stateData.name}
                onChange={handleChange}
                />
            </div>
          </div>
          {/* <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Shorthand</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="shorthand"
                value={stateData.shorthand}
                onChange={handleChange}
              />
            </div>
          </div> */}
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={()=>handlesave(stateData)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditStateModal;
