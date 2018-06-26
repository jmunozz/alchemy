import React, { Component } from 'react';
import Http from '../../http/alchemy';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }


  auth(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const body = { username, password };
    const endpoint = '/public/users/token';
    const alchemyHttpclient = new Http();
    alchemyHttpclient.post(endpoint, body)
      .then((result) => {
        const { token } = result;
        if (!token) {
          return this.setState({ error: result });
        }
        const { setToken } = this.props;
        this.state.error = null;
        return setToken(token);
      })
      .catch((result) => {
        const { error } = result;
        this.setState({ error });
      });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.auth.bind(this)}>
          <p>Alchemy</p>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" name="submit" value="Start" />
        </form>
        {error && (
        <span>
          {error.message}
        </span>
        )}
      </div>
    );
  }
}

export default Login;
