import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron } from 'react-bootstrap';
import MovieList from '../components/movieList';
import './MovieList.css';


class MovieOverview extends Component {

    render() {
        return (


                <Container>
                    <Row>
                        <MovieList />
                    </Row>
                </Container>



            );
    }
}

export default MovieOverview;

