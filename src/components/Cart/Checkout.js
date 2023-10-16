import React from "react";
import classes from "./Checkout.module.scss";

const Checkout = (props)=> {
    const confirmHandler = (event)=> {
        event.preventDefault();
    };

    return (
        <form action="" onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name"/>
            </div>
            <div>
                <label htmlFor="street">Your Street</label>
                <input type="text" id="street"/>
            </div>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </form>
    )
};

export default Checkout;