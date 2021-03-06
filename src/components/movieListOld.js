import React, { Component } from 'react';
import axios from "axios/index";
import { ListGroup } from 'react-bootstrap';

class MovieList extends Component {

    state = {selectedOption: null, propertyList: []};

    constructor(props) {
        console.log('CONSTRUCTOR!')
        super(props);
        if (this.props.onTitleChange)
            this.props.onTitleChange(null);

    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
        this.handleOnLoadMovies();
    }
    handleOnLoadMovies = () => {
        console.log('LOAD MOVIES');
        var headers={'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjdmODhkMWUyYTIyMDAwNDE5MzE2MSIsInVzZXJuYW1lIjoiZ2Ftb3JhNTUiLCJpYXQiOjE1NTQ3NzE3NDR9.3p8CwLFxhdq0_3iQ9JskekJfyPk2eVQRNTmh3u2BjgE','Content-Type': 'application/json'};
        axios.get('https://hw5reactmovies.herokuapp.com/movies', {'headers':headers})

            .then((response) => {
                console.log('MOVIES RETURNED - UPDATE STATE');
                //const propertyList = response.data.map(property => property.title);
                this.setState({
                    propertyList: response.data
                });
            })
            .catch((error) => {
                console.log('ERROR')
            })
    }
    handleOnChange = (e) => {
        console.log(e.target)
        this.setState({
            selectedOption: e.target.value
        });
        if (this.props.onTitleChange)
            this.props.onTitleChange(e.target.value);
    };

    render() {
        return (
            <div className='movie-list'>

                <div>
                    <ListGroup variant="flush">
                        {this.state.propertyList.map((movie, index) => (
                            <ListGroup.Item
                                action
                                key={movie._id}
                                value={movie._id}
                                active={this.state.selectedOption === movie._id ? true : false}
                                onClick={(e) => this.handleOnChange(e)}
                            >
                                {movie.title}
                            </ListGroup.Item>

                        ))}
                    </ListGroup>

                </div>
            </div>
        );
    }
}


export default MovieList
