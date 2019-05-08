import React, { Component } from 'react';
import {ButtonToolbar, DropdownButton, Dropdown, Form, Col, Button} from 'react-bootstrap';
import {withRouter} from 'react-router'

import {connect} from "react-redux";
import { push } from 'connected-react-router'
import {createProperty, createPropertySuccess} from "../actions/propertyActions";




class PropertyForm extends Component {


  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      "cleaners": [],
      dropdownOpen: false,
      value : "Select Assigned Cleaner",
      'name': '',
      'address': '',
      'city': '',
      'state': '',
      'zip': '',
      'cleaner': '',
      'calendar': '',
      validate: {
        emailState: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleDropdownChange = (e) => {
    console.log('event key');
    console.log(e);
    this.setState({
      cleaner: e
    })

    //console.log(e.target.value.toLowerCase().trim())
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { id } = target;
    await this.setState({
      [ id ]: value,
    });
  };



  onHandleSave = (event) => {
    event.preventDefault();
    let data = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      cleaner: this.state.cleaner,
      calendar:this.state.calendar
    };
    console.log(data);

    this.props.onSubmit(data);
    this.props.dispatch(createProperty(data));

    console.log('form dispatched create new property action')
  };

  componentWillMount() {

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

  render() {
    let redirect = this.props.createProperty.property.createRedirect;
    if(redirect){
      this.props.history.push('/movies');
      this.props.dispatch(push('/movies'));
      this.props.dispatch(createPropertySuccess());

    }
    return (
        <div>

            <Form.Label><h4>Property Information</h4></Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Property Name</Form.Label>
                <Form.Control onChange={ (e) => this.handleChange(e)} type="text" id="name" name="name" className="form-control" placeholder="Bonnie Brae"/>
              </Form.Group>
            </Form.Row>
            <br/>

            <Form.Group controlId="Address">
            <Form.Label><h4>Location</h4></Form.Label>
            <br/>
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={ (e) => this.handleChange(e)}  type="text" id="address" placeholder="1817 S Grant St." />
            </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={ (e) => this.handleChange(e)}  type="text" id="city"  placeholder="Denver" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>State</Form.Label>
              <Form.Control onChange={ (e) => this.handleChange(e)}  type="text" id="state"  placeholder="Denver" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={ (e) => this.handleChange(e)}  type="text" id="zip"  placeholder="80210" />
            </Form.Group>
          </Form.Row>
          <br />

          <Form.Label><h4>Property Data Info</h4></Form.Label>
          <br />

          <Form.Row>
            <Form.Group as={Col} controlId="cleanerID">
              <Form.Label>Calendar URL</Form.Label>
              <Form.Control onChange={ (e) => this.handleChange(e)} type="text" id="calendar" name="calendar" className="form-control" placeholder="required"/>
            </Form.Group>
            <Form.Group  as={Col} controlId="cleanerID">
              <Form.Label>Calendar URL</Form.Label>

              <DropdownButton
                  onSelect={(event) => this.handleDropdownChange(event)}
                  onChange={(event) => this.handleDropdownChange(event)}
                  variant="outline-primary"
                  size="md"
                  title={this.state.value}
                  id="category-dropdown"
                  // toggle={this.toggle}
                  >

                {this.state.cleaners.map((cleaner, i) =>
                    <Dropdown.Item  key={i} eventKey={cleaner._id} onClick={this.select}>{cleaner.name}</Dropdown.Item>)
                }
              </DropdownButton>
            </Form.Group>
          </Form.Row>
          <br />

            <Button variant="primary" onClick={ (e) => this.onHandleSave(e)} type="submit">
              Save
            </Button>



        </div>);
  }
}

const mapStateToProps = (createProperty) => ({createProperty});
const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(createProperty(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm);

