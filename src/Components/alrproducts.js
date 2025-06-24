import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
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

  const goToDetails = (id) => navigate(`/product/${id}`);

  const handleEdit = (prod) => {
    setEditId(prod.id);
    setEditData({ ...prod });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
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

  const handleCancel = () => setEditId(null);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product ${id}?`)) {
      setLoading(true);
      fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          const filteredProducts = products.filter((p) => p.id !== id);
          setProducts(filteredProducts);
          alert(`Product ${id} deleted successfully!`);
          setLoading(false);
        });
    }
  };

  const handleModalChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = () => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(added => {
        setProducts([...products, added]);
        alert("New product added successfully!");
        setShowModal(false);
        setLoading(false);
      });
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

      <div className="mb-3">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <div className="table-responsive">
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
            {products.map(prod => (
              editId === prod.id ? (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td><input name="title" value={editData.title} onChange={handleChange} /></td>
                  <td><input name="price" value={editData.price} onChange={handleChange} /></td>
                  <td><input name="category" value={editData.category} onChange={handleChange} /></td>
                  <td><input name="image" value={editData.image} onChange={handleChange} style={{ width: '80px' }} /></td>
                  <td><button onClick={handleSave} className="btn btn-success btn-sm">Save</button></td>
                  <td><button onClick={handleCancel} className="btn btn-secondary btn-sm">Cancel</button></td>
                </tr>
              ) : (
                <tr key={prod.id} onClick={() => goToDetails(prod.id)} style={{ cursor: 'pointer' }}>
                  <td>{prod.id}</td>
                  <td>{prod.title}</td>
                  <td>${prod.price}</td>
                  <td>{prod.category}</td>
                  <td><img src={prod.image} width="40" height="40" alt="img" /></td>
                  <td><button onClick={(e) => { e.stopPropagation(); handleEdit(prod); }} className="btn btn-warning btn-sm me-2">Edit</button></td>
                  <td><button onClick={(e) => { e.stopPropagation(); handleDelete(prod.id); }} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-secondary btn-sm me-2">Previous</button>
        <button onClick={() => setPage(page + 1)} className="btn btn-secondary btn-sm">Next</button>
      </div>

      {/* Modal using Bootstrap 5 only (no react-bootstrap) */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label>Title</label>
                    <input name="title" value={newProduct.title} onChange={handleModalChange} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label>Price</label>
                    <input name="price" type="number" value={newProduct.price} onChange={handleModalChange} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label>Category</label>
                    <input name="category" value={newProduct.category} onChange={handleModalChange} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label>Description</label>
                    <input name="description" value={newProduct.description} onChange={handleModalChange} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label>Image URL</label>
                    <input name="image" value={newProduct.image} onChange={handleModalChange} className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Add Product</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
