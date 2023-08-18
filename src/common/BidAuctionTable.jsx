import React from 'react'
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

export default function BidAuctionTable(props) {
    const { column, data, handledelete } = props;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let user;
    let user_role;
    if (token) {
        user = jwt(token);
        user_role = user.role;
    }

    console.log(data)
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered mt-2">
                    <thead className="">
                        <tr>
                            <th scope="col">No.</th>
                            {column.map((col, index) => <th scope="col" key={index}>{col.lable}</th>)}

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((datum, index) => (<tr key={datum.id}>
                            <th scope="row">{index + 1}</th>
                            {column.map((col, index) => (
                                <td key={index} style={col.key === 'auction_id' ? { cursor: 'pointer' } : { cursor: '' }} onClick={() => { col.key === 'auction_id' && navigate(`/bid-card/${datum?.[col.key]}`); }}>{datum?.[col.key]}</td>
                            ))}

                            {user_role === "admin" && ( 
                                <td>
                                    <i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer", color: "red" }}></i>
                                </td>
                            )}
                        </tr>
                        ))}
                    </tbody>

                </table>
                {data.length === 0 && <p className='text-center text-danger'>No Data</p>}
            </div>
        </>
    )
}
