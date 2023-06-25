import React, { useState } from 'react';
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import defultPic from "../images/defult pic.jpg"

const MovieComponent = ({ movie, movies, setMovies }) => {
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

    const handleImageError = (event) => {
        event.target.src = defultPic; // Replace the image source with the fallback image URL
    };

    return (
        <div className="col-sm-8 card style_1">
            <Card className="movie-item">
                <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="img-fluid"
                    onError={handleImageError} // Handle image load error
                />
                <Card.Body>
                    <Card.Title>{movie.title || movie.name}</Card.Title>

                    <Card.Text variant="primary">Feedback {movie.vote_average}</Card.Text>

                    <Card.Text>$3.99</Card.Text>

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
            </Card>
        </div>
    );
};

export default MovieComponent;
