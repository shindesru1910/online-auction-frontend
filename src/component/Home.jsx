import React from 'react'
import Card from '../common/card'

function Home() {
    return (
        <>
            <div className="container mt-3 d-flex">
                <Card name="State" to="/state"/>
                <Card name="City" to="/city"/>
            </div>
            {/* <div className="conatiner my-3">
                <State />
            </div>
            <div className="container my-3">
                <City />
            </div> */}

        </>
    )
}

export default Home
