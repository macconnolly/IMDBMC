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
    Dropdown,
    Table
} from 'react-bootstrap';
import {fetchAllProperties, updateSelectedMovie, createReview} from '../actions/movieActions';
import {connect} from "react-redux";
import { replace, push } from 'connected-react-router'
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Cookies from 'js-cookie';
import '../App.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';





class CleanerDetail extends Component {
    constructor(props) {

        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.getProperties = this.getProperties.bind(this);
        this.getAllCleaners = this.getAllCleaners.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.lookupProperty = this.lookupProperty.bind(this);
        this.toggleBox = this.toggleBox.bind(this);
        const products = [];
        const columns = [{
            dataField: 'propertyName',
            text: 'Name'
        }, {
            dataField: 'startDate',
            text: 'Start'
        }, {
            dataField: 'endDate',
            text: 'Deadline'
        }, {
            dataField: 'cleaned',
            text: 'Status',
            editor: {
                type: Type.CHECKBOX,
                value: 'true:false'
            }
        }];
        this.state = {
            show: false,
            reviewRating: 'Select rating',
            reviewBody: '',
            cleanings: [],
            columns: columns,
            isOpened: false
        };
    }

    // handleSelect(key) {
    //     console.log('selected' + key);
    //     this.setState({ key: key });
    // }

    toggleBox() {
        this.setState(oldState => ({ isOpened: !oldState.isOpened }));
    }

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

    lookupProperty(id){

        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        let property = {}
        fetch(`http://localhost:8080/properties/${id}`, parameters)
            .then(response => {
                console.log('properties fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('properties fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log('this is my ref' + json.properties)
                property = json.properties;
                return json;
            });
        console.log('property' + property)
        console.log(property)
        return property

    }
    componentWillMount() {

        let hash = this.props.hash.substr(2);
        let currentCleanerID = hash;
        console.log('hash: ' + hash);
        console.log('selectedOption: ' + currentCleanerID);

        // if (this.props.hash !== "" && currentCleanerID === ""){
        //     this.props.dispatch(updateSelectedMovie(hash));
        // }

        // this.props.dispatch(fetchAllProperties());




        this.getAllCleanings();
        this.getAllProperties();
        this.getAllCleaners();
        this.getCurrentCleanerInfo();
        this.getFutureCleanings();


        console.log('comp will mount cleanerdetail')
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

    getCurrentDate(separator){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    getAllCleanings(){
        let hash = this.props.hash.substr(2);
        let currentCleanerID = hash;

//?start=${this.getCurrentDate('-')}&end=${this.getCurrentDate('-')}
        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        return fetch(`http://localhost:8080/cleaners/${currentCleanerID}/cleanings?start=${this.getCurrentDate('-')}&end=${this.getCurrentDate('-')}`, parameters)
            .then(response => {
                console.log('cleaners fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('cleaners fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log(data.cleaners);
                this.setState({
                    "cleanings": data.cleanings,
                    "cleanerID": currentCleanerID,

                });

                return json;
            });
    }

    getFutureCleanings(){
        let hash = this.props.hash.substr(2);
        let currentCleanerID = hash;

//?start=${this.getCurrentDate('-')}&end=${this.getCurrentDate('-')}
        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        return fetch(`http://localhost:8080/cleaners/${currentCleanerID}/cleanings?start=${this.getCurrentDate('-')}`, parameters)
            .then(response => {
                console.log('cleaners fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('cleaners fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log(data.cleaners);
                this.setState({
                    "futureCleanings": data.cleanings

                });

                return json;
            });
    }

    getAllProperties(){

        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        return fetch(`http://localhost:8080/properties?cleanings=true`, parameters)
            .then(response => {
                console.log('properties fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('cleaners fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log(data.cleaners);
                this.setState({
                    "properties": data.properties
                });
                return json;
            });
    }

    getAllCleaners(){
        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        return fetch('http://localhost:8080/cleaners', parameters)
            .then(response => {
                console.log('property fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('property fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log(data.cleaners);
                this.setState({
                    "cleaners": data.cleaners
                });
                return json;
            });
    }

    getCurrentCleanerInfo(){
        let hash = this.props.hash.substr(2);
        let currentCleanerID = hash;

        const parameters = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'
            }};
        return fetch(`http://localhost:8080/cleaners/${currentCleanerID}`, parameters)
            .then(response => {
                console.log('property fetch callback json first response: ' + JSON.stringify(response));
                return response.json();
            })
            .then(json => {
                console.log('property fetch callback json response' + JSON.stringify(json));
                let data = JSON.parse(JSON.stringify(json));
                console.log(data.cleaners);
                this.setState({
                    "currentCleaner": data.cleaners[0]
                });
                return json;
            });
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

    getProperties(){
        // // if (this.state.cleanings !== undefined && this.state.properties !== undefined) {
        // //
        // //
        // //     let newCleanings = this.state.cleanings.map(obj=> (
        // //         { ...obj, propertyName: this.state.properties.find( property => property._id === obj.property ).name }
        // //     ));
        // //     newCleanings = newCleanings.map(obj=> (
        // //         { ...obj, endDate: new Date(obj.end).toLocaleDateString() }
        // //     ));
        // //     newCleanings = newCleanings.map(obj=> (
        // //         { ...obj, startDate: new Date(obj.start).toLocaleDateString() }
        // //     ));
        // //
        // //
        // //
        // //     return newCleanings;
        //
        // }
        // else
        //     return []

    }

    componentDidMount() {



        console.log('comp did mount state');
        console.log(this.state);
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
                <Tab.Container id="moviestabs" defaultActiveKey='a' activeKey={this.props.selectedOption}
                               mountOnEnter={false} onSelect={(e) => this.handleOnChangeSelectedOption(e)}>
                    <Row>
                        <Col md={9}>
                            {(this.state.currentCleaner && this.state.cleanings && this.state.cleaners) &&
                            <div>
                            <h3>Hi {this.state.currentCleaner.name}!</h3>

                                <h4> You have {this.state.cleanings.length} {this.state.cleanings.length === 1 ? 'property' : 'properties'} to clean today</h4>
                            </div>
                            }


                                {(this.state.cleanings && this.state.properties && this.state.cleaners) &&
                                this.state.cleanings.map((cleaning, index) => (
                                    <>
                                    <Card body>

                                        <p><strong>Name:</strong> {this.state.properties.find(property => property._id === cleaning.property).name}</p>
                                        <p><strong>Address:</strong> {this.state.properties.find(property => property._id === cleaning.property).address}</p>
                                        <p><strong>Date to Clean:</strong> {new Date(cleaning.start).toLocaleDateString()}</p>
                                        <p><strong>Latest Cleaning Deadline:</strong> {new Date(cleaning.end).toLocaleDateString()}</p>
                                        <p><strong>Current Status:</strong> {cleaning.cleaned ? 'Clean' : 'Not Clean'}</p>


                                    </Card>
                                    <br/>

                                    </>

                                ))
                                }
                                <br/>
                            <Button type='primary' className="boxTitle" onClick={this.toggleBox}>
                                Show/Hide Future Cleanings
                            </Button>
                            <br/>
                            <br/>
                            {(this.state.futureCleanings && this.state.properties && this.state.cleaners && this.state.isOpened) &&
                            this.state.futureCleanings.map((cleaning, index) => (
                                <div>
                                    <Card body>

                                        <p><strong>Name:</strong> {this.state.properties.find(property => property._id === cleaning.property).name}</p>
                                        <p><strong>Address:</strong> {this.state.properties.find(property => property._id === cleaning.property).address}</p>
                                        <p><strong>Date to Clean:</strong> {new Date(cleaning.start).toLocaleDateString()}</p>
                                        <p><strong>Latest Cleaning Deadline:</strong> {new Date(cleaning.end).toLocaleDateString()}</p>
                                        <p><strong>Current Status:</strong> {cleaning.cleaned ? 'Clean' : 'Not Clean'}</p>


                                    </Card>
                                    <br/>

                                </div>

                            ))
                            }
                                {/*{ this.state.cleanings &&*/}
                                {/*<BootstrapTable keyField='_id' data={ this.getProperties() } columns={ this.state.columns } cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) } />*/}
                                {/*}*/}



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
                                <Form.Control onChange={(e) => this.handleOnChangeReviewBody(e)} type="text"
                                              id="reviewBody" as="textarea" rows="3"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="reviewForm.rating">
                                <Form.Label>Rating</Form.Label>
                                <DropdownButton

                                    title={this.state.reviewRating}
                                    id="dropdown-size-medium"
                                    onSelect={(eventKey, event) => this.handleOnSelectRating(eventKey, event)}
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

export default connect(mapStateToProps)(CleanerDetail)


