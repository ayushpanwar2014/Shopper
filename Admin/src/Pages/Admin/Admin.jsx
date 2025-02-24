import "./Admin.css"
import Sidebar from "../../Component/Sidebar/Sidebar"
import AddProduct from "../../Component/AddProduct/AddProduct"
import ListProduct from "../../Component/ListProduct/ListProduct"
import { Route, Routes } from "react-router-dom"

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route exact path="/addproduct" element={<AddProduct/>} />
        <Route exact path="/" element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
