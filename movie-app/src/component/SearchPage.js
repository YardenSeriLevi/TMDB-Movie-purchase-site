import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Alert, Card, Dropdown, Offcanvas} from 'react-bootstrap';
import GenreDropdown from "./GenreDropdown ";
import MovieItems from "./MovieItem";
import '..//index.css';
import fetchMovies from "../hooks/fetchMovies";
import {FaTrashAlt} from "react-icons/fa"; // Import the CSS file
const API_KEY = '13f7a88e55dd111b7d108658b6b6216a';
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
const GENERAL_SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&include_adult=false`;
const SEARCH_BY_GENRE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false`;

const SearchPage = ({movies, setMovies,searchHistory,setSearchHistory}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [genresError, setGenresError] = useState(false);
    const [searchError, setSearchError] = useState(false);
    //const [searchHistory, setSearchHistory] = useState([]);
    const [serverError, setServerError] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const GENRESERROR = "There is a problem displaying the movies categories";
    const SEARCHERROR = "There is a problem searching for the movies, please try again later";
    const SERVERERROR = "There is a communication problem with the server";
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

    const handleHistoryItemClick = (item) => {
        setSearchQuery(item.query);
        handleSearch()
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
    const handleClearAllHistory = () => {
        setSearchHistory([]);
    };

    return (
        <>
            <Form onSubmit={handleSearch}>
                <Form.Group as={Row} controlId="formSearch">
                    <Col sm={6} className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by movie name or actor"
                        />
                    </Col>
                    <Col xs={3} className="d-flex align-items-center">
                        <Button type="submit">Search</Button>
                    </Col>
                    <Col xs={2} className="d-flex align-items-center">
                        <Button variant="primary" onClick={handleShow} className="me-2">
                            Search History
                        </Button>
                        <Offcanvas placement="end" show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Offcanvas.Title>Search History</Offcanvas.Title>
                                </div>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {searchHistory.map((item) => (
                                    <div key={item.id}>
                                        <Button
                                            variant="link"
                                            onClick={() => handleHistoryItemClick(item)}
                                            style={{ color: 'black' }}
                                        >
                                            {item.query}
                                        </Button>
                                        <Button
                                            variant="link"
                                            onClick={() => handleDeleteSearchHistoryItem(item.id)}
                                            style={{ color: 'black' }}
                                        >
                                            <FaTrashAlt size={16} />
                                        </Button>
                                    </div>
                                ))}
                                {searchHistory.length > 0 && (
                                    <Button className="btn-danger" onClick={handleClearAllHistory}>
                                        Clear history
                                    </Button>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                    <Col xs={1} className="d-flex align-items-center justify-content-end">
                        <div className="cart-icon">
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

            {serverError && <div className="text-danger">{SERVERERROR}</div>}

            {isLoading ? (
                <div>Loading...</div>
            ) : searchResults ? (
                <Row>
                    {searchResults.map((result) => (
                        <Col key={result.id} sm={4} className="mb-4">
                            <MovieItems movie={result} movies={movies} setMovies={setMovies} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>No search results found.</div>
            )}
        </>
    );
};

export default SearchPage;
