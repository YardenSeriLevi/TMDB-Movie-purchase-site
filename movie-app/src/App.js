import React from 'react';
import FormFetchWithHook from "./component/SearchPage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuBar from "./component/ManuBar";
import Search from "./component/SearchPage";
import Cart from "./component/ShoppingCart";
import Checkout from "./component/CheckoutPage";
import './index.css'; // Import the CSS file
import {Link, Outlet} from 'react-router-dom';
import QuantityEdit from "./component/ShoppingCart";
import {MDBContainer} from "mdb-react-ui-kit";

const App = () => {
    return (
        <>
            <Router>
                <MenuBar/>
                <section className="h-100 h-custom" style={{backgroundColor: "#eee", minHeight: '100%'}}>
                    <MDBContainer className="py-5 h-100">
                        <Routes>
                            <Route path="/" element={<Search/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                        </Routes>
                    </MDBContainer>
                </section>
            </Router>
        </>

    );
};

export default App;
