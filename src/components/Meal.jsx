import { CartContext } from "../store/CartContext";
import { use } from "react";
import Button from "./Button";

export default function Meal({ mealData }) {
  const { addItem } = use(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${mealData.image}`}
          alt="Meal image"
        />
        <div>
          <h3>{mealData.name}</h3>
          <p className="meal-item-price">{mealData.price}</p>
          <p className="meal-item-description">{mealData.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItem(mealData)}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
