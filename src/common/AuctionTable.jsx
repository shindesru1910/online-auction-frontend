import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function AuctionTable(props) {
    const { column, data, handledelete, activetab, startDate, endDate, setStartDate, setEndDate,fetchDataBetweenDates } = props;
    const navigate = useNavigate();

    console.log(data)
    return (
        <>
            {activetab === 'completed' && <div className="container mt-3 d-flex flex-wrap gap-2 justify-content-end">
                <div className=''>
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" style={{ marginLeft: '8px', marginRight: '8px' }} value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                    <label className="form-label">End Date</label>
                    <input type='date' className="form-control" style={{ marginLeft: '8px', marginRight: '8px' }} value={endDate} onChange={e => setEndDate(e.target.value)} />

                </div>
                <div className='d-flex align-items-end ms-2'>

                    <button type="button" className="btn btn-outline-primary" onClick={fetchDataBetweenDates}>OK</button>
                </div>
            </div>}
            <div className="table-responsive">
                <table className="table table-bordered mt-2">
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
                            <i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer", color: "red" }}></i>
                        </tr>
                        ))}
                    </tbody>

                </table>
                {data.length === 0 && <p className='text-center text-danger'>No Data</p>}
            </div>
        </>
    )
}
