import React from 'react'
import AddEditStateModal from './AddEditStateModal';
import Table from '../common/Table';

function State() {
  const initialstate = [
    {
    "shorthand": "AN",
    "name": "Andaman and Nicobar Islands"
    },
    {
      
    "shorthand": "AP",
    "name": "Andhra Pradesh"
    },
    {
      
    "shorthand": "AR",
    "name": "Arunachal Pradesh"
    },
    {
      
    "shorthand": "AS",
    "name": "Assam"
    },
    {
      
    "shorthand": "BR",
    "name": "Bihar"
    },
    {
      
    "shorthand": "CG",
    "name": "Chandigarh"
    },
    {
      
    "shorthand": "CH",
    "name": "Chhattisgarh"
    },
    {
      
    "shorthand": "DH",
    "name": "Dadra and Nagar Haveli"
    },
    {
      
    "shorthand": "DD",
    "name": "Daman and Diu"
    },
    {
      
    "shorthand": "DL",
    "name": "Delhi"
    },
    {
      
    "shorthand": "GA",
    "name": "Goa"
    },
    {
      
    "shorthand": "GJ",
    "name": "Gujarat"
    },
    {
      
    "shorthand": "HR",
    "name": "Haryana"
    },
    {
      
    "shorthand": "HP",
    "name": "Himachal Pradesh"
    },
    {
      
    "shorthand": "JK",
    "name": "Jammu and Kashmir"
    },
    {
      
    "shorthand": "JH",
    "name": "Jharkhand"
    },
    {
      
    "shorthand": "KA",
    "name": "Karnataka"
    },
    {
      
    "shorthand": "KL",
    "name": "Kerala"
    },
    {
      
    "shorthand": "LD",
    "name": "Lakshadweep"
    },
    {
      
    "shorthand": "MP",
    "name": "Madhya Pradesh"
    },
    {
      
    "shorthand": "MH",
    "name": "Maharashtra"
    },
    {
      
    "shorthand": "MN",
    "name": "Manipur"
    },
    {
      
    "shorthand": "ML",
    "name": "Meghalaya"
    },
    {
      
    "shorthand": "MZ",
    "name": "Mizoram"
    },
    {
      
    "shorthand": "NL",
    "name": "Nagaland"
    },
    {
      
    "shorthand": "OR",
    "name": "Odisha"
    },
    {
      
    "shorthand": "PY",
    "name": "Puducherry"
    },
    {
      
    "shorthand": "PB",
    "name": "Punjab"
    },
    {
      
    "shorthand": "RJ",
    "name": "Rajasthan"
    },
    {
      
    "shorthand": "SK",
    "name": "Sikkim"
    },
    {
      
    "shorthand": "TN",
    "name": "Tamil Nadu"
    },
    {
      
    "shorthand": "TS",
    "name": "Telangana"
    },
    {
      
    "shorthand": "TR",
    "name": "Tripura"
    },
    {
      
    "shorthand": "UK",
    "name": "Uttar Pradesh"
    },
    {
      
    "shorthand": "UP",
    "name": "Uttarakhand"
    },
    {
      
    "shorthand": "WB",
    "name": "West Bengal"
    }
    ]
  const initialStateWithId = initialstate.map((state, index) => {
    return {
      ...state,
      id: index + 1
    };
  });
  
  const [states, setstates] = React.useState(initialStateWithId);
  const [modalShow, setModalShow] = React.useState(false);
  console.log(states); 
  // states.map((state)=>{console.log(state)});
  return (
    <>
    {modalShow && (
        <AddEditStateModal
        show={modalShow}
        onHide={() => {
            setModalShow(false);
            // window.location.replace("/user/states");
        }}
        />
        )}
        <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={()=>setModalShow(true)}><i className="bi bi-plus-lg me-1"></i>State</button>

        </div>
        <Table column={[{key:"name", lable : "Name"},{key:"shorthand",lable:"Shorthand"}]} data={states}/>
        </>
  )
}
export default State;
