import headerImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img
          src={headerImg}
          alt="Dish in front of city"
        />
        <h1>Reactfood</h1>
      </div>
      {/* Cart */}
    </header>
  );
}
