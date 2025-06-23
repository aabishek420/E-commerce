import React, { useEffect, useState } from "react";
import "./Section.css";
import electronicsImg from "./asserts/electronics.jpg";
import jewelryImg from "./asserts/jw.jpg";
import mensClothingImg from "./asserts/mens clothing.jpg";
import womensClothingImg from "./asserts/women.jpg";
import { Link } from "react-router-dom";

function Categories() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryImages = {
    "electronics": electronicsImg,
    "jewelery": jewelryImg,
    "men's clothing": mensClothingImg,
    "women's clothing": womensClothingImg
  };

  const routeMap = {
    "electronics": "/electronics",
    "jewelery": "/jewelery",
    "men's clothing": "/mens-clothing",
    "women's clothing": "/womens-clothing"
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategory(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="row m-5 w-100">
      {category.map((data) => (
        <div key={data} className="col-md-3 mb-4">
          <Link to={routeMap[data]} style={{ textDecoration: 'none' }}>
            <div className="card h-100 text-center p-3 category-card">
              <img
                src={categoryImages[data]}
                alt={data}
                className="card-img-top img-fluid mb-3"
                style={{ height: "180px", objectFit: "contain" }}
              />
              <h5 className="card-title">{data}</h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
