import React from 'react';

export default function Table(props) {
    const{column , data, setflag,setmodalshow,seteditstatedata,handledelete} = props;
    // console.log(column);
    // console.log(data);

    // data.map((datum)=>(console.log(datum)))
    // column.map((col)=>console.log(col));
    // column.map((col)=>console.log(col.lable));
  return (
    <>
    <div className="container">
        <h1>States</h1>
        <div className="table-responsive">
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">Id</th>
            {column.map((col)=><th scope="col">{col.lable}</th>)}
            
            </tr>
        </thead>
            <tbody>
                {data.map((datum)=>(<tr key={datum.id}>
                <th scope="row">{datum.id}</th>
                <td>{datum.name}</td>
                <td>{datum.shorthand}</td>
                <td><i className="bi bi-pencil-square me-4" onClick={()=>{setflag("edit");setmodalshow(true);seteditstatedata(datum)}} style={{cursor: "pointer"}}></i><i className="bi bi-trash" onClick={()=>handledelete(datum)} style={{cursor: "pointer"}}></i></td>
                </tr>
                ))}
                
            </tbody>
        </table>
        </div>
    </div>
          </>
        );
}
