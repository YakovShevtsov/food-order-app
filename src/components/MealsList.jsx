import { useState } from "react";
import { useEffect } from "react";
import Meal from "./Meal";

export default function MealsList() {
  const [error, setError] = useState({});
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const availableMeals = await response.json();
        console.log(availableMeals);

        setMeals([...availableMeals]);
      } catch (error) {
        setError({ error: error.message || "An error occured!" });
      }
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => {
        return (
          <Meal
            name={meal.name}
            price={meal.price}
            description={meal.description}
            image={meal.image}
            key={meal.id}
          />
        );
      })}
    </ul>
  );
}
