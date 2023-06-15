import React, { useState } from 'react';
import {Card} from "react-bootstrap";

const MovieComponent = ({ movie }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddToCart = () => {
        const movieDetails = {
            id: movie.id,
            title: movie.title || movie.name,
            imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
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
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieComponent;
