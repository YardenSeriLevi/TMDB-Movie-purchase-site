import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBCard, MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow, MDBTooltip,
    MDBTypography
} from "mdb-react-ui-kit";
import {MDBIcon} from "mdb-react-ui-kit";
import fetchMovies from './fetchMovies';

import {Link} from "react-router-dom";
import {FaTrashAlt} from 'react-icons/fa';
import MovieTotal from "../component/TotalPrice";
import {Alert, Button} from "react-bootstrap";

const UseShoppingCart = ({movies ,setMovies }) => {
    const [error, setError] = useState(null);

    const EMPTYCART = "Your cart is empty. Start adding items to your cart to proceed with your purchase."

    fetchMovies(setMovies);
    const handleDeleteMovie = async (movieId) => {
        try {
            await axios.delete(`/cart/delete/${movieId}`);
            console.log("Movie deleted successfully");
            // Perform any additional actions after successful deletion
            // Update the list of movies
            const updatedMovies = movies.filter(movie => movie.id !== movieId);
            setMovies(updatedMovies);
        } catch (error) {
            console.log("Error deleting movie:", error);
            // Handle error cases
            // Find the movie with the matching movieId
            const errorMovie = movies.find(movie => movie.id === movieId);
            // Update the error message for that movie
            errorMovie.errorMessage = "The deletion operation could not be completed at the moment. Please try again later."
            setMovies([...movies]);
        }
    };


    const handleClearCart = async () => {
        try {
            await axios.delete('/cart/clear');
            console.log("Cart cleared successfully");
            // Update the list of movies to an empty array
            setMovies([]);
        } catch (error) {
            console.log("Error clearing cart:", error);
            // Handle error cases
            setError("Failed to clear the cart. Please try again later.");
        }
    };

    return (

        <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
                <MDBCard
                    className="card-registration card-registration-2"
                    style={{borderRadius: "15px"}}
                >
                    <MDBCardBody className="p-0">
                        <MDBRow className="g-0">
                            <MDBCol lg="8">
                                <div className="p-5">
                                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                        Shopping Cart
                                    </MDBTypography>
                                    <MDBTypography className="mb-0 text-muted">
                                        {movies.length} items
                                    </MDBTypography>

                                    {movies.map(movie => (
                                        <MDBRow
                                            className="mb-4 d-flex justify-content-between align-items-center"
                                            key={movie.id}
                                        >
                                            <hr className="my-4"/>
                                            <MDBCol md="2">
                                                <MDBCardImage
                                                    src={movie.imageUrl}
                                                    fluid
                                                    className="rounded-3"
                                                    alt="Cotton T-shirt"
                                                />
                                            </MDBCol>
                                            <MDBCol md="10" lg="10" xl="10">
                                                <MDBTypography tag="h6" className="text-muted">
                                                    Movie:
                                                </MDBTypography>
                                                <MDBTypography tag="h6" className="text-black mb-0">
                                                    {movie.title}
                                                </MDBTypography>

                                                <MDBTypography tag="h6" className="text-muted">
                                                    Release Date:
                                                </MDBTypography>
                                                <MDBTypography tag="h6" className="text-black mb-0">
                                                    {movie.releaseDate}
                                                </MDBTypography>

                                                <MDBTypography tag="h6" className="text-muted">
                                                    Price:
                                                </MDBTypography>
                                                <MDBTypography tag="h6" className="text-black mb-0">
                                                    $ {movie.price}
                                                </MDBTypography>

                                                <Button
                                                    variant="link"
                                                    onClick={() => handleDeleteMovie(movie.id)}
                                                    style={{ color: 'black' }}
                                                >
                                                    <FaTrashAlt size={16} />
                                                </Button>
                                                {movie.errorMessage && (
                                                    <div className="text-danger">{movie.errorMessage}</div>
                                                )}
                                            </MDBCol>
                                        </MDBRow>
                                    ))}

                                    <hr className="my-4"/>
                                    <div className="pt-5">
                                        {error && <div className="text-danger">{error}</div>}
                                        {movies.length > 0 && (
                                            <Button className="btn-danger" onClick={handleClearCart}>
                                            Clear Cart
                                            </Button>
                                        )}
                                    </div>
                                    {!movies.length > 0 && (
                                        <MDBTypography tag="h4" className="text-danger">
                                            {EMPTYCART}
                                        </MDBTypography>
                                        // <Alert variant="danger">{empty}</Alert>
                                        )}
                                    <div className="pt-5">
                                        <MDBTypography tag="h6" className="mb-0">
                                            <Link to="/Search" className="text-body">
                                                Back to shop
                                            </Link>
                                        </MDBTypography>
                                    </div>
                                </div>
                            </MDBCol>
                            <MDBCol lg="4" className="bg-grey">
                                <div className="p-5">
                                    <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                        Summary
                                    </MDBTypography>

                                    <hr className="my-4"/>

                                    <div className="d-flex justify-content-between mb-4">
                                        <MDBTypography tag="h5" className="text-uppercase">
                                            Items
                                        </MDBTypography>
                                        <MDBTypography tag="h5">{movies.length}</MDBTypography>
                                    </div>

                                    <hr className="my-4"/>

                                    <div className="d-flex justify-content-between mb-5">
                                        <MDBTypography tag="h5" className="text-uppercase">
                                            Total Price
                                        </MDBTypography>
                                        <MovieTotal movies={movies}/>
                                    </div>

                                    {movies.length > 0 && (
                                        <Link to="/checkout" className="btn btn-primary btn-lg w-100">
                                            Checkout
                                        </Link>
                                    )}
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>

    );

};
export default UseShoppingCart;

