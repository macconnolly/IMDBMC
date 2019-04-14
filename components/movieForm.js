import React, { Component } from 'react';
import {ButtonToolbar,DropdownButton, Dropdown, Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {connect} from "react-redux";
import {createNewMovieAction} from "../actions/movieActions";
import {checkCookie} from '../utils/cookies';

class MovieForm extends Component {

  constructor(props) {
    super(props);
    if(this.props.onTitleChange)
      this.props.onTitleChange(null);

    this.state = {genre:'Select Genre',rating:'Select Rating',title: '',actor1:'',actor2:'',actor3:'',releaseDate:''};

  }
  handleOnSelectGenre = (eventKey,event) => {
    this.setState({
      genre: event.target.text
    });
  }
  handleOnSelectRating = (eventKey,event) => {
    this.setState({
      rating: eventKey
    });
    console.log(this.state.rating);
  }
  onHandleSave = (event) => {

    event.preventDefault();

    // var actors=[
    //   {actorName:this.state.actor1,characterName:'character one'},
    //   {actorName:this.state.actor2,characterName:'character two'},
    //   {actorName:this.state.actor3,characterName:'character three'}];
    //
    // var data = {
    //   title: this.state.title,
    //   actors: actors,
    //   genre:this.state.genre,
    //   imageUrl: 'http://www.imdb.com/title/tt3896198/mediaviewer/rm911094272?ref_=tt_ov_i',
    //   releaseDate: this.state.releaseDate
    // };

    var actors=[
    {actorName:'jack',characterName:'character one'},
    {actorName:'jill',characterName:'character two'},
    {actorName:'jim',characterName:'character three'}];

    var data = {
      title: 'test title movie',
      actors: actors,
      genre:'Horror',
      imageUrl: 'http://www.imdb.com/title/tt3896198/mediaviewer/rm911094272?ref_=tt_ov_i',
      releaseDate: '2019',

    };
    console.log(data);
    let token = checkCookie();
    this.props.dispatch(createNewMovieAction(data, token));

    console.log('sent create new movie action')
  }
  handleOnChangeTitle=(event)=>
  {
    this.setState({title: event.target.value});
  }
  handleOnChangeReleaseDate=(event)=>
  {
    this.setState({releaseDate: event.target.value});
  }
  handleOnChangeActor1=(event)=>
  {
    this.setState({actor1: event.target.value});
  }
  handleOnChangeActor2=(event)=>
  {
    this.setState({actor2: event.target.value});
  }
  handleOnChangeActor3=(event)=>
  {
    this.setState({actor3: event.target.value});
  }
  handleOnChangeImageUrl=(event)=>
  {
    this.setState({actor3: event.target.value});
  }
  render() {
    return (
        <div>

            <Form.Label><h4>Movie Info</h4></Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control onChange={ (e) => this.handleOnChangeTitle(e)} type="text" id="movietitle" name="movietitle" className="form-control actorinput" placeholder="required..."/>
              </Form.Group>

            </Form.Row>
            <br/>
            <Form.Label><h4>Categorization</h4></Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <Form.Label>Genre</Form.Label>
                <DropdownButton

                    title={this.state.genre}
                    id="dropdown-size-large"
                    onSelect={ (eventKey,event) => this.handleOnSelectGenre(eventKey,event) }
                >
                  <Dropdown.Item eventKey="1">Comedy</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Drama</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Fantasy</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Horror</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Mystery</Dropdown.Item>
                  <Dropdown.Item eventKey="6">Thriller</Dropdown.Item>
                  <Dropdown.Item eventKey="7">Western</Dropdown.Item>
                  <Dropdown.Item eventKey="8">Science Fiction</Dropdown.Item>
                </DropdownButton>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Rating</Form.Label>
                <DropdownButton

                    title={this.state.rating}
                    id="dropdown-size-medium"
                    onSelect={ (eventKey,event) => this.handleOnSelectRating(eventKey,event) }
                >
                  <Dropdown.Item eventKey="1">1</Dropdown.Item>
                  <Dropdown.Item eventKey="2">2</Dropdown.Item>
                  <Dropdown.Item eventKey="3">3</Dropdown.Item>
                  <Dropdown.Item eventKey="4">4</Dropdown.Item>
                  <Dropdown.Item eventKey="5">5</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Year Released</Form.Label>
                <Form.Control onChange={ (e) => this.handleOnChangeReleaseDate(e)}  type="text" id="releaseDate" placeholder="2019" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Image URL</Form.Label>
                <Form.Control onChange={ (e) => this.handleOnChangeImageUrl(e)}  type="text" id="imageUrl" placeholder="URL" />
              </Form.Group>

            </Form.Row>
            <br/>
            <Form.Label><h4>Actors</h4></Form.Label>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Actor 1</Form.Label>
              <Form.Control onChange={ (e) => this.handleOnChangeActor1(e)}  type="text" id="actor1" placeholder="John Smith" />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Actor 1</Form.Label>
              <Form.Control onChange={ (e) => this.handleOnChangeActor2(e)}  type="text" id="actor2"  placeholder="John Smith" />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Actor 1</Form.Label>
              <Form.Control onChange={ (e) => this.handleOnChangeActor3(e)}  type="text" id="actor3"  placeholder="John Smith" />
            </Form.Group>

            <Button variant="primary" onClick={ (e) => this.onHandleSave(e)}>
              Save
            </Button>

        </div>);
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(MovieForm);

