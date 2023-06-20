import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await axios.get('/cart/items');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchMovies();
    }, []);

    return { movies, isLoading, isError };
};

export default useFetchMovies;
