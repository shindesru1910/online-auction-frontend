import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function AuctionTable(props) {
    const { column, data } = props;
    const navigate = useNavigate();

    console.log(data)
    return (
        <>
            <div className="table-responsive">
                <table class="table table-bordered mt-2">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            {column.map((col, index) => <th scope="col" key={index}>{col.lable}</th>)}

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((datum, index) => (<tr key={datum.id}>
                            <th scope="row">{index + 1}</th>
                            {column.map((col, index) => (
                                <td key={index} style={col.key === 'auction_id' ? { cursor: 'pointer' } : { cursor: '' }} onClick={() => { col.key === 'auction_id' && navigate(`/view-edit-auction/${datum?.[col.key]}`); }}>{datum?.[col.key]}</td>
                            ))}

                            {/* <td><i className="bi bi-pencil-square me-4" onClick={() => { setflag("edit"); setmodalshow(true); seteditdata(datum); }} style={{ cursor: "pointer" }}></i><i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer" }}></i></td> */}
                        </tr>
                        ))}
                    </tbody>

                </table>
                {data.length === 0 && <p className='text-center text-danger'>No Data</p>}
            </div>
        </>
    )
}
