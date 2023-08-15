import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errortoast, successtoast } from '../fucntions/toast';
import Auction from '../images/auction .png';
// import AddEditUserModal from './AddEditUserModal';
import styles from '../css/login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import RegisterUser from './RegisterUser';

export default function Login() {
    const [login, setlogin] = useState({ phone: '', password: '' });
    const [users, setusers] = useState([]);
    const [states, setstates] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [flag, setflag] = useState("");
    const navigate = useNavigate();
    // const click = () => {
    //     <AddEditUserModal />
    //     console.log('Clicked');
    // }

    useEffect(() => {
        const token = localStorage.getItem("token");
        let user;
        let user_role;
        if (token) {
            user = jwt(token);
            user_role = user.role;
        }
        if (user) {
            return navigate('/');
        }
    }, [])

    useEffect(() => {
        axios.get("/user/get-state")
            .then((response) => {
                if (response.status === 200) {
                    setstates(response.data.data)
                }
            })
    }, [])
    const handleSave = (userData) => {
        if (flag === 'add') {
            if (userData.password !== userData.confirm_password) {
                errortoast('Password and confirm password is not matched');
                return
            }

            let formdata = new FormData()
            formdata.append('first_name', userData.first_name)
            formdata.append('last_name', userData.last_name)
            formdata.append('phone', userData.phone)
            formdata.append('password', userData.password)
            formdata.append('address', userData.address)
            formdata.append('is_admin', userData.is_admin)
            formdata.append('state_id', userData.state_id)
            formdata.append('city_id', userData.city_id)
            axios.post("/user/create-user", formdata)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.msg);
                        successtoast(response.data.msg);
                        setModalShow(false);
                        window.location.reload();
                    }
                })
        }

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);
        setlogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formdata = new FormData()
        formdata.append('phone', login.phone)
        formdata.append('password', login.password)
        axios.post("/user/login", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    window.location.replace('/');
                } else {
                    errortoast(response.data.msg);
                }
            })
        // Use the login state to make API requests or handle login logic
        console.log('Submitted login details:', login);
    };


    return (
        <>
            
            {modalShow && (
                <RegisterUser
                    states={states}
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                    }}
                    handlesave={handleSave}
                    flag={flag}
                />
            )}
            {/* <div id="login-form">
                <div id="login-head">
                <img src={Auction} style={{ width: 70, height: 70 }} />
                    <h3>Auction</h3>
                </div>
                <div id="login-details">
                    <form action="" >

                        <div id="user">
                            <input type="text" placeholder="Phone Number" name="phone" onChange={handleInputChange} />
                        </div>

                        <div id="pass">
                            <input type="password"  placeholder="Password" name="password" onChange={handleInputChange}/>
                        </div>

                        <div id="submit" className="d-flex justify-content-center">
                            <input type="submit" value="Log-In" onClick={handleSubmit}/>
                        </div>
                        <div className="sign-up">
                            Not a user?
                        <a href="#" onClick={click} >Register</a>
                        </div>
                    </form>

                </div>
            </div> */}
            <form onSubmit={handleSubmit} className='needs-validation was-validated'>
                <div className='d-flex align-items-center min-vh-100 mx-4'>
                    <div className={`container border p-3 shadow ${styles['login-form']}`}>
                        <div className="d-flex justify-content-center align-items-center mb-4" >
                            <img src={Auction} alt="" id={styles['responsive-image']} />
                        </div>
                        <div className="d-flex flex-column justify-content-center">

                            <div className="form-floating mb-3">
                                <input type="tel" name="phone" onChange={handleInputChange} className="form-control" id="floatingInput" placeholder="phone" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
                                <label htmlFor="floatingInput">Phone</label>

                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" name="password" onChange={handleInputChange} className="form-control" id="floatingPassword" placeholder="Password" minLength={4} required />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                {/* <input type="password" name="password" onChange={handleInputChange} className="form-control" id="floatingPassword" placeholder="Password" minLength={4} required/> */}
                                Not a user? <Link to='#' onClick={() => { setflag("add"); setModalShow(true) }}>Register</Link>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">

                            <button className="btn btn-primary" type='submit'>Login</button>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )

}