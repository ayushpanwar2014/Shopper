import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};

    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }

    return cart;
}

const ShopContextProvider = (props) => {


    const [cartItems, setCartItems] = useState([]);
    const [all_products, setAll_Products] = useState([]);

    useEffect(() => {

        //Getting All Product From DataBase
        fetch('http://localhost:8800/allproduct', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((data) => setAll_Products(data));

        //Getting Cart Data
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8800/getcartdata', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json()).then((data) => setCartItems(data));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        //Adding cartItem in User CartData in Database
        if (localStorage.getItem('auth-token')) {

            fetch('http://localhost:8800/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ 'itemId': itemId })
            }).then((resp) => resp.json()).then((data) => console.log(data));

        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        //Removing cartItem in User CartData in Database
        if (localStorage.getItem('auth-token')) {

            fetch('http://localhost:8800/removetocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({ 'itemId': itemId })
            }).then((resp) => resp.json()).then((data) => console.log(data));
            
        }
    }

    const getTotalCartAmount = () => {
         
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {

                let itemInfo = all_products.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const totalCartItem = () => {
        let totalItem = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }

        return totalItem;
    }

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, totalCartItem };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;