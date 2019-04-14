import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron } from 'react-bootstrap';
import MovieForm from '../components/movieForm';
import './MovieList.css';
import {connect} from 'react-redux';


class CreateMovieContainer extends Component {

    render() {
        return (
            <Jumbotron className="jumbotron-header mb-3 jumbotron">
                <h1 className="display-3">Let's Add a New Movie!</h1>
                <p className="lead">This is a simple form used to add movies to our database.</p>
                <hr className="my-2" />
                <p>This form is inconsistent with convention as it modifies state directly. Hopefully in the next version I can fix that, but for now, have fun!</p>
                <h2>Sign Up</h2>
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

