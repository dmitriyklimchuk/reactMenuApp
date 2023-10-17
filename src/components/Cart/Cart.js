import React, {useContext, useState} from "react";

import classes from "./Cart.module.scss"
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount: 1})
    };

    const orderHandler = (event) => {
        event.preventDefault();
        setIsCheckout(true);
        setIsSubmitted(false);
    };

    const submitOrderHandler = (userData) => {
        fetch('https://reactfoodorderapp-847b4-default-rtdb.europe-west1.firebasedatabase.app/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartData
            })
        });

        cartCtx.clearCart();
        setIsSubmitted(true)
    };

    const modalActions = <div className={classes.actions}>
                            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                            {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
                        </div>;

    const cartData = cartCtx.items;
    const  cartItems = cartData.map(item => (
        <CartItem
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}/>
    ))
    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && !isSubmitted && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart;