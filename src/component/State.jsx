import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditStateModal from './AddEditStateModal';
import Table from '../common/Table';

function State() {
  // const initialstate = [
  //   {
  //     "shorthand": "AN",
  //     "name": "Andaman and Nicobar Islands"
  //   },
  //   {

  //     "shorthand": "AP",
  //     "name": "Andhra Pradesh"
  //   },
  //   {

  //     "shorthand": "AR",
  //     "name": "Arunachal Pradesh"
  //   },
  //   {

  //     "shorthand": "AS",
  //     "name": "Assam"
  //   },
  //   {

  //     "shorthand": "BR",
  //     "name": "Bihar"
  //   },
  //   {

  //     "shorthand": "CG",
  //     "name": "Chandigarh"
  //   },
  //   {

  //     "shorthand": "CH",
  //     "name": "Chhattisgarh"
  //   },
  //   {

  //     "shorthand": "DH",
  //     "name": "Dadra and Nagar Haveli"
  //   },
  //   {

  //     "shorthand": "DD",
  //     "name": "Daman and Diu"
  //   },
  //   {

  //     "shorthand": "DL",
  //     "name": "Delhi"
  //   },
  //   {

  //     "shorthand": "GA",
  //     "name": "Goa"
  //   },
  //   {

  //     "shorthand": "GJ",
  //     "name": "Gujarat"
  //   },
  //   {

  //     "shorthand": "HR",
  //     "name": "Haryana"
  //   },
  //   {

  //     "shorthand": "HP",
  //     "name": "Himachal Pradesh"
  //   },
  //   {

  //     "shorthand": "JK",
  //     "name": "Jammu and Kashmir"
  //   },
  //   {

  //     "shorthand": "JH",
  //     "name": "Jharkhand"
  //   },
  //   {

  //     "shorthand": "KA",
  //     "name": "Karnataka"
  //   },
  //   {

  //     "shorthand": "KL",
  //     "name": "Kerala"
  //   },
  //   {

  //     "shorthand": "LD",
  //     "name": "Lakshadweep"
  //   },
  //   {

  //     "shorthand": "MP",
  //     "name": "Madhya Pradesh"
  //   },
  //   {

  //     "shorthand": "MH",
  //     "name": "Maharashtra"
  //   },
  //   {

  //     "shorthand": "MN",
  //     "name": "Manipur"
  //   },
  //   {

  //     "shorthand": "ML",
  //     "name": "Meghalaya"
  //   },
  //   {

  //     "shorthand": "MZ",
  //     "name": "Mizoram"
  //   },
  //   {

  //     "shorthand": "NL",
  //     "name": "Nagaland"
  //   },
  //   {

  //     "shorthand": "OR",
  //     "name": "Odisha"
  //   },
  //   {

  //     "shorthand": "PY",
  //     "name": "Puducherry"
  //   },
  //   {

  //     "shorthand": "PB",
  //     "name": "Punjab"
  //   },
  //   {

  //     "shorthand": "RJ",
  //     "name": "Rajasthan"
  //   },
  //   {

  //     "shorthand": "SK",
  //     "name": "Sikkim"
  //   },
  //   {

  //     "shorthand": "TN",
  //     "name": "Tamil Nadu"
  //   },
  //   {

  //     "shorthand": "TS",
  //     "name": "Telangana"
  //   },
  //   {

  //     "shorthand": "TR",
  //     "name": "Tripura"
  //   },
  //   {

  //     "shorthand": "UK",
  //     "name": "Uttar Pradesh"
  //   },
  //   {

  //     "shorthand": "UP",
  //     "name": "Uttarakhand"
  //   },
  //   {

  //     "shorthand": "WB",
  //     "name": "West Bengal"
  //   }
  // ]
  // const initialStateWithId = initialstate.map((state, index) => {
  //   return {
  //     ...state,
  //     id: index + 1
  //   };
  // });

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
