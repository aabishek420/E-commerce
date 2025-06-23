import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ProdDet() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div>
     
        <div className="text-center mt-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading product...</p>
        </div>
      </div>
    );
  }


  // let activeTab;
  // if (product.category === "electronics") {
  //   activeTab = "electronics";
  // } else if (product.category === "jewelery") {
  //   activeTab = "jewelery";
  // } else if (product.category === "men's clothing") {
  //   activeTab = "men's clothing";
  // } else if (product.category === "women's clothing") {
  //   activeTab = "women's clothing";
  // } else {
  //   activeTab = "products";

  // }

  return (
    <div>
    

      <div className="container mt-2.5" id="products">
        <div className="row justify-content-center">
        <div className="col-md-3 col-lg-6">
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
              <button
                className="btn btn-success mt-3"
                onClick={() => alert(`You bought: ${product.title} for $${product.price}`)}
              >
                🛒 Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
