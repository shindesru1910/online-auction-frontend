import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditStateModal from './AddEditStateModal';
import Table from '../common/Table';

function State() {


  const [states, setstates] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editStateData, seteditStateData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("http://localhost:8000/user/get-state")
      .then((response)=>{
          if(response.status === 200){
            setstates(response.data.data)
          }
      })
  },[])

  const handleSave = (stateData) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('name',stateData.name)
      axios.post("http://localhost:8000/user/create-state",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
      // setstates(prev => [...prev, stateData]);
    }else{
      let formdata = new FormData()
      formdata.append('id',stateData.id)
      formdata.append('name',stateData.name)
      axios.post("http://localhost:8000/user/update-state",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
      // const filteredStateData = states.filter(state=>state.id !== stateData.id)
      // filteredStateData.splice(stateData.id-1,0,stateData)
      // setstates(filteredStateData)
      // setModalShow(false);
    }
  }
  const handleDelete = (stateData) =>{
    console.log(stateData)
    let formdata = new FormData()
    formdata.append('id',stateData.id) 
    axios.post("http://localhost:8000/user/delete-state",formdata)
    .then((response)=>{
        if(response.status === 200){
          console.log(response.data.msg);
          setModalShow(false);
          window.location.reload();
        }
    })
  }
  // const filteredStateData = states.filter(state=>state.id !== stateData.id)
  // setstates(filteredStateData)
  return (
    <>
      {modalShow && (
        <AddEditStateModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            // window.location.replace("/user/states");
          }}
          handlesave={handleSave}
          flag={flag}
          editstatedata={editStateData}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add State</button>

      </div>
      <Table title = "States" column={[{ key: "name", lable: "Name" }]} data_access = {['name']} data={states} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditStateData} handledelete={handleDelete}/>
    </>
  )
}
export default State;
