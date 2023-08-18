import React, { useEffect, useState } from 'react'
import Table from '../common/Table';
import AddEditCity from './AddEditCity';
import axios from 'axios';
import Swal from 'sweetalert2';
import {errortoast} from '../fucntions/toast';
function City() {
  const [city, setcity] = useState([]);
  const [states, setstates] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editcitydata, seteditcitydata] = useState("");
  const [flag, setflag] = useState("");

  useEffect(() => { 
    axios.get("/user/get-city")
      .then((response) => {
        if (response.data.status === 200) {
          setcity(response.data.data)
        }else{
          errortoast(response.data.msg);
        }
      })
      axios.get("/user/get-state")
      .then((response)=>{
          if(response.data.status === 200){
            setstates(response.data.data)
          }else{
            errortoast(response.data.msg);
          }
      })
  }, [])

  const handleSave = (citydata) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('state_id',citydata.state_id)
      formdata.append('name',citydata.name)
      axios.post("/user/create-city",formdata)
      .then((response)=>{
          if(response.data.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }else{
            errortoast(response.data.msg);
          }
      })
    }else{
      let formdata = new FormData()
      formdata.append('id',citydata.id)
      formdata.append('state_id',citydata.state_id)
      formdata.append('name',citydata.name)
      axios.post("/user/update-city",formdata)
      .then((response)=>{
          if(response.data.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }else{
            errortoast(response.data.msg);
          }
      })
    }
  }
  const handleDelete = (citydata) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let formdata = new FormData();
            formdata.append('id', citydata.id);
            axios.post("/user/delete-city", formdata)
                .then((response) => {
                    if (response.data.status === 200) {
                        console.log(response.data.msg);
                        setModalShow(false);
                        
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then((result)=>window.location.reload())
                    }else{
                      errortoast(response.data.msg);
                    }
                });
            
        }
    });
};
  

  return (
    <>
      {modalShow && (
        <AddEditCity
          states = {states}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          handlesave={handleSave}
          flag={flag}
          editcitydata={editcitydata}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add City</button>
      </div>
      <Table title = "Cities" column={[{ key: "state", lable: "State" }, { key: "city", lable: "City" }]} data_access = {['state','name']} data={city} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditcitydata} handledelete={handleDelete} />
    </>
  )
}
export default City;
