import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditCategoryModal from './AddEditCategoryModal';
import Table from '../common/Table';

function Category() {
  const [categorys, setcategorys] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editCategoryData, seteditCategoryData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("http://localhost:8000/user/get-category")
      .then((response)=>{
          if(response.status === 200){
            setcategorys(response.data.data)
          }
      })
  },[])

  const handleSave = (categoryData) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('name',categoryData.name)
      axios.post("http://localhost:8000/user/create-category",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }else{
      let formdata = new FormData()
      formdata.append('id',categoryData.id)
      formdata.append('name',categoryData.name)
      axios.post("http://localhost:8000/user/update-category",formdata)
      .then((response)=>{
          if(response.status === 200){
            console.log(response.data.msg);
            setModalShow(false);
            window.location.reload();
          }
      })
    }
  }
  const handleDelete = (categoryData) =>{
    console.log(categoryData)
    let formdata = new FormData()
    formdata.append('id',categoryData.id) 
    axios.post("http://localhost:8000/user/delete-category",formdata)
    .then((response)=>{
        if(response.status === 200){
          console.log(response.data.msg);
          setModalShow(false);
          window.location.reload();
        }
    })
  }

  console.log(editCategoryData);
  return (
    <>
      {modalShow && (
        <AddEditCategoryModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          handlesave={handleSave}
          flag={flag}
          editcategorydata={editCategoryData}
        />
      )}
      <div className="container mt-2">
        <button className='btn btn-primary float-end' onClick={() => { setflag("add"); setModalShow(true) }}><i className="bi bi-plus-lg me-1"></i>Add Category</button>

      </div>
      <Table title = "Product Category" column={[{ key: "name", lable: "Name" }]} data_access = {['name']} data={categorys} setflag={setflag} setmodalshow={setModalShow} seteditdata={seteditCategoryData} handledelete={handleDelete}/>
    </>
  )
}
export default Category;
