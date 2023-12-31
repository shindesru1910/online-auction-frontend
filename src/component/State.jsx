import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditStateModal from './AddEditStateModal';
import Table from '../common/Table';
import Swal from 'sweetalert2';
import {errortoast} from '../fucntions/toast';

function State() {


  const [states, setstates] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editStateData, seteditStateData] = useState("");
  const [flag, setflag] = useState("");
  const[loading,setloading]= useState(false);

  useEffect(()=>{
      axios.get("/user/get-state")
      .then((response)=>{
          if(response.data.status === 200){
            setstates(response.data.data)
          }else{
            errortoast(response.data.msg);
          }
      })
  },[])

  const handleSave = (stateData) => {
      
    setloading(true);
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('name',stateData.name)
      axios.post("/user/create-state",formdata)
      .then((response)=>{
          if(response.data.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }else{
            errortoast(response.data.msg);
          }
      })
      .finally(()=>setloading(false));
      // setstates(prev => [...prev, stateData]);
    }else{
      let formdata = new FormData()
      formdata.append('id',stateData.id)
      formdata.append('name',stateData.name)
      axios.post("/user/update-state",formdata)
      .then((response)=>{
          if(response.data.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }else{
            errortoast(response.data.msg);
          }
      })
      .finally(()=>setloading(false));
      // const filteredStateData = states.filter(state=>state.id !== stateData.id)
      // filteredStateData.splice(stateData.id-1,0,stateData)
      // setstates(filteredStateData)
      // setModalShow(false);
    }
  }
  const handleDelete = (stateData) => {
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
            formdata.append('id', stateData.id);
            axios.post("/user/delete-state", formdata)
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
          loading = {loading}
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
