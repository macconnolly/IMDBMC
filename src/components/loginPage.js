import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Alert, Button, Form, FormGroup, Label, Input, Jumbotron, Col, Row} from 'reactstrap';
import { loginUserAction } from '../actions/authenticationActions';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    };
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



    if (this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }

    return (

        <div>
          <br/>
          <br/>

    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        {
          isSuccess
            ?
              <Alert color="primary">
                  {message} Please proceed to login below.
              </Alert>
            : ''
        }
        {
          message
              ?
              <Alert color="primary">
                {message}
              </Alert>
              : ''
        }
        <Jumbotron className="login">
          <h2>Login to Existing Account</h2>
          <Form className="loginForm" onSubmit={this.onHandleLogin}>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="johndoe"
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
              <Button color="primary" id='loginButton' disabled={this.state.loading}>Login</Button>
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