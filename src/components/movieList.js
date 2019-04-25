import React, {Component} from 'react';
import {
    CardColumns,
    Col,
    Image,
    ListGroup,
    Nav,
    Row,
    Tab,
    Modal,
    Button,
    Form,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import {fetchAllMovies, updateSelectedMovie, createReview} from '../actions/movieActions';
import {connect} from "react-redux";
import { replace, push } from 'connected-react-router'
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Cookies from 'js-cookie';



class MovieList extends Component {
    constructor(props) {

        super(props);
        if (this.props.onTitleChange)
            this.props.onTitleChange(null);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            reviewRating: 'Select rating',
            reviewBody: ''
        };
    }

    // handleSelect(key) {
    //     console.log('selected' + key);
    //     this.setState({ key: key });
    // }

    handleOnSelectRating = (eventKey, event) => {
        this.setState({
            reviewRating: eventKey
        });
        console.log('rating: ' + this.state.reviewRating);
    };

    handleOnChangeReviewBody=(event)=>
    {
        this.setState({reviewBody: event.target.value});
        console.log('review: ' + this.state.reviewBody);
    };

    handleClose() {

        let token = Cookies.get('token');


        var data = {
            reviewBody: this.state.reviewBody,
            reviewScore: this.state.reviewRating,
            movieID: this.props.selectedOption
        };
        this.props.dispatch(createReview(data, token));
        this.setState({
            show: false,
            reviewRating: 'Select rating',
            reviewBody: ''});

        this.props.dispatch(fetchAllMovies(Cookies.get('token')));

    }

    handleShow() {
        this.setState({ show: true });
    }

    componentWillMount() {

        let hash = this.props.hash.substr(2);
        let currentMovieID = this.props.selectedOption;
        console.log('hash: ' + hash);
        console.log('selectedOption: ' + currentMovieID);
        if (this.props.hash !== "" && currentMovieID === ""){
            this.props.dispatch(updateSelectedMovie(hash));
        }
        this.props.dispatch(fetchAllMovies(Cookies.get('token')));





        //
        // console.log('Component WILL MOUNT!');
        // console.log('hash: ' + this.props.hash)
        // console.log('selected option: ' + this.props.selectedOption);
        // //this.props.dispatch(fetchAllMovies(checkCookie()));
        // console.log('selected option: ' + this.props.selectedOption);


        // if(this.props.selectedOption === ""){
        //
        //     this.props.dispatch(fetchAllMovies(checkCookie()));
        //     this.props.dispatch(updateSelectedMovie(this.props.hash.substr(2)));
        // }
        // else {
        //
        //     this.props.dispatch(updateSelectedMovie(this.props.selectedOption));
        //
        // }
        //updateSelectedMovie(this.props.hash.substr(2));
        // console.log('selected option: ' + this.props.selectedOption);
        //

        //this.props.dispatch(fetchAllMovies(checkCookie()));






    }
    componentWillReceiveProps(newProps) {
        //console.log('comp will receive props: ' )



        //var newPropsObject = JSON.parse(newProps);
        //var result = newPropsObject[0];
        //console.log(JSON.parse(newProps))

    }
    shouldComponentUpdate(newProps, newState) {


        return true;
    }
    componentWillUpdate(nextProps, nextState) {

        let hash = this.props.hash.substr(2);
        let currentMovieID = this.props.selectedOption;

        if(hash === '' && currentMovieID == ''){
            let m = nextProps.movieList[0]._id
            console.log(m)
            this.handleOnChangeSelectedOption(m);
        }


        //const firstMovie = JSON.parse(nextProps.movieList[0]._id)
        //this.handleOnChangeSelectedOption(firstMovie)
        // console.log('comp will update')
        // if(this.props.selectedOption === '') {
        //     let firstMovie = nextProps.movieList[0]._id
        //     this.handleOnChangeSelectedOption(firstMovie);
        // }

    }
    componentDidUpdate(prevProps, prevState) {
        //updateSelectedMovie(prevProps.hash.substr(2))



    }
    componentWillUnmount() {
        console.log('comp will unmount')

    }

    // handleOnLoadMovies = (token) => {
    //     this.handleOnChangeSelectedOption(this.props.selectedOption || this.props.hash.substr(2));
    //     this.props.dispatch(fetchAllMovies(token));
    //
    //
    //
    // };

    componentDidMount() {


        // if(this.props.selectedOption === ""){
        //     this.props.dispatch(updateSelectedMovie(this.props.movieList[0]._id));
        // }

        // this.props.dispatch(fetchAllMovies(checkCookie()));

        //this.handleOnChangeSelectedOption(this.props.hash.substr(2))




        //this.props.dispatch(fetchAllMovies(checkCookie()));
        //this.props.dispatch(updateSelectedMovie(this.props.selectedOption));


        //this.props.dispatch(replace('/movies/#/' + this.props.selectedOption));

        //console.log('comp did mount')

        //this.props.dispatch(updateSelectedMovie(this.props.hash.substr(2)));

    }
    handleOnChangeSelectedOption = (e) => {
        console.log('value of e is ' + e);
        this.props.dispatch(updateSelectedMovie(e));
        this.props.dispatch(replace('/movies/#/' + e));

    };
    // handleOnLoadMovies = (token) => {
    //     this.props.dispatch(fetchAllMovies(token)).then((response) => {
    //         console.log('MOVIES RETURNED - UPDATE STATE' + response);
    //         this.props.dispatch(updateSelectedMovie(this.props.hash.substr(2)))
    //
    //     }).catch((error) => {
    //         console.log('ERROR')
    //     }));
    //
    // };








    render() {

        return (
            <Container className='movie-list-tabbed'>
                {/*{*/}
                    {/*(this.props.inFlight ? 'loading' : '')*/}
                {/*}*/}
                <Tab.Container id="moviestabs" defaultActiveKey='a' activeKey={this.props.selectedOption} mountOnEnter={false}  onSelect={(e) => this.handleOnChangeSelectedOption(e) } >
                    <Row>
                        <Col md={3}>
                            <Card>
                                <Card.Header>Top Rated Movies</Card.Header>
                                <Card.Body>
                            <Nav variant="pills" className="flex-column" activeKey={this.props.selectedOption}  >
                                    {
                                        this.props.movieList.map((movie, index) => (
                                        <Nav.Item key={movie._id} >
                                            <Nav.Link eventKey={movie._id}>
                                                {'#' + (index+1) + '. ' + movie.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                            </Nav>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={9} >
                            <Card body>
                            <Tab.Content>
                                {this.props.movieList.map((movie, index) => (
                                    <Tab.Pane key={movie._id} eventKey={movie._id} >
                                        <Row>
                                            <Col md={4}>
                                                <Image width={200} src={movie.imageUrl}/>
                                            </Col>

                                            <Col md="8">
                                                <Row>
                                                    <Col>
                                                    <h2>{movie.title}</h2>
                                                    <h3>Genre: {movie.genre}</h3>
                                                    <h3>Average Rating: {movie.avgRating}</h3>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                    {
                                                        movie.actors.map((actor, index) => (
                                                            <p key={actor._id}>Actor Name: {actor.actorName}, Character Name: {actor.characterName}</p>
                                                        ))
                                                    }
                                                        <>
                                                            <Button variant="primary" onClick={this.handleShow}>
                                                                    Write a review
                                                            </Button>


                                                        </>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <br/>
                                        <h3>Reviews</h3>
                                        <CardColumns>

                                        {
                                            movie.reviews.map((review, index) => (

                                                    <Card className="review-quote" key={review._id}>

                                                        <blockquote className="blockquote mb-0 review-card-body">

                                                            <p className="review">
                                                                {review.reviewBody}
                                                            </p>

                                                            <footer className="review-blockquote-footer">
                                                                <small className="text-muted">
                                                                    Overall Rating: {review.reviewScore} stars
                                                                </small>
                                                                <br/>
                                                                <small className="text-muted">
                                                                    -{review.reviewerName}
                                                                </small>
                                                            </footer>
                                                        </blockquote>
                                                    </Card>
                                            ))
                                        }
                                        </CardColumns>
                                    </Tab.Pane>

                                ))}
                            </Tab.Content>
                            </Card>
                        </Col>
                    </Row>
                </Tab.Container>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group as={Col} controlId="reviewForm.reviewBody">
                                <Form.Label>Movie Review</Form.Label>
                                <Form.Control onChange={ (e) => this.handleOnChangeReviewBody(e)} type="text" id="reviewBody" as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="reviewForm.rating">
                                <Form.Label>Rating</Form.Label>
                                <DropdownButton

                                    title={this.state.reviewRating }
                                    id="dropdown-size-medium"
                                    onSelect={ (eventKey, event) => this.handleOnSelectRating(eventKey, event) }
                                >
                                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Submit Review
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        );
    }
}


const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
    movieList: state.movie.titles,
    selectedOption: state.movie.selectedOption,
    inFlight: state.movie.inFlight,
});

export default connect(mapStateToProps)(MovieList)

// <ListGroup variant="flush">
//     {this.props.movieList.map((movie, index) => (
//             <ListGroup.Item
//                 action
//                 key={movie._id}
//                 value={movie._id}
//                 active={this.props.selectedOption === movie._id}
//                 onClick={(e) => this.handleOnChangeSelectedOption(e)}
//             >
//                 {movie.title}
//             </ListGroup.Item>
//
//         ))}
// </ListGroup>
