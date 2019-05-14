import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron } from 'react-bootstrap';
import MovieForm from '../components/propertyForm';
import './PropertyList.css';
import {connect} from 'react-redux';


class CreateMovieContainer extends Component {

    render() {
        return (
            <Jumbotron className="jumbotron-header mb-3 jumbotron">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-3 text-center">Property Details</h1>
                            <p className="lead text-center">Please enter the property details below and then select save.</p>
                            <hr className="my-2" />
                            <br/>
                            <br/>
                            <MovieForm dispatch={this.props.dispatch} history={this.props.history} />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(CreateMovieContainer);

