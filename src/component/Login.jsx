import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { errortoast } from '../fucntions/toast';
import Auction from '../images/auction .png';

export default function Login() {
    const [login, setlogin] = useState({ phone: '', password: '' })

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
        axios.post("http://localhost:8000/user/login", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    window.location.replace('/home');
                } else {
                    errortoast(response.data.msg);
                }
            })
        // Use the login state to make API requests or handle login logic
        console.log('Submitted login details:', login);
    };

    return (
        <>
            <ToastContainer />
            <body className="main-bg" style={{ background: '#222d32' }}>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                {/* <i className="fa fa-key" aria-hidden="true"></i> */}
                                <img src={Auction} style={{ width: 100, height: 100 }} />
                            </div>
                            <div className="col-lg-12 login-title">
                                Login
                            </div>

                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form action="" method="POST">
                                        <div className="form-group">
                                            <label className="form-control-label">Phone</label>
                                            <input type="text" className="form-control" name="phone" onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">Password</label>
                                            <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btm login-text">

                                            </div>
                                            <div className="col-lg-6 login-btm login-button">
                                                <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>LOGIN</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2"></div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}
