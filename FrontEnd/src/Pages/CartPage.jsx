import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import CartList from "../Components/CartList";
import { Link } from "react-router-dom";

 function CartPage() {
  const { cart } = useContext(CartContext);

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <CartList items={cart.items} />
      <Link to="/checkout">
        <button>Go to Checkout</button>
      </Link>
    </div>
  );
}

export default CartPage