import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
   const navigate = useNavigate();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    alert("Purchase confirmed! Thank you 🎉");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item, index) => (
             <li key={`${item.bookId}-${index}`}>
                {item.title} — ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toFixed(2)}</h3>

          <button onClick={handleConfirm}>
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
}