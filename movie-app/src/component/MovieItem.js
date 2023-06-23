import React, {useState} from 'react';
import {Button, Card, Toast} from "react-bootstrap";
import {MDBBtn, MDBCardImage, MDBCol, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {FaTrashAlt} from "react-icons/fa";
import fetchMovies from "../hooks/fetchMovies";
import axios from "axios";

const MovieComponent = ({movie, movies, setMovies}) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [cartError, setCartError] = useState(false);
    const [serverError, setServerError] = useState(false);

    const ADDTOCARTERROR = "There is a problem adding the movie to the cart, please try again later";
    const SERVERERROR = "There is a communication problem with the server";
    const handleAddToCart = () => {

        setCartError(false);
        const movieDetails = {
            id: movie.id,
            title: movie.title || movie.name,
            imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            releaseDate: movie.release_date,
            price: 3.99,
        };

        fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieDetails),
        })
            .then(response => {
                // Handle the response
                if (response.ok) {
                    setIsAddedToCart(true);
                    getMovies();
                    console.log('Movie added to cart successfully');
                } else {
                    setCartError(true);
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    async function getMovies() {

        setServerError(false);
        try {
            const result = await axios.get('/cart/items');
            setMovies(result.data);
        } catch (error) {
            console.log(error);
            // Handle the error separately
            setServerError(true);
        }
    }

    function isInCart(movieId, movies) {
        return movies.some((movie) => movie.id === movieId);
    }


    return (

        <>
            <div className="col-sm-8">
                <Card className="movie-item">
                    <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="img-fluid"
                    />
                    <Card.Body>
                        <Card.Title>{movie.title || movie.name}</Card.Title>
                        <Card.Text>$3.99</Card.Text>
                        <Card.Text variant="primary">Feedback {movie.vote_average}</Card.Text>

                        {isInCart(movie.id, movies) ? (
                            <p>Added to cart!</p>
                        ) : (
                            !isAddedToCart && (
                                <div>
                                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                                </div>
                            )
                        )}
                        {cartError && <div className="text-danger">{ADDTOCARTERROR}</div>}
                    </Card.Body>
                    {serverError && <div className="text-danger">{SERVERERROR}</div>}

                    {/*{ serverError && <Toast> {SERVERERROR} </Toast>}*/}
                </Card>
            </div>
        </>
        // <MDBRow
        //     className="mb-4 d-flex justify-content-between align-items-center"
        //     key={movie.id}
        // >
        //     <MDBCol md="2">
        //         <MDBCardImage
        //             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        //             fluid
        //             className="rounded-3"
        //         />
        //     </MDBCol>
        //     <MDBCol md="10" lg="10" xl="10">
        //         <MDBTypography tag="h6" className="text-muted">
        //             Movie:
        //         </MDBTypography>
        //         <MDBTypography tag="h6" className="text-black mb-0">
        //             {movie.title}
        //         </MDBTypography>
        //
        //         <MDBTypography tag="h6" className="text-muted">
        //             Release Date:
        //         </MDBTypography>
        //         <MDBTypography tag="h6" className="text-black mb-0">
        //             {movie.releaseDate}
        //         </MDBTypography>
        //
        //         <MDBTypography tag="h6" className="text-muted">
        //             Price:
        //         </MDBTypography>
        //         <MDBTypography tag="h6" className="text-black mb-0">
        //             $ {movie.price}
        //         </MDBTypography>
        //
        //     </MDBCol>
        // </MDBRow>
    );
};

export default MovieComponent;