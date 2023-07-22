import React from 'react'
import AddEditCity from './AddEditCity';

function City() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    {modalShow && (
        <AddEditCity
        show={modalShow}
        onHide={() => {
            setModalShow(false);
            // window.location.replace("/user/states");
        }}
        />
        )}
        <button className='btn btn-primary' onClick={()=>setModalShow(true)} style={{padding:"20px"}}>City</button>
        </>
  )
}
export default City;
