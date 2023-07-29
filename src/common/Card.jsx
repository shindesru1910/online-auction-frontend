import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const { name ,to } = props;
    let navigate = useNavigate();
    return (
        <div className="" style={{cursor:"pointer"}}>
            <div className="card rounded border border-dark m-2" style={{ "width": "10rem", "height": "10rem" }} onClick={()=>navigate(to)}>
                <div className="card-body d-flex justify-content-center align-items-center" >
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </div>
    )
}
