import React, { Component } from 'react';

import Http from '../../http/alchemy';
import Login from '../Login';
import User from '../User';
import Inventory from '../Inventory';
import Craft from '../Craft';
import { formatIngredients } from '../../helpers/ingredients';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null, 
      user: null,
      formattedIngredients: [],
    };
  }

  componentDidUpdate() {
    const { user } = this.state;
    if (!user) {
      const { token } = this.state;
      const alchemyHttpClient = new Http(token);
      const endpoint = '/private/users/me';
      alchemyHttpClient.get(endpoint)
        .then((result) => {
          const { user } = result;
          this.setUser(user);
        });
    }
  }

  setToken(token) {
    this.setState({
      token,
    });
  }

  setIngredients(formattedIngredients) {
    this.setState({ formattedIngredients });
  }

  setUser(user) {
    this.setState({
      user,
      formattedIngredients: formatIngredients(user.inventory),
    });
  }

  render() {
    const { token, user, formattedIngredients } = this.state;

    return (
      <div className="app-container">
        {!token && <Login setToken={this.setToken.bind(this)} />}
        {token && <User user={user} setToken={this.setToken.bind(this)} />}
        {token && (
          <Inventory
            formattedIngredients={formattedIngredients}
            setIngredients={this.setIngredients.bind(this)}
          />
        )}
        {token && (
          <Craft
            token={token}
            setUser={this.setUser.bind(this)}
            formattedIngredients={formattedIngredients}
            setIngredients={this.setIngredients.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;
