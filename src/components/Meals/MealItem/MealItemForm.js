import React, {useRef,useState} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = function (props) {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredUmountNumber = Number(enteredAmount);

        if (enteredAmount.trim().length === 0 ||
            enteredUmountNumber < 1 ||
            enteredUmountNumber > 5) {
            setAmountIsValid(false)
            return
        }

        props.onAddToCart(enteredUmountNumber)

    };

    return (
        <form action=""
              className={classes.form}
              onSubmit={submitHandler}>
            <Input label='Amount'
                   ref={amountInputRef}
                   input={
                            {
                                id: `amount_${props.id}`,
                                type: 'number',
                                min: '1',
                                max: '5',
                                step:'1',
                                defaultValue: '1'
                            }
                    }
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1 - 5)</p>}
        </form>
    )
}

export default MealItemForm;