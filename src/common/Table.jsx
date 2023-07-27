import React from 'react';

export default function Table(props) {
    const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete,title } = props;

    return (
        <>
            <div className="container">
                <h1>{title}</h1>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">No.</th>
                                {column.map((col) => <th scope="col">{col.lable}</th>)}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((datum, index) => (<tr key={datum.id}>
                                <th scope="row">{index + 1}</th>
                                {data_access.map((datum_access) => (
                                    <td>{datum?.[datum_access]}</td>
                                ))}

                                <td><i className="bi bi-pencil-square me-4" onClick={() => { setflag("edit"); setmodalshow(true); seteditdata(datum) ;  }} style={{ cursor: "pointer" }}></i><i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer" }}></i></td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
