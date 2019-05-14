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
import {fetchAllProperties, updateSelectedMovie, createReview} from '../actions/movieActions';
import {connect} from "react-redux";
import { replace, push } from 'connected-react-router'
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Cookies from 'js-cookie';
import '../App.css'



class PropertyList extends Component {
    constructor(props) {

        super(props);

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

        this.props.dispatch(fetchAllProperties());

    }

    handleShow() {
        this.setState({ show: true });
    }

    componentWillMount() {


        let hash = this.props.hash.substr(2);
        let currentPropertyID = this.props.selectedOption;
        console.log('hash: ' + hash);
        console.log('selectedOption: ' + currentPropertyID);
        if (this.props.hash !== "" && currentPropertyID === ""){
            this.props.dispatch(updateSelectedMovie(hash));
        }

        this.props.dispatch(fetchAllProperties());



        console.log('comp will mount')
        console.log(this.props);

        //
        // console.log('Component WILL MOUNT!');
        // console.log('hash: ' + this.props.hash)
        // console.log('selected option: ' + this.props.selectedOption);
        // //this.props.dispatch(fetchAllProperties(checkCookie()));
        // console.log('selected option: ' + this.props.selectedOption);


        // if(this.props.selectedOption === ""){
        //
        //     this.props.dispatch(fetchAllProperties(checkCookie()));
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

        //this.props.dispatch(fetchAllProperties(checkCookie()));






    }
    componentWillReceiveProps(newProps) {
        //console.log('comp will receive props: ' )
        console.log('willReceiveProps')
        console.log(newProps)

        //var newPropsObject = JSON.parse(newProps);
        //var result = newPropsObject[0];
        //console.log(JSON.parse(newProps))



    }

    componentWillUpdate(nextProps, nextState) {
        console.log('comp will update')
        console.log(nextProps)

        //this.handleOnChangeSelectedOption(this.props.hash.substr(2))
        // if(this.props.selectedOption === ""){
        //     this.props.dispatch(updateSelectedMovie(nextProps.propertyList.titles[0]._id));
        // }


        let hash = this.props.hash.substr(2);
        let currentPropertyID = this.props.selectedOption;

        if(hash === '' && currentPropertyID == ''){
            let m = nextProps.propertyList.titles[0]._id
            console.log(m)
            this.handleOnChangeSelectedOption(m);
        }

        //const firstMovie = JSON.parse(nextProps.propertyList[0]._id)
        //this.handleOnChangeSelectedOption(firstMovie)
        // console.log('comp will update')
        // if(this.props.selectedOption === '') {
        //     let firstMovie = nextProps.propertyList[0]._id
        //     this.handleOnChangeSelectedOption(firstMovie);
        // }

    }
    componentDidUpdate(prevProps, prevState) {
        // updateSelectedMovie(prevProps.hash.substr(2))
        // console.log('new debug')




    }
    componentWillUnmount() {
        console.log('comp will unmount')
        console.log(this.props)

    }

    // handleOnLoadMovies = (token) => {
    //     this.handleOnChangeSelectedOption(this.props.selectedOption || this.props.hash.substr(2));
    //     this.props.dispatch(fetchAllProperties(token));
    //
    //
    //
    // };

    componentDidMount() {



        console.log('comp did mount')
        // console.log(this.props);
        // this.props.dispatch(fetchAllProperties());
        //
        // let hash = this.props.hash.substr(2);
        // let currentPropertyID = this.props.selectedOption;
        //
        // if(hash === '' && currentPropertyID == ''){
        //     let m = this.propertyList.titles[0]._id
        //     console.log(m)
        //     this.handleOnChangeSelectedOption(m);
        // }

        //this.props.dispatch(fetchAllProperties(checkCookie()));
        //this.props.dispatch(updateSelectedMovie(this.props.selectedOption));


        //this.props.dispatch(replace('/movies/#/' + this.props.selectedOption));

        //console.log('comp did mount')

        //this.props.dispatch(updateSelectedMovie(this.props.hash.substr(2)));

    }
    handleOnChangeSelectedOption = (e) => {
        console.log('value of e is ' + e);
        this.props.dispatch(updateSelectedMovie(e));
        this.props.dispatch(replace('/properties/#/' + e));

    };
    // handleOnLoadMovies = (token) => {
    //     this.props.dispatch(fetchAllProperties(token)).then((response) => {
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
                        {/*<Col md={3}>*/}
                            {/*<Card>*/}
                                {/*<Card.Header>Top Rated Movies</Card.Header>*/}
                                {/*<Card.Body>*/}
                            {/*<Nav variant="pills" className="flex-column" activeKey={this.props.selectedOption}  >*/}
                                    {/*{*/}
                                        {/*this.props.propertyList.titles.map((property, index) => (*/}
                                        {/*<Nav.Item key={property._id} >*/}
                                            {/*<Nav.Link eventKey={property._id}>*/}
                                                {/*{'#' + (index+1) + '. ' + property.name}*/}
                                            {/*</Nav.Link>*/}
                                        {/*</Nav.Item>*/}
                                    {/*))}*/}
                            {/*</Nav>*/}
                                {/*</Card.Body>*/}
                            {/*</Card>*/}
                        {/*</Col>*/}
                        <Col md={9} >
                            <Card body>
                            <Tab.Content>
                                {this.props.propertyList.titles.map((property, index) => (
                                    <Tab.Pane key={property._id} eventKey={property._id} >
                                        <Row>


                                            <Col md="8">
                                                <Row>
                                                    <Col>
                                                    <h2>{property.name}</h2>
                                                        <p>{property.address}. </p>
                                                        <p>{property.city}, {property.state} {property.zip}</p>

                                                    </Col>
                                                </Row>
                                                <br/>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                    {
                                                        property.cleanings.map((property, index) => (
                                                            <div key={property._id}>

                                                                <p>Date: {new Date(property.start).toDateString()} </p>
                                                                <p>Deadline: {new Date(property.end).toDateString()}</p>
                                                                <p >Status: {property.cleaned ? "Clean" : "Not Clean"}</p>
                                                                <hr />
                                                                <br />

                                                            </div>

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

                                        {/*{*/}
                                            {/*movie.reviews.map((review, index) => (*/}

                                                    {/*<Card className="review-quote" key={review._id}>*/}

                                                        {/*<blockquote className="blockquote mb-0 review-card-body">*/}

                                                            {/*<p className="review">*/}
                                                                {/*{review.reviewBody}*/}
                                                            {/*</p>*/}

                                                            {/*<footer className="review-blockquote-footer">*/}
                                                                {/*<small className="text-muted">*/}
                                                                    {/*Overall Rating: {review.reviewScore} stars*/}
                                                                {/*</small>*/}
                                                                {/*<br/>*/}
                                                                {/*<small className="text-muted">*/}
                                                                    {/*-{review.reviewerName}*/}
                                                                {/*</small>*/}
                                                            {/*</footer>*/}
                                                        {/*</blockquote>*/}
                                                    {/*</Card>*/}
                                            {/*))*/}
                                        {/*}*/}
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
    propertyList: state.property,
    selectedOption: state.property.selectedOption,
    inFlight: state.property.inFlight,
});

export default connect(mapStateToProps)(PropertyList)


