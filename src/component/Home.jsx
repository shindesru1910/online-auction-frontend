import React from 'react'
import Card from '../common/Card'

function Home() {
    return (
        <>
            <div className="container mt-3 d-flex">
                <Card name="State" to="/state"/>
                <Card name="City" to="/city"/>
                <Card name="User" to="/user"/>
                <Card name="Auction" to="/auction"/>
                <Card name="Product" to="/product"/>
            </div>
        </>
    )
}

export default Home
