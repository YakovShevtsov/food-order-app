import { useEffect, useState } from "react";
import Meal from "./Meal";

export default function MealsList() {
  const [error, setError] = useState({});
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals. ");
        }

        const availableMeals = await response.json();

        setMeals([...availableMeals]);
      } catch (error) {
        setError({ message: error.message || "An error occured!" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {isLoading && <h2>Loading meals...</h2>}
      {error.message && <h2>{error.message}</h2>}
      {meals.map((meal) => {
        return (
          <Meal
            mealData={meal}
            key={meal.id}
          />
        );
      })}
    </ul>
  );
}
