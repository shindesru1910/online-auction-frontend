import React,{useState} from 'react';

export default function EnterState() {
  const[details, setDetails]=useState({
    name : ''
  })
  // console.log(details);
  const handleChange=(e)=>{
    const {name,value} = e.target;
    setDetails((prev)=>{
      return{...prev,[name] : value};
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(details);
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h3> State Name : </h3><input type='text' name="name" onChange={handleChange}/>
        <button type="submit"> Submit Form </button>
      </form>
    </div>
  )
}
