import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card, Dropdown } from 'react-bootstrap';

const API_KEY = '13f7a88e55dd111b7d108658b6b6216a';
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
const SEARCH_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false`;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Fetch genres from the TMDB API
        const fetchGenres = async () => {
            try {
                const response = await axios.get(GENRE_API_URL);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setIsError(true);
            }
        };

        fetchGenres();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setIsError(false);

        try {
            let apiUrl = SEARCH_API_URL;
            if (selectedGenre) {
                apiUrl += `&with_genres=${selectedGenre}`;
            }
            const response = await axios.get(apiUrl);
            setSearchResults(response.data.results);
        } catch (error) {
            setIsError(true);
            console.error('Error searching:', error);
        }

        setIsLoading(false);
    };

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    return (
        <Container>
            <Form onSubmit={handleSearch}>
                <Form.Group as={Row} controlId="formSearch">
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search..."
                        />
                    </Col>
                    <Col sm={3}>
                        <Button type="submit">Search</Button>
                    </Col>
                </Form.Group>
            </Form>

            <Dropdown>
                <Dropdown.Toggle variant="secondary">Genres</Dropdown.Toggle>
                <Dropdown.Menu>
                    {genres.map((genre) => (
                        <Dropdown.Item key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                            {genre.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {isError && <Alert variant="danger">Error occurred while searching.</Alert>}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Row>
                    {searchResults.map((result) => (
                        <Col key={result.id} sm={4} className="mb-4">
                            <div className="movie-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                                    alt={result.title || result.name}
                                    className="img-fluid"
                                />
                                <div className="movie-info">
                                    <h3>{result.title || result.name}</h3>
                                    <p>$3.99</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;
