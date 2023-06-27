import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {MDBTypography} from 'mdb-react-ui-kit';
import MovieTotal from './TotalPrice';
import axios from 'axios';
import fetchMovies from '../hooks/fetchMovies';
import Empty from './Empty';

function CheckoutPage({movies, setMovies}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const [purchaseError, setPurchaseError] = useState(false);

    const PURCHASEERROR = "Failed to complete the purchase please try again later";

    fetchMovies(setMovies);

    const handleSubmit = async (event) => {
        setPurchaseError(false);

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            try {
                const totalPrice = calculateTotalPrice(); // Calculate the total price
                console.log("total price = " + totalPrice)
                const purchaseData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    payment: totalPrice,
                };
                await axios.post('/purchases/add', purchaseData); // Send the data to the server
                console.log('Purchase data sent successfully!');
                clearCart();
            } catch (error) {
                setPurchaseError(true);
            }
        }
        setValidated(true);
    };

    const clearCart = async () => {
        try {
            await axios.delete('/cart/clear');
            console.log("Cart cleared successfully");
            setMovies([]);
            window.location.replace('/'); // Navigate to the root page ("/") without adding to history
        } catch
            (error) {
            setPurchaseError(true);
        }
    }

    const calculateTotalPrice = () => {
        let total = 0;
        movies.forEach((movie) => {
            total += movie.price;
        });
        return total;

    };


    return (
        <Container className="d-flex justify-content-center align-items-center text-center">

            {movies.length > 0 ? (
                <div style={{maxWidth: '400px'}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-4">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your first name.
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your last name.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Form.Control
                            className="mb-4"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>

                        <div className="d-flex justify-content-between mb-5 text-white">
                            <MDBTypography tag="h5" className="text-uppercase">
                                Total Price
                            </MDBTypography>
                            <MovieTotal movies={movies}/>
                        </div>

                        <Button variant="light" type="submit" className="mb-4" block="true">
                            Sign in
                        </Button>
                        {purchaseError &&
                            <h4 className="text-white">
                                {PURCHASEERROR}
                            </h4>}
                    </Form>
                </div>
            ) : (
                <div className="text-white">
                    <Empty/>
                </div>

            )}
        </Container>
    );
}

export default CheckoutPage;