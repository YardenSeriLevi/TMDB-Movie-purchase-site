
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React from "react";
const MenuBar = (movies) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Cart" className="nav-link">Cart</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default MenuBar;

