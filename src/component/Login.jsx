import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { errortoast } from '../fucntions/toast';

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
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-70">
                    <div className="row d-flex justify-content-center align-items-center h-70">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={handleInputChange} name="phone" />
                                            <label className="form-label" htmlFor="typeEmailX"  >phone</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={handleInputChange} name="password" />
                                            <label className="form-label" htmlFor="typePasswordX" >Password</label>
                                        </div>

                                        {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                        </div>

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
