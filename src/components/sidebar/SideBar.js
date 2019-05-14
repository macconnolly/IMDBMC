import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';
import { NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import {connect} from "react-redux";
import { Nav, Dropdown } from 'react-bootstrap';
import {replace} from "connected-react-router";
import {Link} from "react-router-dom";

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path){
        console.log('linkHandler')
        this.props.dispatch(replace(path))
    }

    render() {
        return (
            <div className={classNames('sidebar', {'is-open': this.props.isOpen})}>
                <div className="sidebar-header">
                    <a color="info" onClick={this.props.toggle} style={{color: '#fff'}}>&times;</a>
                    <h3 onClick={() => this.handleClick('/')}><a href='#'>Air Cleanings</a></h3>
                </div>
                <Nav  className="list-unstyled pb-3 flex-column" activeKey={this.props.selectedOption}>

                    <SubMenu title="Properties" icon={faHome} items={this.props.propertyList.titles} />

                    <NavItem>
                        <NavLink href="#"><FontAwesomeIcon icon={faBriefcase} className="mr-2"/>About</NavLink>
                    </NavItem>
                    <SubMenu title="Pages" icon={faCopy} items={this.props.propertyList.titles}/>
                    <NavItem>
                        <NavLink href="#"><FontAwesomeIcon icon={faImage} className="mr-2"/>Portfolio</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><FontAwesomeIcon icon={faQuestion} className="mr-2"/>FAQ</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><FontAwesomeIcon icon={faPaperPlane} className="mr-2"/>Contact</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    propertyList: state.property,
    selectedOption: state.property.selectedOption,
});

export default connect(mapStateToProps)(SideBar)
