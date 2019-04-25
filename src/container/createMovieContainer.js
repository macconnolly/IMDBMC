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
                            <h1 className="display-3 text-center">Create a movie!</h1>
                            <p className="lead text-center">Fill out this form to enter a new movie into our movies DB.</p>
                            <hr className="my-2" />

                            <br/>
                            <br/>
                            <MovieForm props history={this.props.history} />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(CreateMovieContainer);

