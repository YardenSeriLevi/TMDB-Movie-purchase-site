import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {MDBTypography} from "mdb-react-ui-kit";
import MovieTotal from "./TotalPrice";
import axios from "axios";
import fetchMovies from "../hooks/fetchMovies";

function CheckoutPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const [movies, setMovies] = useState([]);

    fetchMovies(setMovies);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            // Perform form submission
            console.log('Form submitted successfully!');
        }
        setValidated(true);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" >
            <div style={{ maxWidth: '400px' }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='First name'
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
                                type='text'
                                placeholder='Last name'
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
                        className='mb-4'
                        type='email'
                        placeholder='Email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>

                    <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                            Total Price
                        </MDBTypography>
                        <MovieTotal movies={movies}/>
                    </div>

                    <Button variant='primary' type='submit' className='mb-4' block>
                        Sign in
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default CheckoutPage;
