import Button from "./Button";

export default function Meal({ name, price, description, image }) {
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${image}`}
          alt="Meal image"
        />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
