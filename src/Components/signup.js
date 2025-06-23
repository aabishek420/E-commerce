import React, { useState } from 'react';

export default function Signup() {
  const [show, setShow] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signed up successfully!");
    setShow(false);
  };

  let modal;
  if (show) {
    modal = (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <form onSubmit={handleSignup}>
              <div className="modal-body">
                <input type="text" className="form-control mb-3" placeholder="Full Name" required />
                <input type="email" className="form-control mb-3" placeholder="Email" required />
                <input type="password" className="form-control mb-3" placeholder="Password" required />
                <input type="password" className="form-control mb-3" placeholder="Confirm Password" required />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Sign Up</button>
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
      <button className="btn btn-outline-light" onClick={() => setShow(true)}>Sign Up</button>
      {modal}
    </>
  );
}
