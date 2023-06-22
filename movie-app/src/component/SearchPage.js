import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Alert, Card, Dropdown} from 'react-bootstrap';
import GenreDropdown from "./GenreDropdown ";
import MovieItems from "./MovieItem";
import '..//index.css';
import FetchMovies from "../hooks/fetchMovies";
import useFetchMovies from "../hooks/useFetchMovies";
import fetchMovies from "../hooks/fetchMovies"; // Import the CSS file
const API_KEY = '13f7a88e55dd111b7d108658b6b6216a';
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
const GENERAL_SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false`;
const SEARCH_BY_GENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false`;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [genresError, setGenresError] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [showSearchHistory, setShowSearchHistory] = useState(false); // New state variable
    const [searchHistory, setSearchHistory] = useState([]);
    const [movies, setMovies] = useState([]);

    const GENRESERROR = "There is a problem displaying the movies categories";
    const SEARCHERROR = "There is a problem searching for the movies, please try again later";
    // const { movies } = useFetchMovies();

    fetchMovies(setMovies);

    useEffect(() => {
        // Fetch genres from the TMDB API
        const fetchGenres = async () => {
            try {
                const response = await axios.get(GENRE_API_URL);
                setGenres(response.data.genres);
            } catch (error) {
                setGenresError(true);
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
            setSearchError(false);

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
            } catch
                (error) {
                setSearchError(true);
            }

            setIsLoading(false);
        }
    ;

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
                                            <button
                                                className="btn btn-link"
                                                onClick={() => handleHistoryItemClick(item)}
                                            >
                                                {item.query}
                                            </button>
                                            <button
                                                className="btn btn-link col-3"
                                                onClick={() => handleDeleteSearchHistoryItem(item.id)}
                                            >
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
                            <i
                                className="fas fa-shopping-cart icon fa-flip-horizontal"
                                aria-hidden="true"
                            ></i>
                            <em className="cart-quantity">{movies.length}</em>
                        </div>
                    </Col>
                </Form.Group>
            </Form>

            <p/>

            <Row>
                <Col sm={6}>
                    {!genresError && <GenreDropdown genres={genres} handleGenreClick={handleSearch}/>}
                    {genresError && <Alert variant="danger">{GENRESERROR}</Alert>}
                </Col>
            </Row>
            <p/>
            <Row>
                <Col sm={6}>
                    {searchError && <Alert variant="danger">{SEARCHERROR}</Alert>}
                </Col>
            </Row>


            {isLoading ? (
                <div>Loading...</div>
            ) : (
                // <MovieItems searchResults={searchResults} />
                <Row>
                    {searchResults.map((result) => (
                        <Col key={result.id} sm={4} className="mb-4">
                            <MovieItems movie={result} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default SearchPage;
