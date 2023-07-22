import React from 'react'

export default function Table(props) {
    const{column ,data} = props;
    console.log(column);
    console.log(data);

    data.map((datum)=>(console.log(datum)))
    // column.map((col)=>console.log(col));
    // column.map((col)=>console.log(col.lable));
  return (
    <div className="container">
        <h1>States</h1>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Id</th>
            {column.map((col)=><th scope="col">{col.lable}</th>)}
            
            </tr>
        </thead>
            <tbody>
                {data.map((datum)=>(<tr>
                <th scope="row">{datum.id}</th>
                <td>{datum.name}</td>
                <td>{datum.shorthand}</td>
                </tr>))}
                
            </tbody>
        </table>
    </div>
  )
}
