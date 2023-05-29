import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card, Dropdown } from 'react-bootstrap';
import GenreDropdown from "./GenreDropdown ";
import MovieItem from "./MovieItem";

const API_KEY = '13f7a88e55dd111b7d108658b6b6216a';
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
const GENERAL_SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false`;
const SEARCH_BY_GENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false`;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [shoppingBag, setShoppingBag] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false); // New state variable
    const [searchHistory, setSearchHistory] = useState([]);

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

    const handleMouseEnter = () => {
        setShowSearchHistory(true);
    };


    const handleMouseLeave = () => {
        setShowSearchHistory(false);
    };

    const handleHistoryItemClick = (item) => {
        console.log("in handleHistoryItemClick");
        setSearchQuery(item.query);
    };

    const handleDeleteHistoryItem = (event, itemId) => {
        event.stopPropagation();

        const updatedHistory = searchHistory.filter((item) => item.id !== itemId);
        setSearchHistory(updatedHistory);
    };

    const handleDeleteSearchHistoryItem = (itemId) => {
        setSearchHistory((prevHistory) => prevHistory.filter((item) => item.id !== itemId));
    };
    const handleSearch = async (event, genreId) => {
        if (event) {
            event.preventDefault();
        }
        setIsLoading(true);
        setIsError(false);

        try {
            let apiUrl ;

            if (genreId) {
                console.log("in if id = "+genreId);
                // Search by genre
                apiUrl = `${SEARCH_BY_GENRE}&with_genres=${genreId}`;
                // apiUrl += `&with_genres=${genreId}`;
            } else if (searchQuery) {
                // Search by movie name or actor
                apiUrl = `${GENERAL_SEARCH_API_URL}&query=${encodeURIComponent(searchQuery)}`;
                const newSearchHistory = [{ id: Date.now(), query: searchQuery }, ...searchHistory];
                setSearchHistory(newSearchHistory);
            }

            const response = await axios.get(apiUrl);
            setSearchResults(response.data.results);
        } catch (error) {
            setIsError(true);
            console.error('Error searching:', error);
        }

        setIsLoading(false);
    };

    const handleAddToBag = (movie) => {
        setShoppingBag((prevBag) => [...prevBag, movie]);
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
                            placeholder="Search by movie name or actor"
                            onFocus={handleMouseEnter} // Use onFocus instead of onMouseEnter
                            onBlur={handleMouseLeave} // Use onBlur instead of onMouseLeave
                        />
                        {searchHistory.length > 0 && (
                            <ul className="search-history">
                                {searchHistory.map((item) => (
                                    <li key={item.id} onClick={() => handleHistoryItemClick(item)}>
                                        {item.query}
                                        <span
                                            className="delete-button"
                                            onClick={() => handleDeleteSearchHistoryItem(item.id)}
                                        >
                      X
                    </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Col>
                    <Col sm={3}>
                        <Button type="submit">Search</Button>
                    </Col>
                </Form.Group>
            </Form>
            {/*{showSearchHistory && (*/}
            {/*    <ul>*/}
            {/*        {searchHistory.map((item, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                <button onClick={() => handleSearchHistoryItemClick(item)}>{item}</button>*/}
            {/*                <button onClick={() => handleDeleteSearchHistoryItem(index)}>Delete</button>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*)}*/}
            <GenreDropdown genres={genres} handleGenreClick={handleSearch} />

            {isError && <Alert variant="danger">Error occurred while searching.</Alert>}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Row>
                    {searchResults.map((result) => (
                        <Col key={result.id} sm={4} className="mb-4">
                            <MovieItem movie={result} />
                        </Col>
                    ))}
                </Row>
            )}
            {/* Display shopping bag contents */}
            <h2>Shopping Bag</h2>
            <ul>
                {shoppingBag.map((movie) => (
                    <li key={movie.id}>{movie.title || movie.name}</li>
                ))}
            </ul>
        </Container>
    );
};

export default SearchPage;
