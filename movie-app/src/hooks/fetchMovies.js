import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchMovies(setMovies) {

    useEffect(() => {
        async function getMovies() {

            try {
                const result = await axios.get('/cart/items');
                setMovies(result.data);
                console.log("res =", result);
            } catch (error) {
                console.log(error);
            }
        }

        getMovies();
    }, []);


}


export default FetchMovies ;
