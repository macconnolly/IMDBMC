import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import Cookies from 'js-cookie';
import {connect} from "react-redux";
import {logoutUserAction} from '../actions/authenticationActions';

class MoviePage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    logout(){
        console.log('removed token');
        Cookies.remove('token');

        this.props.dispatch(logoutUserAction);

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">MC IMDB</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            {
                                this.props.state.movie.loggedIn ?
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/movies" activeClassName="active">Movie List</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/movie/create" activeClassName="active">New Movie</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/#" activeClassName="active" onClick={this.logout}>Logout</NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink}  to="/login" activeClassName="active">Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/register" activeClassName="active">Register</NavLink>
                                        </NavItem>
                                    </>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(MoviePage);