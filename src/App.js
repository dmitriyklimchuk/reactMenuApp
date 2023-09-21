import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./store/cart-context";

function App() {
    const addItemToCartHandler = item => {}

    const removeItemFromCartHandler = item => {}

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    const [cartIsShown, setCartIsShown] = useState(false)

    const showCartHandler = () => {
        setCartIsShown(true)
    };

    const hideCartHandler = () => {
        setCartIsShown(false)
    };

    return (
        <CartContext.Provider value={cartContext}>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                {cartContext.totalAmount}
                <Meals/>
            </main>
        </CartContext.Provider>
    );
}

export default App;
