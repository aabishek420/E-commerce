import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { cartContext } from './route'; // adjust path if needed

export default function ProdDet() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(cartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const addToCart = () => {
    const exists = cart?.find(c => c.id === product.id);
    if (!exists) {
      const item = { ...product, quantity: 1 }; // default quantity
      setCart([...cart, item]);
      alert("🛒 Added to cart!");
    } else {
      alert("❗ Already in cart.");
    }
  };

  const removeFromCart = () => {
    const updated = cart?.filter(c => c.id !== product.id);
    setCart(updated);
    alert("🗑️ Removed from cart!");
  };

  const checkInCart = () => {
    if (!cart || cart.length === 0) return false;
    return cart.some(c => c.id === product.id);
  };

  const handleBuyNow = () => {
    alert(`✅ Thank you for buying ${product.title} for $${product.price.toFixed(2)}!`);
  };

  if (!product) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading product...</p>
      </div>
    );
  }

  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm rounded-4 border-0">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top img-fluid mb-3"
              style={{ height: "250px", objectFit: "contain" }}
            />
            <h5>{product.title}</h5>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {product.rating && (
              <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
            )}

            <div className="d-flex flex-column gap-2 mt-3">
              {!checkInCart() ? (
                <button className="btn btn-success" onClick={addToCart}>
                  🛒 Add to Cart
                </button>
              ) : (
                <button className="btn btn-danger" onClick={removeFromCart}>
                  ❌ Remove from Cart
                </button>
              )}

              <button className="btn btn-primary" onClick={handleBuyNow}>
                💰 Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
