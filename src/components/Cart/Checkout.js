import React, {useRef, useState} from "react";
import classes from "./Checkout.module.scss";

const isEmpty = (value) => value.trim() !== '';

const Checkout = (props)=> {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const [isFormValid, setIsFormValid] = useState(true);
    const confirmHandler = (event)=> {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredValues = [enteredName,enteredStreet];

        const checkForm = enteredValues.every(value => isEmpty(value));
        setIsFormValid(checkForm)

        if (!isFormValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet
        });

        nameInputRef.current.value = '';
        streetInputRef.current.value = '';

    };

    return (
        <form action="" className={classes.control} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} type="text" id="name"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Your Street</label>
                <input ref={streetInputRef} type="text" id="street"/>
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
            {!isFormValid && <h1>Please fill all inputs correctly</h1>}
        </form>
    )
};

export default Checkout;