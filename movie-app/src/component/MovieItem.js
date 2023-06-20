import React, { useState } from 'react';
import {Card} from "react-bootstrap";
import {MDBBtn, MDBCardImage, MDBCol, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import {FaTrashAlt} from "react-icons/fa";
import fetchMovies from "../hooks/fetchMovies";

const MovieComponent = ({ movie }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddToCart = () => {
        const movieDetails = {
            id: movie.id,
            title: movie.title || movie.name,
            imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            releaseDate :movie.release_date,
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
                    console.log('Movie added to cart successfully');
                } else {
                    console.error('Failed to add movie to cart');
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
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
                    {isAddedToCart ? (
                        <p>Added to cart!</p>
                    ) : (
                        // <button onClick={() => handleAddToBag(result)}>Add to Cart</button>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    )}
                </Card.Body>
            </Card>
        </div>
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
