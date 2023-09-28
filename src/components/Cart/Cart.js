import React, {useContext} from "react";

import classes from "./Cart.module.css"
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {};

    const cartItemAddHandler = (id) => {};

    const cartData = cartCtx.items;
    const  cartItems = cartData.map(item => (
        <CartItem
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            key={item.id}
            name={item.name}
            price={item.price}
            amont={item.amount}/>
    ))
    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items ']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;