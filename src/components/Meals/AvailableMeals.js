import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Loader from "../UI/Loader";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
    {
        id: 'm5',
        name: 'Borsch',
        description: 'Super delicious!!!',
        price: 25.25,
    },
];
const AvailableMeals = (props) => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);

    useEffect(()=>{
        const fetchMovie = async ()=> {
            try {
                const url = 'https://reactfoodorderapp-847b4-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseData = await response.json();
                let mealsData = []

                for(const key in responseData) {
                    mealsData.push({
                        id: key,
                        key: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price
                    })
                }

                setMeals(mealsData);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false);
                setHttpError(true)
                setMeals(DUMMY_MEALS);
            }
        };

        fetchMovie();
    },[])

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} price={meal.price} name={meal.name} description={meal.description}/>)

    return (
        <React.Fragment>
            <section className={classes.meals}>
                {httpError && <h1>Something went wrong</h1>}
                <ul>
                    <Card>
                        {mealsList}
                    </Card>
                </ul>
            </section>
        </React.Fragment>
    )

}

export default AvailableMeals;