import React from 'react';
import  { Collapse, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {updateSelectedMovie} from "../../actions/movieActions";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";
import '../../App.css'


class SubMenu extends React.Component {
    constructor(props) {
        super(props);


        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true

        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleOnChangeSelectedOption = (e) => {
        console.log('value of e is ' + e);
        console.log(e)
        console.log(e.toString())
        this.props.dispatch(updateSelectedMovie(e));
        this.props.dispatch(replace('/properties/#/' + e));

    };

    render() {
        const { icon, title, items } = this.props;
        return (
            <div>

                <Nav.Item onClick={this.toggleNavbar} className={classNames({'menu-open': !this.state.collapsed})}>
                    <Nav.Link className="dropdown-toggle" href="#"><FontAwesomeIcon icon={icon} className="mr-2"/>{title}</Nav.Link>
                </Nav.Item>
                <Collapse isOpen={!this.state.collapsed} navbar className={classNames('items-menu',{'mb-1': !this.state.collapsed})}>
                    {items.map(item => (
                        <Nav.Item key={item._id} className="pl-4">
                            <Nav.Link eventKey={item._id} key={item._id} onSelect={(e) => this.handleOnChangeSelectedOption(e) }> {item.name}</Nav.Link >
                        </Nav.Item>
                    ))}
                </Collapse>
            </div>
        );
    }
}


// const mapDispatchToProps = (dispatch) => {
// //     return {
// //         updateProperty: (e) => dispatch(updateSelectedMovie(e)),
// //     };
// // };
const mapDispatchToProps = (dispatch) => ({
    dispatch
});

const mapStateToProps = (state) => {
    return {
        selectedOption: state.property.selectedOption,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
