import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditCategoryModal(props) {
  const { state, id, onHide,flag,editcategorydata,handlesave} = props;
  
  let InitialState;
  if(flag === 'edit'){
    InitialState = editcategorydata;
  }else{
    InitialState = {name:''}
  }

  const [categoryData, setcategoryData] = useState(InitialState);
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setcategoryData(Prev => ({...Prev,[name]:value}))
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
          {flag ==='add'?'Add Category':'Edit Category'}
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
                value={categoryData.name}
                onChange={handleChange}
                />
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={()=>handlesave(categoryData)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditCategoryModal;
