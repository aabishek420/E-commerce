import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const limit = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products`)
      .then(res => res.json())
      .then(data => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = data.slice(start, end);
        setProducts(paginatedData);
        setLoading(false);
      });
  }, [page]);

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleEdit = (prod) => {
    setEditId(prod.id);
    setEditData({ ...prod });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(updated => {
        const updatedList = products.map(p => (p.id === editId ? updated : p));
        alert('Successfully updated.');
        setProducts(updatedList);
        setEditId(null);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) {
            alert("Product deleted successfully.");
            // Re-fetch products after deletion
            fetch(`https://fakestoreapi.com/products`)
              .then(res => res.json())
              .then(data => {
                const start = (page - 1) * limit;
                const end = start + limit;
                const paginatedData = data.slice(start, end);
                setProducts(paginatedData);
                setLoading(false);
              });
          } else {
            alert("Failed to delete product.");
            setLoading(false);
          }
        })
        .catch(() => {
          alert("An error occurred.");
          setLoading(false);
        });
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

 return (
  <div className="container mt-4">
    <h2>All Products</h2>

    <div className="table-responsive"> {/* Added this div for responsiveness */}
      <table className="table table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => {
            if (editId === prod.id) {
              return (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td><input name="title" value={editData.title} onChange={handleChange} /></td>
                  <td><input name="price" value={editData.price} onChange={handleChange} /></td>
                  <td><input name="category" value={editData.category} onChange={handleChange} /></td>
                  <td><input name="image" value={editData.image} onChange={handleChange} style={{ width: '80px' }} /></td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className="btn btn-success btn-sm">Save</button>
                  </td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleCancel(); }} className="btn btn-secondary btn-sm">Cancel</button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={prod.id} onClick={() => goToDetails(prod.id)} style={{ cursor: 'pointer' }}>
                  <td>{prod.id}</td>
                  <td>{prod.title}</td>
                  <td>${prod.price}</td>
                  <td>{prod.category}</td>
                  <td><img src={prod.image} width="40" height="40" alt="img" /></td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(prod); }} className="btn btn-warning btn-sm me-2">Edit</button>
                  </td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(prod.id); }} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div> {/* End of table-responsive div */}

    <div className="text-center">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-secondary btn-sm me-2"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-secondary btn-sm"
      >
        Next
      </button>
    </div>
  </div>
);
}
