import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AddEditCategoryModal from './AddEditCategoryModal';
import Table from '../common/Table';
import Swal from 'sweetalert2';
import {errortoast} from '../fucntions/toast';

function Category() {
  const [categorys, setcategorys] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editCategoryData, seteditCategoryData] = useState("");
  const [flag, setflag] = useState("");

  useEffect(()=>{
      axios.get("/user/get-category")
      .then((response)=>{
          if(response.data.status === 200){
            setcategorys(response.data.data)
          }else{
            errortoast(response.data.msg);
          }
      })
  },[])

  const handleSave = (categoryData) => {
    if(flag === 'add'){
      let formdata = new FormData()
      formdata.append('name',categoryData.name)
      axios.post("/user/create-category",formdata)
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
      formdata.append('id',categoryData.id)
      formdata.append('name',categoryData.name)
      axios.post("/user/update-category",formdata)
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
  const handleDelete = (categoryData) => {
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
            formdata.append('id', categoryData.id);
            axios.post("/user/delete-category", formdata)
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
