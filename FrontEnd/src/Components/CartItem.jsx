import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-card">
      <img
        src={item.book.image}
        alt={item.book.title}
        width="80"
      />

      <div>
        <h4>{item.book.title}</h4>
        <p>Price: ${item.book.price}</p>
        <p>Quantity: {item.quantity}</p>

        <button onClick={() => removeFromCart(item.book._id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;