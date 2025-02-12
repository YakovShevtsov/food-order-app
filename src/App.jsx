import Header from "./components/Header";
import MealsList from "./components/MealsList";
import CartContextProvider from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <MealsList />
    </CartContextProvider>
  );
}

export default App;
