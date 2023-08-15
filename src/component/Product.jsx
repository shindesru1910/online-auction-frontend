import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditProduct from './AddEditProduct';
import Table from '../common/Table';
import {errortoast} from '../fucntions/toast';
function Product() {
  
  const [products, setproducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editProductData, seteditProductData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("/user/get-product")
      .then((response)=>{
          if(response.data.status === 200){
            setproducts(response.data.data)
          }else{
            errortoast(response.data.msg);
          }
      })
  },[])

  const handleSave = (productData) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('pro_name',productData.pro_name)
      formdata.append('pro_purchase_rate',productData.pro_purchase_rate)
      formdata.append('pro_expected_rate',productData.pro_expected_rate)
      formdata.append('pro_category',productData.pro_category)
      formdata.append('pro_qty',productData.pro_qty)
      axios.post("/user/create-product",formdata)
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
      formdata.append('id',productData.id)
      formdata.append('pro_name',productData.pro_name)
      formdata.append('pro_purchase_rate',productData.pro_purchase_rate)
      formdata.append('pro_expected_rate',productData.pro_expected_rate)
      formdata.append('pro_category',productData.pro_category)
      formdata.append('pro_qty',productData.pro_qty)      
      axios.post("/user/update-product",formdata)
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
  const handleDelete = (productData) =>{
    console.log(productData)
    let formdata = new FormData()
    formdata.append('id',productData.id) 
    axios.post("/user/delete-product",formdata)
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
  return (
    <>
      {modalShow && (
        <AddEditProduct
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          handlesave={handleSave}
          flag={flag}
          editproductdata={editProductData}
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
