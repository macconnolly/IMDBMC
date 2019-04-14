import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonToolbar } from 'reactstrap';
import axios from 'axios';

class DashboardPage extends Component {
    state = {genre: null};
    constructor(props) {
        super(props);
        if(this.props.onTitleChange)
            this.props.onTitleChange(null);
        this.toggle = this.toggle.bind(this);

        this.state = {genre:'Select Genre',rating:1,title: '',actor1:'',actor2:'',actor3:'',releaseDate:'', dropdownOpen: false};

    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    handleOnSelectGenre = (event) => {
        let id = event.currentTarget.getAttribute("id");
        console.log(id);
        this.setState({
            genre: event.currentTarget.textContent
        });
        this.toggle();
    };
    handleOnSelectRating = (event) => {
        this.setState({
            rating: event.currentTarget.getAttribute("id")
        });
        console.log(this.state.rating);
        this.toggle();
    };
    handleOnSave=(event)=>
    {
        var actors=[
            {actorName:this.state.actor1,characterName:'character one'},
            {actorName:this.state.actor2,characterName:'character two'},
            {actorName:this.state.actor3,characterName:'character three'}];

        var json = {
            title: this.state.title,
            actors: actors,
            genre:this.state.genre,
            imageUrl: 'http://www.imdb.com/title/tt3896198/mediaviewer/rm911094272?ref_=tt_ov_i',
            releaseDate: 1979
        };
        console.log(json);
        var headers = {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjdmODhkMWUyYTIyMDAwNDE5MzE2MSIsInVzZXJuYW1lIjoiZ2Ftb3JhNTUiLCJpYXQiOjE1NTQ3NzE3NDR9.3p8CwLFxhdq0_3iQ9JskekJfyPk2eVQRNTmh3u2BjgE',
            'Content-Type': 'application/json'
        };
        axios.post('https://hw5reactmovies.herokuapp.com/movies', JSON.stringify(json), {'headers':headers})

            .then((response) => {
                //todo: update with you movieid
                //this.props.onTitleChange(response._id);
            })
            .catch((error) => {
                console.log('ERROR')
            })
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
    render() {
        return (
            <div>


                <div className="actorbox">
                    <ButtonDropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                        title="Genre..."
                        id="dropdown-size-medium"
                        onSelect={ (eventkey,event) => this.handleOnSelectGenre(eventkey,event) }
                    >
                        <DropdownToggle color="primary" caret>
                            {this.state.genre}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem key="1" id="1" onClick={this.changeValue}>Comedy</DropdownItem>
                            <DropdownItem key="2" id="2" >Drama</DropdownItem>
                            <DropdownItem key="3" id="3" >Fantasy</DropdownItem>
                            <DropdownItem key="4" id="4" >Horror</DropdownItem>
                            <DropdownItem key="5" id="5" >Mystery</DropdownItem>
                            <DropdownItem key="6" id="6" >Thriller</DropdownItem>
                            <DropdownItem key="7" id="7" >Western</DropdownItem>
                            <DropdownItem key="8" id="8" >Science Fiction</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <div className="actorbox">
                    <ButtonToolbar>
                        <ButtonDropdown
                            bsSize="sm"
                            title="Rating..."
                            id="dropdown-size-medium"
                            onSelect={ (eventKey,event) => this.handleOnSelectRating(eventKey,event) }
                        >
                            <DropdownToggle caret>
                                Movie Rating
                            </DropdownToggle>
                            <DropdownItem eventKey="1">1</DropdownItem>
                            <DropdownItem eventKey="2">2</DropdownItem>
                            <DropdownItem eventKey="3">3</DropdownItem>
                            <DropdownItem eventKey="4">4</DropdownItem>
                            <DropdownItem eventKey="5">5</DropdownItem>
                        </ButtonDropdown>
                    </ButtonToolbar>
                </div>

                <div className="row actorbox">
                    <div className="actorlabel">Movie Title</div>
                    <input onChange={ (e) => this.handleOnChangeTitle(e)} type="text" id="movietitle" name="movietitle" className="form-control actorinput" placeholder="required..."></input>
                </div>
                <div className="row actorbox">
                    <div className="actorlabel">Actor 1</div>
                    <input onChange={ (e) => this.handleOnChangeActor1(e)}  type="text" id="actor1" name="actor1" className="form-control actorinput" placeholder="required..."></input>
                </div>
                <div className="row actorbox">
                    <div className="actorlabel">Actor 2</div>
                    <input onChange={ (e) => this.handleOnChangeActor2(e)} ype="text" id="actor2" name="actor2" className="form-control actorinput" placeholder="required..."></input>
                </div>
                <div className="row actorbox">
                    <div className="actorlabel">Actor 3</div>
                    <input onChange={ (e) => this.handleOnChangeActor3(e)} type="text" id="actor3" name="actor3" className="form-control actorinput" placeholder="required..."></input>
                </div>
                <div className="row actorbox">
                    <div className="actorlabel">Release Year</div>
                    <input onChange={ (e) => this.handleOnChangeReleaseDate(e)} type="text" id="releasedate" name="releasedate" className="form-control actorinput" placeholder="required..."></input>
                </div>
                <div>
                    <button type="button" onClick={ (e) => this.handleOnSave(e)}>Save</button>
                </div>
            </div>);
    }
}

export default DashboardPage;