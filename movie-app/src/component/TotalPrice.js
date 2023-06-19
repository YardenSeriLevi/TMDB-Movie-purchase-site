import React from 'react';
import {MDBTypography} from "mdb-react-ui-kit";

function MovieTotal({ movies }) {
    const calculateTotalSum = () => {
        let total = 0;
        movies.forEach((movie) => {
            total += movie.price;
        });
        return total;

    };

    return (
        <div>
            <MDBTypography tag="h5">$ {calculateTotalSum()}</MDBTypography>
        </div>
    );
}

export default MovieTotal;
