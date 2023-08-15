import React from 'react'
import { useNavigate } from "react-router-dom";



export default function Card(props) {
    const { name ,to,img } = props;
    let navigate = useNavigate();
    return (
        <div className="" style={{cursor:"pointer"}}>
            <div className="card rounded border m-2 shadow  " style={{ "width": "13rem", "height": "13rem" }} onClick={()=>navigate(to)}>
                <img src={img} alt="image" style={{height:'75%',width:'95%'}}/>
                <div className="card-body d-flex justify-content-center align-items-center" >
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </div>
    )
}
