import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBCard, MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow, MDBTooltip,
    MDBTypography
} from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const UseShoppingCart = () => {
    const [movies, setMovies] = useState([]);

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
    const handleDeleteMovie = (movieId) => {
        // Implement the logic to delete the movie with the given movieId
        console.log("Delete movie with ID:", movieId);
    };

    return (
        <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{borderRadius: "15px"}}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                Shopping Cart
                                            </MDBTypography>
                                            <MDBTypography className="mb-0 text-muted">
                                                {movies.length} items
                                            </MDBTypography>
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                            </div>

                                            {movies.map(movie => (
                                                <MDBRow
                                                    className="mb-4 d-flex justify-content-between align-items-center">
                                                    <hr className="my-4"/>
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage
                                                            src={movie.imageUrl}
                                                            fluid className="rounded-3" alt="Cotton T-shirt"/>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">
                                                            Movie
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            {movie.title}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                        <MDBTypography tag="h6" className="mb-0">
                                                            $ {movie.price}
                                                        </MDBTypography>
                                                        <a href="#!" className="float-end text-black" onClick={() => handleDeleteMovie(movie.id)}>
                                                            <MDBIcon fas icon="times" />
                                                        </a>
                                                    </MDBCol>

                                                </MDBRow>
                                            ))}
                                            <hr className="my-4"/>
                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <Link to="/Search" className="text-body">Back to shop</Link>
                                                </MDBTypography>
                                            </div>
                                        </div>

                                        <MDBRow>

                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol lg="4" className="bg-grey">
                                        <div className="p-5">
                                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </MDBTypography>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-4">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    {movies.length} items
                                                </MDBTypography>
                                                <MDBTypography tag="h5">€ 132.00</MDBTypography>
                                            </div>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography tag="h5">€ 137.00</MDBTypography>
                                            </div>

                                            <MDBBtn color="dark" block size="lg">
                                                Register
                                            </MDBBtn>
                                        </div>

                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </section>

    );
};
export default UseShoppingCart;

