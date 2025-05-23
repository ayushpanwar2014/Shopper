import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../../public/Assets/Admin_Assets/cross_icon.png";

const ListProduct = () => {

  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:8800/allproduct').then((res) => res.json()).then((data) => { setAllproducts(data) });
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const handleRemove = async (id) => {
    try {

      await fetch('http://localhost:8800/removeproduct', {
        method: 'DELETE',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      });

      await fetchInfo();
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => {handleRemove(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
