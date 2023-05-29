import React from 'react';
import FormFetchWithHook from "./component/SearchPage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuBar from "./component/ManuBar";
import Search from "./component/SearchPage";
import Cart from "./component/CartPage";
import Checkout from "./component/CheckoutPage";
import './index.css'; // Import the CSS file
import { Link, Outlet } from 'react-router-dom';
const App = () => {
    return (
        <>
            <Router>
                <MenuBar/>
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                </Routes>
            </Router>
        </>

    );
};

export default App;
