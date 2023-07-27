import React, { useEffect, useState } from 'react'
import Table from '../common/Table';
import AddEditCity from './AddEditCity';
import axios from 'axios';

function City() {
  const [city, setcity] = useState([]);
  const [states, setstates] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editcitydata, seteditcitydata] = useState("");
  const [flag, setflag] = useState("");

  useEffect(() => { 
    axios.get("http://localhost:8000/user/get-district")
      .then((response) => {
        if (response.status === 200) {
          setcity(response.data.data)
          // console.log(response.data.data);
        }
      })
      axios.get("http://localhost:8000/user/get-state")
      .then((response)=>{
          if(response.status === 200){
            setstates(response.data.data)
          }
      })
  }, [])
  const handleSave = (citydata) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('state_id',citydata.state_id)
      formdata.append('name',citydata.name)
      axios.post("http://localhost:8000/user/create-district",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }else{
      let formdata = new FormData()
      formdata.append('id',citydata.id)
      formdata.append('state_id',citydata.state_id)
      formdata.append('name',citydata.name)
      axios.post("http://localhost:8000/user/update-district",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }
  }
  const handleDelete = (cityData) =>{
    console.log(cityData)
    let formdata = new FormData()
    formdata.append('id',cityData.id) 
    axios.post("http://localhost:8000/user/delete-district",formdata)
    .then((response)=>{
        if(response.status === 200){
          setModalShow(false);
          window.location.reload();
        }
    })
  }
  

  return (
    <>
      {modalShow && (
        <AddEditCity
          states = {states}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            // window.location.replace("/user/states");
          }}
          handlesave={handleSave}
          flag={flag}
          editcitydata={editcitydata}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add City</button>
      </div>
      <Table title = "Cities" column={[{ key: "state", lable: "State" }, { key: "name", lable: "Name" }]} data_access = {['state','name']} data={city} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditcitydata} handledelete={handleDelete} />
    </>
  )
}
export default City;
