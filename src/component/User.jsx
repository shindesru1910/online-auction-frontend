import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditUserModal from './AddEditUserModal';
import Table from '../common/Table';

function User() {
  
  const [users, setusers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editUserData, seteditUserData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("http://localhost:8000/user/get-user")
      .then((response)=>{
          if(response.status === 200){
            setusers(response.data.data)
          }
      })
  },[])

  const handleSave = (userData) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('first_name',userData.first_name)
      formdata.append('last_name',userData.last_name)
      formdata.append('phone',userData.phone)
      formdata.append('password',userData.password)
      formdata.append('address',userData.address)
      formdata.append('is_admin',userData.is_admin)
      formdata.append('state_id',userData.state_id)
      formdata.append('city_id',userData.city_id)
      axios.post("http://localhost:8000/user/create-user",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }else{
      let formdata = new FormData()
      formdata.append('first_name',userData.first_name)
      formdata.append('last_name',userData.last_name)
      formdata.append('phone',userData.phone)
      formdata.append('password',userData.password)
      formdata.append('address',userData.address)
      formdata.append('is_admin',userData.is_admin)
      formdata.append('state_id',userData.state_id)
      formdata.append('city_id',userData.city_id)     
      axios.post("http://localhost:8000/user/update-user",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }
  }
  const handleDelete = (userData) =>{
    console.log(userData)
    let formdata = new FormData()
    formdata.append('id',userData.id) 
    axios.post("http://localhost:8000/user/delete-user",formdata)
    .then((response)=>{
        if(response.status === 200){
          console.log(response.data.msg);
          setModalShow(false);
          window.location.reload();
        }
    })
  }
  return (
    <>
      {modalShow && (
        <AddEditUserModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          handlesave={handleSave}
          flag={flag}
          editUserData={editUserData}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add User</button>

      </div>
      <Table title = "Users" column={[{ key: "first_name", lable: " First Name"},{Key:"last_name" ,lable:"Last Name"},{key:"phone",lable:"Phone Number"},{key:"password",lable:"Password"},{key:"address",lable:"Address"},{key:"is_admin",lable:"Admin/User"},{key:"state_id",lable:"State Id"},{key:"city_id",lable:"City Id"}]} data_access = {['first_name','last_name','phone','password','address','is_admin','state_id','city_id']} data={users} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditUserData} handledelete={handleDelete}/>
    </>
  )
}
export default User;
