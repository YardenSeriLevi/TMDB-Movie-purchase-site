import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import defultPic from '../images/defult pic.jpg';

const MovieComponent = ({ movie, movies, setMovies }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [cartError, setCartError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showFullTitle, setShowFullTitle] = useState(false);

    const ADDTOCARTERROR = 'There is a problem adding the movie to the cart, please try again later';
    const SERVERERROR = 'There is a communication problem with the server';

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
            .then((response) => {
                // Handle the response
                if (response.ok) {
                    setIsAddedToCart(true);
                    getMovies();
                    console.log('Movie added to cart successfully');
                } else {
                    setCartError(true);
                }
            })
            .catch((error) => {
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

    const toggleShowFullTitle = () => {
        setShowFullTitle((prevShowFullTitle) => !prevShowFullTitle);
    };

    return (
        <div className="col-11 card style_1">
            <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="img-fluid"
                onError={handleImageError}
            />
            <Card.Body>
                <div className="card-title-wrapper">
                    <Card.Title className="card-title">
                        {showFullTitle || (movie.title || movie.name).length <= 20
                            ? movie.title || movie.name
                            : `${(movie.title || movie.name).slice(0, 20)}...`}
                    </Card.Title>
                </div>
                {/*{((movie.title || movie.name).length > 20) ? (*/}
                {/*    <div className="read-more-wrapper">*/}
                {/*        <Button variant="link" onClick={toggleShowFullTitle}>*/}
                {/*            {showFullTitle ? 'Read Less' : 'Read More'}*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        <br />*/}
                {/*        <br />*/}
                {/*    </>*/}
                {/*)}*/}

                <Card.Text variant="primary">Feedback {movie.vote_average}</Card.Text>

                <div className="col 4">
                    <Card.Text>$3.99</Card.Text>
                </div>
                <div className="col 4">
                    {isInCart(movie.id, movies) ? (
                        <p>Added to cart!</p>
                    ) : (
                        !isAddedToCart && (
                            <div>
                                <Button onClick={handleAddToCart}>Add to Cart</Button>
                            </div>
                        )
                    )}
                </div>
                {cartError && <div className="text-danger">{ADDTOCARTERROR}</div>}
            </Card.Body>
            {serverError && <div className="text-danger">{SERVERERROR}</div>}
        </div>
    );

};

export default MovieComponent;
