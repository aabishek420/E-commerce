import React from "react";
import Signup from "./signup";
import Signin from "./signin";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#064179' }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white">React Ecommerce</span>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="ms-auto d-flex flex-column flex-lg-row"> {/* Flex column for small screens */}
                            <Signin />
                            <Signup />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
