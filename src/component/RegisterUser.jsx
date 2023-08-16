import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { errortoast } from '../fucntions/toast';


function RegisterUser(props) {
  const { states, onHide, flag, editUserData, handlesave } = props;
  // const [isChecked, setIsChecked] = useState(false);
  const [cities, setcities] = useState([]);
  // console.log(cities);
  let InitialState;
  if (flag === 'edit') {
    InitialState = editUserData;
    // console.log(editUserData);
  } else {
    InitialState = { first_name: '', last_name: '', phone: '', password: '', address: '', is_admin: '', state_id: '', city_id: '' }
  }
  const [userData, setuserData] = useState(InitialState);
  console.log(userData);
  useEffect(() => {
    if (userData.state_id !== '') {

      let formdata = new FormData()
      formdata.append('state_id', userData.state_id)
      axios.post("/user/get-all-city-by-state-id", formdata)
        .then((response) => {
          if (response.data.status === 200) {
            setcities(response.data.data)
          } else {
            errortoast(response.data.msg);
          }
        })
    }
    console.log(userData.state_id)
  }, [userData.state_id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData(Prev => ({ ...Prev, [name]: value }))
  }
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setuserData(Prev => ({ ...Prev, [name]: checked }))
    console.log(e.target.checked);
  };
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
            <h3 style={{ color: 'blue' }}>Register Here</h3>
            {/* {flag === 'add' ? 'Add User' : 'Edit user'} */}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handlesave(e, userData)} className='needs-validation was-validated'>
          <Modal.Body>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Fisrt Name</div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Last Name</div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Phone Number</div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}" 
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Address</div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {flag === 'add' &&
              <>
                <div className="row mb-2">
                  <div className="col-3 d-flex justify-content-center">Password</div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-3 d-flex justify-content-center">Confirm Password</div>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                      value={userData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            }

            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">State</div>
              <div className="col">

                <select value={userData.state_id} className={`form-select ${userData.state_id === '' ? 'is-invalid' : ''}`} required name="state_id" onChange={handleChange} class="form-select" aria-label="Default select example">
                  <option value="" disabled>State</option>
                  {states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
                </select>
                {userData.state_id === '' && (
                  <div className="invalid-feedback">Please select a state</div>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">City</div>
              <div className="col">

                <select
                  value={userData.city_id}
                  name="city_id"
                  onChange={handleChange}
                  className={`form-select ${userData.city_id === '' ? 'is-invalid' : ''}`}
                  aria-label="Default select example"
                  required
                  title="Please select a city"
                >
                  <option value="" disabled>City</option>
                  {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
                {userData.city_id === '' && (
                  <div className="invalid-feedback">Please select a city</div>
                )}

              </div>
            </div>
            {/* <div className="col ml-6 offset-1">
            <label>
              <input
                type="checkbox"
                name="is_admin"
                className="me-2"
                checked={userData.is_admin}
                onChange={handleCheckboxChange} // Allow users to toggle the checkbox directly
              />
              Is Admin?
            </label>
          </div> */}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default RegisterUser;
