import "./Navbar.css"
import logo from "../../../public/Assets/Frontend_Assets/logo.png"
import cartIcon from "../../../public/Assets/Frontend_Assets/cart_icon.png"
import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext"
import nav_dropdown from "../../../public/Assets/Frontend_Assets/nav_dropdown.png"

function Navbar() {

    const [menu, setMenu] = useState("shop");
    const { totalCartItem } = useContext(ShopContext);
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const handleLogOut = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/')
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />

                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <p>SHOPPER</p>
                </Link>
            </div>
            <img className="nav-dropdown open" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                    <li onClick={() => setMenu("shop")}>Shop {menu === "shop" ? <hr /> : <></>} </li>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/mens">
                    <li onClick={() => setMenu("menu")}>Menu {menu === "menu" ? <hr /> : <></>} </li>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/womens">
                    <li onClick={() => setMenu("women")}>Women {menu === "women" ? <hr /> : <></>} </li>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }} to="/kids">
                    <li onClick={() => setMenu("kids")}>Kids {menu === "kids" ? <hr /> : <></>} </li>
                </Link>
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={handleLogOut}>Logout</button> : <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                    <button>Login</button>
                </Link>}

                <Link style={{ textDecoration: "none", color: "inherit" }} to="/cart">
                    <img src={cartIcon} alt="" />
                </Link>
                <div className="nav-cart-count">{totalCartItem()}</div>
            </div>
        </div>
    )
};

export default Navbar;