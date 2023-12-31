import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


function AddEditStateModal(props) {
  const { onHide, flag, editstatedata, handlesave, loading } = props;

  let InitialState;
  if (flag === 'edit') {
    InitialState = editstatedata;
  } else {
    InitialState = { name: '' }
  }

  const [stateData, setstateData] = useState(InitialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstateData(Prev => ({ ...Prev, [name]: value }))
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
            {flag === 'add' ? 'Add State' : 'Edit State'}
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

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          {loading ? <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </button>
            :
            <button type="button" className="btn btn-primary" onClick={()=>handlesave(stateData)}>
              Save</button>}
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditStateModal;
