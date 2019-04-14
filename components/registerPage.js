import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Col, Row} from 'reactstrap';
import { registerUserAction } from '../actions/authenticationActions';

class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    this.props.dispatch(registerUserAction(data));

  }

  render() {
    let message, isSuccess;

    if (this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }
    
    return (
      <div>
        <h3>RegisterPage</h3>
        {!isSuccess ? <div>{message}</div> : <Redirect to='login' />}
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Jumbotron className="Register">
          <h2>Sign Up</h2>
          <Form className="form" onSubmit={this.onHandleRegistration}>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                />
              </FormGroup>
            </Col>
            <Col>
            <Button>Register</Button>
            </Col>
          </Form>
          <br/>
          <Col>
            Already have account? <Link to='login'>Login here</Link>
          </Col>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
