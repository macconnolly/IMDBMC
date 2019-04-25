import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Container, Button, Form, FormGroup, Label, Input, FormText, Jumbotron, Col, Row} from 'reactstrap';
import { loginUserAction } from '../actions/authenticationActions';


class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if(Cookies.get('token') !== undefined){
      this.props.history.push('/movies');
    }

  }
  componentWillReceiveProps(newProps) {

  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {

  }
  componentDidUpdate(prevProps, prevState) {
  }
  componentWillUnmount() {
  }
  componentDidMount() {

  }

  onHandleLogin = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;

    const data = {
      username, password
    };

    this.props.dispatch(loginUserAction(data));
  };

  render() {
    let isSuccess, message;

    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.success;
      message = this.props.response.login.response.message;

      if (isSuccess) {
        Cookies.set('token', this.props.response.login.response.token, {expires: 1});
        console.log('Setting token cookie');
        console.log(Cookies.get());
        this.props.history.push('/movies')

      }
    }

    return (

        <div>
          <br/>
          <br/>

    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Jumbotron className="Register">
          <h2>Sign Up</h2>
          <Form className="loginForm" onSubmit={this.onHandleLogin}>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your Username (not email)"
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
              <Button>Login</Button>
            </Col>

          </Form>

          <br/>
          <Col>
            <p>Don't have an account? <Link to='register'>Register here</Link></p>
          </Col>
        </Jumbotron>
      </Col>
    </Row>
    </div>



    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);