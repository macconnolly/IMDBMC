import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie, checkCookie } from '../utils/cookies';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if(checkCookie() != null){
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
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }

    return (
      <div>
        <h3>Login Page</h3>
        {!isSuccess ? <div>{message}</div> : <Redirect to='/movies' />}
        <form onSubmit={this.onHandleLogin}>
          <div>
            <label>Username</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
        Don't have account? <Link to='register'>Register here</Link>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);