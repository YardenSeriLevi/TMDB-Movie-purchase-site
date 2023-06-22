import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuBar from "./component/ManuBar";
import Search from "./component/SearchPage";
import Checkout from "./component/CheckoutPage";
import './index.css'; // Import the CSS file
import {Link, Outlet} from 'react-router-dom';
import {MDBContainer} from "mdb-react-ui-kit";
import fetchMovies from "./hooks/fetchMovies";
import UseShoppingCart from "./hooks/UseShoppingCart";

const App = () => {

    const [movies, setMovies] = useState([]);

    return (
        <>
            <Router>
                <MenuBar/>
                <section className="h-100 h-custom" style={{backgroundColor: "#eee", minHeight: '100%'}}>
                    <MDBContainer className="py-5 h-100">
                        <Routes>
                            <Route path="/" element={<Search movies = {movies} setMovies = {setMovies}/>}/>
                            <Route path="/cart" element={<UseShoppingCart movies={movies} setMovies={setMovies} />} />
                            <Route path="/search" element={<Search movies = {movies} setMovies = {setMovies}/>}/>
                            <Route path="/checkout" element={<Checkout movies = {movies} setMovies = {setMovies}/>}/>
                        </Routes>
                    </MDBContainer>
                </section>
            </Router>
        </>

    );
};

export default App;
