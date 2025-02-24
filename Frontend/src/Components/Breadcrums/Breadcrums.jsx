import "./Breadcrums.css"
import arrow_icon from "../../../public/Assets/Frontend_Assets/breadcrum_arrow.png"
const Breakrums = (props) => {

    const {product} = props; 
  return (
    <div className="breadcrum">
      <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breakrums
