import Meal from "./Meal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function MealsList() {
  const {
    data: meals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error) {
    return (
      <Error
        title="Failed to fetch meals."
        message={error}
      />
    );
  }

  return (
    <ul id="meals">
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
