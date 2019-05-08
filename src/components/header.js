import React, { Component } from 'react';
import {Link, Router} from 'react-router-dom';
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
//import SideBar from "../index";
import SideBar from './sidebar/SideBar';
import Content from './content/Content';
import '../App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };

    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };


    render() {
        return (
                <div>asdf</div>


        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(Header);
