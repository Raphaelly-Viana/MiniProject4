import CartItem from "./CartItem";

 function CartList({ items }) {
  console.log("CART:", items);

   if (!items || items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {items.map((item, index) => (
        <CartItem
          key={item.book_id || index}
          item={item}
        />
      ))}
    </div>
  );
}

export default CartList