import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuBar from "./component/ManuBar";
import Search from "./component/SearchPage";
import Checkout from "./component/CheckoutPage";
import './index.css'; // Import the CSS file
import {Link, Outlet} from 'react-router-dom';
import {MDBContainer} from "mdb-react-ui-kit";
import fetchMovies from "./hooks/fetchMovies";
import ShoppingCart from "./component/ShoppingCart";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const containerStyle = {
        backgroundColor: 'black',
    };

    return (
        <>
            <div style={containerStyle}>

                <Router>
                    <MenuBar/>
                    <section className="h-100 h-custom  dark-red-background " style={{minHeight: '100%'}}>
                        <MDBContainer className="py-5 h-100 ">
                            <Routes>
                                <Route path="/" element={<Search movies={movies} setMovies={setMovies}
                                                                 searchHistory={searchHistory}
                                                                 setSearchHistory={setSearchHistory}/>}/>
                                <Route path="/cart" element={<ShoppingCart movies={movies} setMovies={setMovies}/>}/>
                                <Route path="/search" element={<Search movies={movies} setMovies={setMovies}
                                                                       searchHistory={searchHistory}
                                                                       setSearchHistory={setSearchHistory}/>}/>
                                <Route path="/checkout" element={<Checkout movies={movies} setMovies={setMovies}/>}/>
                            </Routes>
                        </MDBContainer>
                    </section>
                </Router>
            </div>
        </>

    );
};

export default App;

