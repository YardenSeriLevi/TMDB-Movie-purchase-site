import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Alert, Card, Dropdown} from 'react-bootstrap';
import GenreDropdown from "./GenreDropdown ";
import MovieItems from "./MovieItem";
import '..//index.css';
import fetchMovies from "../hooks/fetchMovies";
import movieItem from "./MovieItem";
import FetchMovies from "../hooks/fetchMovies";
import useFetchMovies from "../hooks/useFetchMovies"; // Import the CSS file
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
    const [showSearchHistory, setShowSearchHistory] = useState(false); // New state variable
    const [searchHistory, setSearchHistory] = useState([]);
    const [movies, setMovies] = useState([]);

    // const { movies } = useFetchMovies();

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

    // useEffect(() => {
    //     FetchMovies(setMovies);
    // }, []);

    const handleMouseEnter = () => {
        setShowSearchHistory(true);
    };


    const handleMouseLeave = () => {
        setShowSearchHistory(false);
    };

    const handleHistoryItemClick = (item) => {
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
            let apiUrl;

            if (genreId) {
                // Search by genre
                apiUrl = `${SEARCH_BY_GENRE}&with_genres=${genreId}`;
            } else if (searchQuery) {
                // Search by movie name or actor
                apiUrl = `${GENERAL_SEARCH_API_URL}&query=${encodeURIComponent(searchQuery)}`;
                const newSearchHistoryItem = {id: Date.now(), query: searchQuery};

                // Check if the search query already exists in the search history
                const isDuplicateSearch = searchHistory.some((item) => item.query === searchQuery);

                if (!isDuplicateSearch) {
                    const newSearchHistory = [newSearchHistoryItem, ...searchHistory];
                    setSearchHistory(newSearchHistory);
                }
            }

            const response = await axios.get(apiUrl);
            setSearchResults(response.data.results);
        } catch (error) {
            setIsError(true);
            console.error('Error searching:', error);
        }

        setIsLoading(false);
    };

    return (
        <>
            <Form onSubmit={handleSearch}>
                <Form.Group as={Row} controlId="formSearch">
                    <Col sm={9} className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by movie name or actor"
                            onFocus={handleMouseEnter}
                            onBlur={handleMouseLeave}
                        />
                        {searchHistory.length > 0 && (
                            <div className="bg-gray p-1 custom-gray-div col-3">
                                <ul className="search-history">
                                    {searchHistory.map((item) => (
                                        <li className="sub-menu-item col-9" role="none">
                                            <button className="btn btn-link" onClick={() => handleHistoryItemClick(item)}>
                                                {item.query}
                                            </button>
                                            <button className="btn btn-link col-3" onClick={() => handleDeleteSearchHistoryItem(item.id)}>
                                                X
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>
                    <Col sm={3} className="d-flex align-items-center">
                        <Button type="submit">Search</Button>
                        <div className="cart-icon ml-3">
                            <i className="fas fa-shopping-cart icon fa-flip-horizontal" aria-hidden="true"></i>
                            {/*{movies && <em className="cart-quantity">{movies.length}</em>}*/}
                            <em className="cart-quantity">{movies.length}</em>
                        </div>
                    </Col>
                </Form.Group>
            </Form>

            <GenreDropdown genres={genres} handleGenreClick={handleSearch} />

            {isError && <Alert variant="danger">Error occurred while searching.</Alert>}


        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <Row>

                {searchResults.map((result) => (
                    <Col key={result.id} sm={4} className="mb-4">
                        <MovieItems movie = {result} setMovies ={setMovies} />
                    </Col>
                ))}
            </Row>
        )}

        </>
    )
        ;
};

export default SearchPage;
