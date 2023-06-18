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

import {Link} from "react-router-dom";
import {FaTrashAlt} from 'react-icons/fa';

const UseShoppingCart = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getMovies() {
            try {
                const result = await axios.get('/cart/items');
                setMovies(result.data);
                console.log("res =", result);
            } catch (error) {
                console.log(error);
            }
        }

        getMovies();
    }, []);
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
    const calculateTotalSum = () => {
        let total = 0;
        movies.forEach((movie) => {
            total += movie.price;
        });
        return total;

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
        <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{borderRadius: "15px"}}>
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
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                            </div>

                                            {movies.map(movie => (
                                                <MDBRow
                                                    className="mb-4 d-flex justify-content-between align-items-center"
                                                    key={movie.id}
                                                >
                                                    <hr className="my-4" />
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage
                                                            src={movie.imageUrl}
                                                            fluid
                                                            className="rounded-3"
                                                            alt="Cotton T-shirt"
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">
                                                            Movie
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            {movie.title}
                                                        </MDBTypography>
                                                        <MDBTypography tag="p" className="text-muted">
                                                            Release Date: {movie.releaseDate}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBBtn color="link" onClick={() => handleDeleteMovie(movie.id)}>
                                                        <FaTrashAlt size={16} />
                                                    </MDBBtn>
                                                    {movie.errorMessage && (
                                                        <div className="text-danger">{movie.errorMessage}</div>
                                                    )}
                                                </MDBRow>
                                            ))}

                                            <hr className="my-4"/>
                                            <div className="pt-5">
                                                {error && <div className="text-danger">{error}</div>}
                                                {movies.length > 0 && (
                                                    <MDBBtn
                                                        color="danger"
                                                        onClick={handleClearCart}
                                                        size="lg"
                                                        className="clear-button"
                                                    >
                                                        Clear Cart
                                                    </MDBBtn>
                                                )}
                                            </div>
                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <Link to="/Search" className="text-body">Back to shop</Link>
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
                                                    {movies.length} items
                                                </MDBTypography>
                                                <MDBTypography tag="h5">${calculateTotalSum()}</MDBTypography>
                                            </div>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography tag="h5">$ {calculateTotalSum()}</MDBTypography>
                                            </div>

                                            <MDBBtn color="dark" block size="lg">
                                                Register
                                            </MDBBtn>
                                        </div>

                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </section>

    );
};
export default UseShoppingCart;

