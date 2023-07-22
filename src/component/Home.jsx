import React from 'react'
import State from './State'
import City from './City'
import Card from '../common/Card'

function Home() {
    return (
        <>
            <Card />
            <div className="conatiner my-3">
                <State />
            </div>
            <div className="container my-3">
                <City />
            </div>

        </>
    )
}

export default Home
