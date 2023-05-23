import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const MenuBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Search" className="nav-link">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Cart" className="nav-link">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Checkout" className="nav-link">Checkout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};
export default MenuBar;
