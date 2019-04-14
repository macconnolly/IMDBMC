import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron } from 'react-bootstrap';
import MovieForm from '../components/movieForm';
import './MovieList.css';
import {connect} from 'react-redux';


class CreateMovieContainer extends Component {

    render() {
        return (
            <Jumbotron className="jumbotron-header mb-3 jumbotron">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-3 text-center">Hello, world!</h1>
                            <p className="lead text-center">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-2" />
                            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                            <MovieForm/>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(CreateMovieContainer);

