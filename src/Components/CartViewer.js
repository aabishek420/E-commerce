import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "./route"; 

export default function CartViewer() {
  const { cart, setCart } = useContext(cartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
  const grandTotal = cart.reduce((acc, item) => {
    const qty = item.quantity || 1;
    const price = parseFloat(item.price || item.amt || 0);
    return acc + (price * qty);
  }, 0);

  setTotal(grandTotal);
}, [cart]);


  const removeFromCart = (id) => {
    const updated = cart.filter((c) => c.id !== id);
    setCart(updated);
    alert("🗑️ Removed from cart!");
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty.");
    } else {
      alert(`✅ Thank you for your purchase!\nTotal: $${total.toFixed(2)}`);
      setCart([]);
    }
  };

  let content;

  if (!cart || cart.length === 0) {
    content = <p>No items in cart.</p>;
  } else {
    content = (
      <>
        <div className="row">
          {cart.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm p-3">
                <img
                  src={product.pic || product.image || "https://via.placeholder.com/200"}
                  alt={product.title || "Product"}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{product.title || "Unnamed Product"}</h6>
                  <p>
                    <strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity || 1}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {(parseFloat(product.price) * (product.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFromCart(product.id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-end mt-4">
          <h5>🧾 Grand Total: ${total.toFixed(2)}</h5>
          <button className="btn btn-primary mb-5" onClick={handleBuyNow}>
            💳 Buy Now
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🛒 Your Cart</h3>
      {content}
    </div>
  );
}
