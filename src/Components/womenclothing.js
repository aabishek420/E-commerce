import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Womenclothing() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent("women's clothing")}`)
      .then(res => res.json())
      .then((json) => {
        setCategory(json);
        setLoading(false);
      });
  }, []);

  // Debug logs
  console.log("Category array:", category);
  console.log("First item category (if available):", category[0]?.category);

  
  let content;

  if (loading) {
    content = (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading women's clothing...</p>
      </div>
    );
  } else {
    content = (
      <div className="row m-5 w-100">
        {category.map((data) => (
          <div key={data.id} className="col-md-3 mb-4">
            <Link to={`/product/${data.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100 d-flex flex-column text-center p-3 category-card">
                <img
                  src={data.image}
                  alt={data.title}
                  className="card-img-top img-fluid mb-3"
                  style={{ height: "180px", objectFit: "contain" }}
                />
                <div className="mt-auto">
                  <h6
                    className="card-title text-capitalize"
                    style={{
                      minHeight: '48px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {data.title}
                  </h6>
                  <p className="card-text fw-bold">${data.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "8vh" }}>
      {content}
    </div>
  );
}
