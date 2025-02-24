import Navbar from "./Components/Navbar/Navbar"
import { Routes, Route } from "react-router-dom"
import Shop from "./Pages/Shop/Shop"
import ShopCategory from "./Pages/ShopCategory/ShopCategory"
import LoginSignUp from "./Pages/LoginSignUp/LoginSignUp"
import Product from "./Pages/Product/Product"
import Cart from "./Pages/Cart/Cart"
import Footer from "./Components/Footer/Footer"
import men_banner from "../public/Assets/Frontend_Assets/banner_mens.png"
import women_banner from "../public/Assets/Frontend_Assets/banner_women.png"
import kid_banner from "../public/Assets/Frontend_Assets/banner_kids.png"

function App() {

  return (


    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Shop />} />
        <Route exact path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route exact path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route exact path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route exact path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </div>


  )
}

export default App
