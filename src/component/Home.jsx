import React from 'react'
import Card from '../common/card'

function Home() {
    return (
        <>
            <div className="container mt-3 d-flex flex-wrap">
                <Card name="State" to="/state"/>
                <Card name="City" to="/city"/>
                <Card name="User" to="/user"/>
                <Card name="Auction" to="/auction"/>
                <Card name="Product" to="/product"/>
                <Card name="Product Category" to="/category"/>
            </div>
        </>
    )
}

export default Home
