import React,{useState} from 'react'

export default function EnterCity() {
    const[details,setDetails]=useState({
        city : '',
        state : '',
    })
    // console.log(details);

    const handleChange=(e)=>{
        const{name,value}=e.target;
        // console.log(cname,sname);
        setDetails((prev)=>{
            return{...prev ,[name]: value};
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(details);
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>City Name :</h3><input type="text" name='city' onChange={handleChange}/>
        <h3>State Name :</h3><input type="text" name='state' onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
