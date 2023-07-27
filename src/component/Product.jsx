import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditProduct from './AddEditProduct';
import Table from '../common/Table';

function Product() {
  
  const [products, setproducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editProductData, seteditProductData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("http://localhost:8000/user/get-product")
      .then((response)=>{
          if(response.status === 200){
            setproducts(response.data.data)
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
  return (
    <>
      {modalShow && (
        <AddEditProduct
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            // window.location.replace("/user/states");
          }}
          handlesave={handleSave}
          flag={flag}
          editProductData={editProductData}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add Product</button>

      </div>
      <Table title = "Products" column={[{ key: "pro_name", lable: " Product Name"},{Key:"pro_purchase_rate" ,lable:"Product Purchase rate"},{key:"pro_expected_rate",lable:"Product Expected Rate"},{key:"pro_category",lable:"Category"},{key:"pro_qty",lable:"Quantity"}]} data_access = {['pro_name','pro_purchase_rate','pro_expected_rate','pro_category','pro_qty']} data={products} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditProductData} handledelete={handleDelete}/>
    </>
  )
}
export default Product;
