import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { replace, push } from 'connected-react-router'


import {connect} from "react-redux";
import {fetchAllProperties} from "../../actions/movieActions";


class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen  // navbar collapse
        });
    }
    handleClick(path){
        console.log('linkHandler')
        this.props.dispatch(replace(path))
    }

    componentWillMount() {
        console.log('nav component will mount!');
        this.props.dispatch(fetchAllProperties());
    }

    render(){
        return (
            <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
                <Button color="info" onClick={this.props.toggle}>
                    <FontAwesomeIcon icon={faAlignLeft}/>
                </Button>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem >

                            <Button onClick={() => this.handleClick('/property/create')}>Add Property</Button>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">page</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">page</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">page</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

const mapStateToProps = (state) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
