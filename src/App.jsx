import Cart from "./components/Cart";
import Header from "./components/Header";
import MealsList from "./components/MealsList";
import CartContextProvider from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <MealsList />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
