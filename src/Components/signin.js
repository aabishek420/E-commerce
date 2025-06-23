import React, { useState } from 'react';

export default function Signin() {
  const [show, setShow] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    alert("Signed in successfully!");
    setShow(false);
  };

  let modal;
  if (show) {
    modal = (
      <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Sign In</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <form onSubmit={handleSignin}>
              <div className="modal-body">
                <input type="email" className="form-control mb-3" placeholder="Email" required />
                <input type="password" className="form-control mb-3" placeholder="Password" required />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Sign In</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  } else {
    modal = null;
  }

  return (
    <>
      <button className="btn btn-outline-light me-2" onClick={() => setShow(true)}>
        Sign In
      </button>
      {modal}
    </>
  );
}
