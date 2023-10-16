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

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount: 1})
    };

    const orderHandler = (event) => {
        event.preventDefault();
        setIsCheckout(true);
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
            <ul className={classes['cart-items ']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart;