import "./Navbar.css"
import navlogo from "../../../public/Assets/Admin_Assets/nav-logo.svg"
import navprofile from "../../../public/Assets/Admin_Assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo"/>
      <img src={navprofile} alt="" className="nav-profile"/>
    </div>
  )
}

export default Navbar
