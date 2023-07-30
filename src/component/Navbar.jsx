import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home" style={{ padding: '8px' }} >Online Auction</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ backgroundColor: "#9460bc", borderRadius: "10px" }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/auction">Auction</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>

            </ul>
            <ul className="navbar-nav ms-auto">
              <li>
                <button className="btn btn-secondary nav-link active" type="submit">Logout</button>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      
    </>
  )
}

export default Navbar

