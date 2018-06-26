import React, { Component } from 'react';
import Http from '../../http/alchemy';

import './user.css';


const User = (props) => {
  const { user } = props;
  return (
    <div className="user">
      <div>
        <span>Welcome, {user && user.username}</span>
        </div>
      <div className="user-recipes">
        {user && user.crafted.map(craft => (<img src={craft.image_url} alt="recipe" />))}
        <div>
        <span>Last crafted</span>
        </div>
      </div>
    </div>
  );
};


export default User;
